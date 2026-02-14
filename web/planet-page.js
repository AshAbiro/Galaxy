const d = {
  planetName: document.getElementById("planetName"),
  planetMeta: document.getElementById("planetMeta"),
  jumpSystemLink: document.getElementById("jumpSystemLink"),
  jumpSectorLink: document.getElementById("jumpSectorLink"),
  planetStats: document.getElementById("planetStats"),
  planetNarrative: document.getElementById("planetNarrative")
};

const params = new URLSearchParams(window.location.search);
const planetQuery = params.get("planet");
const systemQuery = params.get("system");

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

function systemUrl(systemId) {
  return `./system.html?system=${encodeURIComponent(systemId)}`;
}

function sectorUrl(sectorId) {
  return `./sector.html?sector=${encodeURIComponent(sectorId)}`;
}

function atmosphereText(atm) {
  return Object.entries(atm).map(([gas, pct]) => `${gas} ${pct}%`).join(", ");
}

async function loadData() {
  const response = await fetch("./galaxy-data.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load galaxy-data.json (HTTP ${response.status})`);
  }
  return response.json();
}

function resolvePlanet(data) {
  const systemHint = data.systems.find((s) => tokenMatch(s.id, systemQuery) || tokenMatch(s.n, systemQuery));
  if (systemHint) {
    const planet = systemHint.p.find((p) => tokenMatch(planetToken(systemHint.id, p.n), planetQuery) || tokenMatch(p.n, planetQuery));
    if (planet) return { system: systemHint, planet };
  }

  for (const system of data.systems) {
    const planet = system.p.find((p) => tokenMatch(planetToken(system.id, p.n), planetQuery) || tokenMatch(p.n, planetQuery));
    if (planet) return { system, planet };
  }
  return null;
}

function renderError(message) {
  d.planetName.textContent = "Planet Not Found";
  d.planetMeta.textContent = message;
  d.planetStats.innerHTML = `<p class="muted">${message}</p>`;
  d.planetNarrative.innerHTML = "";
  d.jumpSystemLink.href = "./index.html";
  d.jumpSectorLink.href = "./index.html";
}

function renderPlanet(data, system, planet) {
  const sector = data.sectors.find((s) => tokenMatch(s.n, system.sector));
  const giant = /giant/i.test(planet.t);
  const moonProfile = giant ? "Likely multi-moon architecture inferred from giant class." : "No large moon system is currently cataloged.";
  const ringProfile = giant ? "High probability of ring material around the equatorial plane." : "No stable ring structure expected for this regime.";

  d.planetName.textContent = planet.n.toUpperCase();
  d.planetMeta.textContent = `${planet.t} | Habitability ${planet.hab} | System ${system.n}`;
  d.jumpSystemLink.href = systemUrl(system.id);
  d.jumpSystemLink.textContent = `Jump to ${system.n}`;
  if (sector) {
    d.jumpSectorLink.href = sectorUrl(sector.id || sector.n);
    d.jumpSectorLink.textContent = `Jump to ${sector.n}`;
  }

  d.planetStats.innerHTML = `
    <article class="detail-card">
      <h3>Primary Metrics</h3>
      <div class="detail-stats compact">
        <p><span class="muted">Mass</span><br /><strong>${planet.m[0]} ${planet.m[1]}</strong></p>
        <p><span class="muted">Radius</span><br /><strong>${planet.rad[0]} ${planet.rad[1]}</strong></p>
        <p><span class="muted">Gravity</span><br /><strong>${planet.g} g</strong></p>
        <p><span class="muted">Albedo</span><br /><strong>${planet.alb}</strong></p>
        <p><span class="muted">Orbit</span><br /><strong>${planet.a} AU</strong></p>
        <p><span class="muted">Orbital Period</span><br /><strong>${planet.op} d</strong></p>
        <p><span class="muted">Rotation</span><br /><strong>${planet.rp}</strong></p>
        <p><span class="muted">Axial Tilt</span><br /><strong>${planet.tilt} deg</strong></p>
        <p><span class="muted">Temperature</span><br /><strong>${planet.temp[0]} - ${planet.temp[1]} K</strong></p>
        <p><span class="muted">Pressure</span><br /><strong>${planet.pb} bar</strong></p>
      </div>
    </article>
    <article class="detail-card">
      <h3>Atmosphere + Habitability</h3>
      <p><span class="muted">Atmosphere:</span> ${atmosphereText(planet.atm)}</p>
      <p><span class="muted">Magnetic Field:</span> ${planet.mag}</p>
      <p><span class="muted">Hazard:</span> ${planet.x.h}</p>
      <p><span class="muted">Colonization:</span> ${planet.x.c}</p>
      <p><span class="muted">Resource Value:</span> ${planet.x.rv}</p>
      <p><span class="muted">Terraforming:</span> ${planet.x.tf}</p>
    </article>
    <article class="detail-card">
      <h3>Moons / Rings</h3>
      <p>${moonProfile}</p>
      <p>${ringProfile}</p>
    </article>
  `;

  d.planetNarrative.innerHTML = `
    <article class="detail-card">
      <h3>Visual Description</h3>
      <p>${planet.v}</p>
    </article>
    <article class="detail-card">
      <h3>Scientific Notes</h3>
      <p>${planet.sci}</p>
      <p><span class="muted">System Timeline Marker:</span> ${system.tl[system.tl.length - 1][1]}</p>
    </article>
  `;
}

async function bootstrap() {
  try {
    const data = await loadData();
    const record = resolvePlanet(data);
    if (!record) {
      renderError("Requested planet token was not found.");
      return;
    }
    renderPlanet(data, record.system, record.planet);
  } catch (error) {
    renderError(error.message);
  }
}

bootstrap();
