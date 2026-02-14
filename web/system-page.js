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
  tick: 0,
  hoverKey: null,
  nodes: []
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

function drawOrbit(system) {
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

  const planets = [];
  for (let i = 0; i < system.p.length; i += 1) {
    const p = system.p[i];
    const orbitRadius = scale(p.a);
    const speed = 240 / p.op;
    const angle = orbitState.tick * 0.0014 * speed + i * 0.7;
    const px = cx + Math.cos(angle) * orbitRadius;
    const py = cy + Math.sin(angle) * orbitRadius;
    const radius = 3 + p.m[0] * (p.m[1] === "Jupiter" ? 1.5 : 0.65);
    const key = `${system.id}::${p.n}`;
    planets.push({
      key,
      p,
      sx: px,
      sy: py,
      radius: Math.max(9, radius + 5),
      drawRadius: radius
    });

    const hover = orbitState.hoverKey === key;
    x.beginPath();
    x.arc(cx, cy, orbitRadius, 0, Math.PI * 2);
    x.strokeStyle = hover ? "rgba(255,118,118,0.46)" : "rgba(255,42,42,0.22)";
    x.lineWidth = hover ? 1.35 : 1;
    x.stroke();

    x.beginPath();
    x.arc(px, py, radius + (hover ? 1.2 : 0), 0, Math.PI * 2);
    x.fillStyle = p.m[1] === "Jupiter" ? "rgba(255,135,135,0.92)" : "rgba(255,70,70,0.9)";
    x.shadowColor = "rgba(255,26,26,0.74)";
    x.shadowBlur = hover ? 16 : 10;
    x.fill();

    if (hover) {
      x.beginPath();
      x.arc(px, py, radius + 6, 0, Math.PI * 2);
      x.strokeStyle = "rgba(255,224,224,0.75)";
      x.lineWidth = 1.1;
      x.stroke();
    }

    x.fillStyle = "rgba(255,220,220,0.85)";
    x.font = "11px Share Tech Mono";
    x.fillText(p.n, px + radius + 6, py - 4);
  }

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

  function frame() {
    orbitState.tick += 16;
    drawOrbit(system);
    requestAnimationFrame(frame);
  }
  frame();
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
