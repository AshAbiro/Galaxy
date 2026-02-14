const d = {
  sectorName: document.getElementById("sectorName"),
  sectorMeta: document.getElementById("sectorMeta"),
  sectorStats: document.getElementById("sectorStats"),
  sectorSystems: document.getElementById("sectorSystems")
};

const params = new URLSearchParams(window.location.search);
const sectorQuery = params.get("sector");

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

function systemUrl(systemId) {
  return `./system.html?system=${encodeURIComponent(systemId)}`;
}

function bestHabitability(system) {
  if (!Array.isArray(system.p) || !system.p.length) return 0;
  return Math.max(...system.p.map((p) => p.hab));
}

async function loadData() {
  const response = await fetch("./galaxy-data.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load galaxy-data.json (HTTP ${response.status})`);
  }
  return response.json();
}

function renderError(message) {
  d.sectorName.textContent = "Sector Not Found";
  d.sectorMeta.textContent = message;
  d.sectorStats.innerHTML = "";
  d.sectorSystems.innerHTML = `<p class="muted">${message}</p>`;
}

function renderSector(data, sector) {
  const systems = data.systems.filter((system) => tokenMatch(system.sector, sector.n));
  d.sectorName.textContent = sector.n.toUpperCase();
  d.sectorMeta.textContent = `Threat ${sector.t} | Radiation ${sector.r} | Star Density ${sector.d}`;
  d.sectorStats.innerHTML = `
    <p><span class="muted">Notable Systems</span><br /><strong>${sector.s.length}</strong></p>
    <p><span class="muted">Cataloged Systems</span><br /><strong>${systems.length}</strong></p>
    <p><span class="muted">Threat Layer</span><br /><strong>${sector.t}</strong></p>
    <p><span class="muted">Radiation Index</span><br /><strong>${sector.r}</strong></p>
  `;

  if (!systems.length) {
    d.sectorSystems.innerHTML = `<p class="muted">No systems are currently cataloged for this sector.</p>`;
    return;
  }

  d.sectorSystems.innerHTML = "";
  for (const system of systems) {
    const card = document.createElement("article");
    card.className = "detail-card";
    card.innerHTML = `
      <h3>${system.n}</h3>
      <p class="muted">${system.star.cls} | ${system.star.mult}</p>
      <div class="detail-stats compact">
        <p><span class="muted">Planets</span><br /><strong>${system.p.length}</strong></p>
        <p><span class="muted">Best Habitability</span><br /><strong>${bestHabitability(system)}</strong></p>
        <p><span class="muted">HZ</span><br /><strong>${system.star.hz[0]} - ${system.star.hz[1]} AU</strong></p>
        <p><span class="muted">Frost Line</span><br /><strong>${system.star.frost} AU</strong></p>
      </div>
      <p><span class="muted">Timeline:</span> ${system.tl[system.tl.length - 1][1]}</p>
      <div class="detail-actions">
        <a class="ghost-btn inline-link" href="${systemUrl(system.id)}">Open System Page</a>
      </div>
    `;
    d.sectorSystems.append(card);
  }
}

async function bootstrap() {
  try {
    const data = await loadData();
    const fallback = data.sectors[0];
    const sector = data.sectors.find((s) => tokenMatch(s.id, sectorQuery) || tokenMatch(s.n, sectorQuery)) || fallback;
    if (!sector) {
      renderError("No sector data was found in galaxy-data.json.");
      return;
    }
    renderSector(data, sector);
  } catch (error) {
    renderError(error.message);
  }
}

bootstrap();
