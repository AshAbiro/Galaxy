const d = {
  systemName: document.getElementById("systemName"),
  systemMeta: document.getElementById("systemMeta"),
  systemStats: document.getElementById("systemStats"),
  backSectorLink: document.getElementById("backSectorLink"),
  orbitCanvas: document.getElementById("systemOrbitCanvas"),
  systemPlanets: document.getElementById("systemPlanets")
};

const params = new URLSearchParams(window.location.search);
const systemQuery = params.get("system");

const orbitState = {
  simMs: 0,
  frameTs: null,
  ramp: 0,
  hoverKey: null,
  nodes: [],
  belt: null,
  elements: null
};

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function tokenMatch(value, token) {
  return slugify(value) === slugify(token);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smooth(t) {
  return t * t * (3 - 2 * t);
}

function orbitDurationSeconds(normDist) {
  const n = clamp(normDist, 0, 1);
  return 95 + 40 * n + 225 * n * n;
}

function hash32(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function hashUnit(text) {
  return hash32(text) / 4294967295;
}

function solveKepler(meanAnomaly, eccentricity) {
  const tau = Math.PI * 2;
  let m = meanAnomaly % tau;
  if (m < -Math.PI) m += tau;
  if (m > Math.PI) m -= tau;
  let e = eccentricity < 0.8 ? m : Math.PI;
  for (let i = 0; i < 6; i += 1) {
    const f = e - eccentricity * Math.sin(e) - m;
    const fp = 1 - eccentricity * Math.cos(e);
    e -= f / Math.max(fp, 1e-6);
  }
  return e;
}

function planetToken(systemId, planetName) {
  return `${slugify(systemId)}-${slugify(planetName)}`;
}

function sectorUrl(sectorId) {
  return `./sector.html?sector=${encodeURIComponent(sectorId)}`;
}

function planetUrl(systemId, planetName) {
  const token = planetToken(systemId, planetName);
  return `./planet.html?planet=${encodeURIComponent(token)}&system=${encodeURIComponent(systemId)}`;
}

async function loadData() {
  const response = await fetch("./galaxy-data.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load galaxy-data.json (HTTP ${response.status})`);
  }
  return response.json();
}

function getBeltParticles(innerRadius, outerRadius) {
  if (!orbitState.belt) {
    const points = [];
    for (let i = 0; i < 260; i += 1) {
      points.push({
        angle: Math.random() * Math.PI * 2,
        radius: innerRadius + Math.random() * (outerRadius - innerRadius),
        drift: (Math.random() * 2 - 1) * 0.0000014,
        alpha: 0.12 + Math.random() * 0.2
      });
    }
    orbitState.belt = points;
  }
  return orbitState.belt;
}

function getOrbitElements(system, planet) {
  if (!orbitState.elements) {
    orbitState.elements = {
      _inclination: 0.74 + hashUnit(`${system.id}:inclination`) * 0.20
    };
  }
  if (!orbitState.elements[planet.n]) {
    const seed = `${system.id}:${planet.n}`;
    const giant = /giant/i.test(planet.t);
    const eMin = giant ? 0.01 : 0.005;
    const eMax = giant ? 0.09 : 0.16;
    orbitState.elements[planet.n] = {
      eccentricity: eMin + hashUnit(`${seed}:e`) * (eMax - eMin),
      omega: hashUnit(`${seed}:omega`) * Math.PI * 2,
      phase: hashUnit(`${seed}:phase`) * Math.PI * 2
    };
  }
  return {
    ...orbitState.elements[planet.n],
    inclination: orbitState.elements._inclination
  };
}

function canvasPoint(ev, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((ev.clientX - rect.left) / rect.width) * canvas.width,
    y: ((ev.clientY - rect.top) / rect.height) * canvas.height
  };
}

function pickPlanet(x, y) {
  let hit = null;
  let best = Number.POSITIVE_INFINITY;
  for (const node of orbitState.nodes) {
    const dist = Math.hypot(node.sx - x, node.sy - y);
    if (dist <= node.radius && dist < best) {
      hit = node;
      best = dist;
    }
  }
  return hit;
}

function renderError(message) {
  d.systemName.textContent = "System Not Found";
  d.systemMeta.textContent = message;
  d.systemStats.innerHTML = "";
  d.systemPlanets.innerHTML = `<p class="muted">${message}</p>`;
}

function renderPlanetCards(system) {
  d.systemPlanets.innerHTML = "";
  for (const planet of system.p) {
    const card = document.createElement("article");
    card.className = "detail-card";
    card.innerHTML = `
      <h3>${planet.n}</h3>
      <p class="muted">${planet.t}</p>
      <div class="detail-stats compact">
        <p><span class="muted">Habitability</span><br /><strong>${planet.hab}</strong></p>
        <p><span class="muted">Gravity</span><br /><strong>${planet.g} g</strong></p>
        <p><span class="muted">Orbit</span><br /><strong>${planet.a} AU</strong></p>
        <p><span class="muted">Pressure</span><br /><strong>${planet.pb} bar</strong></p>
      </div>
      <p><span class="muted">Temp Range:</span> ${planet.temp[0]} - ${planet.temp[1]} K</p>
      <div class="detail-actions">
        <a class="ghost-btn inline-link" href="${planetUrl(system.id, planet.n)}">Open Planet Page</a>
      </div>
    `;
    d.systemPlanets.append(card);
  }
}

function drawOrbit(system, deltaMs = 16) {
  const dt = clamp(deltaMs, 0, 120);
  orbitState.ramp = clamp(orbitState.ramp + dt / 2000, 0, 1);
  orbitState.simMs += dt * smooth(orbitState.ramp);
  const c = d.orbitCanvas;
  const x = c.getContext("2d");
  const w = c.width;
  const h = c.height;
  const cx = w * 0.44;
  const cy = h * 0.52;
  const maxRadius = Math.min(w, h) * 0.42;
  x.clearRect(0, 0, w, h);

  const bg = x.createRadialGradient(cx, cy, 10, cx, cy, maxRadius + 180);
  bg.addColorStop(0, "rgba(42,10,15,0.45)");
  bg.addColorStop(1, "rgba(5,5,7,0.96)");
  x.fillStyle = bg;
  x.fillRect(0, 0, w, h);

  const far = Math.max(...system.p.map((p) => p.a), system.star.frost, system.star.belt[1]);
  const innerA = Math.min(...system.p.map((p) => p.a));
  const outerA = Math.max(...system.p.map((p) => p.a));
  const spanA = Math.max(outerA - innerA, 0.001);
  const scale = (dist) => 54 + (Math.log(dist + 1) / Math.log(far + 1)) * (maxRadius - 54);

  const frostRadius = scale(system.star.frost);
  x.beginPath();
  x.arc(cx, cy, frostRadius, 0, Math.PI * 2);
  x.setLineDash([7, 6]);
  x.strokeStyle = "rgba(255,96,96,0.42)";
  x.lineWidth = 1;
  x.stroke();
  x.setLineDash([]);
  x.fillStyle = "rgba(255,170,170,0.72)";
  x.font = "12px Orbitron";
  x.fillText("FROST LINE", cx + frostRadius + 10, cy - 8);

  const beltInner = scale(system.star.belt[0]);
  const beltOuter = scale(system.star.belt[1]);
  const beltParticles = getBeltParticles(beltInner, beltOuter);
  for (const grain of beltParticles) {
    const angle = grain.angle + orbitState.simMs * grain.drift;
    const pulse = 0.72 + 0.28 * Math.sin(orbitState.simMs * 0.00015 + grain.angle);
    x.fillStyle = `rgba(255,110,110,${(grain.alpha * pulse).toFixed(3)})`;
    x.fillRect(cx + Math.cos(angle) * grain.radius, cy + Math.sin(angle) * grain.radius, 1.05, 1.05);
  }

  const planets = [];
  for (let i = 0; i < system.p.length; i += 1) {
    const p = system.p[i];
    const orbitRadius = scale(p.a);
    const elements = getOrbitElements(system, p);
    const normDist = clamp((p.a - innerA) / spanA, 0, 1);
    const orbitSeconds = orbitDurationSeconds(normDist);
    const meanAnomaly = (orbitState.simMs / 1000) * ((Math.PI * 2) / orbitSeconds) + elements.phase + i * 0.01;
    const eccentricAnomaly = solveKepler(meanAnomaly, elements.eccentricity);
    const cosE = Math.cos(eccentricAnomaly);
    const sinE = Math.sin(eccentricAnomaly);
    const semiMinor = orbitRadius * Math.sqrt(1 - elements.eccentricity ** 2) * elements.inclination;
    const xFocus = orbitRadius * (cosE - elements.eccentricity);
    const yFocus = semiMinor * sinE;
    const cosW = Math.cos(elements.omega);
    const sinW = Math.sin(elements.omega);
    const px = cx + (xFocus * cosW) - (yFocus * sinW);
    const py = cy + (xFocus * sinW) + (yFocus * cosW);
    const depth = clamp((yFocus / Math.max(1e-6, semiMinor) + 1) * 0.5, 0, 1);
    const depthScale = 0.86 + depth * 0.28;
    const radius = (3 + p.m[0] * (p.m[1] === "Jupiter" ? 1.5 : 0.65)) * depthScale;
    const key = `${system.id}::${p.n}`;
    planets.push({
      key,
      p,
      sx: px,
      sy: py,
      radius: Math.max(9, radius + 5),
      drawRadius: radius,
      depth,
      orbitRadius,
      e: elements.eccentricity,
      omega: elements.omega,
      semiMinor
    });

    const hover = orbitState.hoverKey === key;
    x.save();
    x.translate(cx, cy);
    x.rotate(elements.omega);
    x.beginPath();
    x.ellipse(-orbitRadius * elements.eccentricity, 0, orbitRadius, semiMinor, 0, 0, Math.PI * 2);
    x.strokeStyle = hover ? "rgba(255,118,118,0.46)" : "rgba(255,42,42,0.22)";
    x.lineWidth = hover ? 1.35 : 1;
    x.stroke();
    x.restore();

    x.beginPath();
    x.arc(px, py, radius + (hover ? 1.2 : 0), 0, Math.PI * 2);
    const heat = Math.round(78 + depth * 62);
    x.fillStyle = p.m[1] === "Jupiter" ? `rgba(255,${heat + 18},${heat + 18},0.92)` : `rgba(255,${heat},${heat},0.9)`;
    x.shadowColor = "rgba(255,26,26,0.74)";
    x.shadowBlur = hover ? 16 : 10 + depth * 5;
    x.shadowOffsetX = (depth - 0.5) * 2.8;
    x.shadowOffsetY = (0.5 - depth) * 2.1;
    x.fill();

    if (hover) {
      x.beginPath();
      x.arc(px, py, radius + 6, 0, Math.PI * 2);
      x.strokeStyle = "rgba(255,224,224,0.75)";
      x.lineWidth = 1.1;
      x.stroke();
    }

    x.fillStyle = `rgba(255,220,220,${(0.52 + depth * 0.38).toFixed(3)})`;
    x.font = "11px Share Tech Mono";
    x.fillText(p.n, px + radius + 6, py - 4);
  }
  x.shadowBlur = 0;
  x.shadowOffsetX = 0;
  x.shadowOffsetY = 0;

  orbitState.nodes = planets;

  x.beginPath();
  x.arc(cx, cy, 32, 0, Math.PI * 2);
  const core = x.createRadialGradient(cx, cy, 0, cx, cy, 32);
  core.addColorStop(0, "rgba(255,240,240,1)");
  core.addColorStop(0.32, "rgba(255,90,90,0.96)");
  core.addColorStop(1, "rgba(177,18,38,0)");
  x.fillStyle = core;
  x.fill();
  x.fillStyle = "rgba(255,230,230,0.92)";
  x.font = "13px Orbitron";
  x.fillText(`${system.n} STAR`, cx + 40, cy + 4);
}

function attachCanvasHandlers(system) {
  const c = d.orbitCanvas;
  c.addEventListener("mousemove", (ev) => {
    const p = canvasPoint(ev, c);
    const hit = pickPlanet(p.x, p.y);
    orbitState.hoverKey = hit ? hit.key : null;
    c.style.cursor = hit ? "pointer" : "default";
  });
  c.addEventListener("mouseleave", () => {
    orbitState.hoverKey = null;
    c.style.cursor = "default";
  });
  c.addEventListener("click", (ev) => {
    const p = canvasPoint(ev, c);
    const hit = pickPlanet(p.x, p.y);
    if (!hit) return;
    window.location.href = planetUrl(system.id, hit.p.n);
  });
}

function renderSystem(data, system) {
  const sector = data.sectors.find((s) => tokenMatch(s.n, system.sector));
  d.systemName.textContent = system.n.toUpperCase();
  d.systemMeta.textContent = `${system.star.cls} | ${system.star.mult} | Sector ${system.sector}`;
  d.systemStats.innerHTML = `
    <p><span class="muted">Surface Temp</span><br /><strong>${system.star.tk} K</strong></p>
    <p><span class="muted">Luminosity</span><br /><strong>${system.star.lum} Lsun</strong></p>
    <p><span class="muted">Age</span><br /><strong>${system.star.age} Gyr</strong></p>
    <p><span class="muted">Habitability Zone</span><br /><strong>${system.star.hz[0]} - ${system.star.hz[1]} AU</strong></p>
    <p><span class="muted">Frost Line</span><br /><strong>${system.star.frost} AU</strong></p>
    <p><span class="muted">Planet Count</span><br /><strong>${system.p.length}</strong></p>
  `;

  if (sector) {
    d.backSectorLink.href = sectorUrl(sector.id || sector.n);
    d.backSectorLink.textContent = `Back to ${sector.n}`;
  }

  renderPlanetCards(system);
  attachCanvasHandlers(system);
  orbitState.simMs = 0;
  orbitState.ramp = 0;
  orbitState.frameTs = null;
  orbitState.belt = null;
  orbitState.elements = null;

  function frame(ts) {
    if (orbitState.frameTs === null) {
      orbitState.frameTs = ts;
    }
    const dt = clamp(ts - orbitState.frameTs, 0, 120);
    orbitState.frameTs = ts;
    drawOrbit(system, dt);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

async function bootstrap() {
  try {
    const data = await loadData();
    const fallback = data.systems[0];
    const system = data.systems.find((s) => tokenMatch(s.id, systemQuery) || tokenMatch(s.n, systemQuery)) || fallback;
    if (!system) {
      renderError("No system data was found in galaxy-data.json.");
      return;
    }
    renderSystem(data, system);
  } catch (error) {
    renderError(error.message);
  }
}

bootstrap();
