const DATA = {
  name: "Sanguis Noctis",
  sectors: [
    { id: "hemlock", n: "Hemlock Core", r: 78, d: 92, t: 84, tint: "rgba(177,18,38,.18)", c: [-0.11, -0.08], s: ["Kharon-17", "Vanta Relay", "Sable Anchor"] },
    { id: "cinder", n: "Cinder Lattice", r: 64, d: 74, t: 66, tint: "rgba(42,13,46,.22)", c: [0.34, -0.18], s: ["Nyx Trident", "Halberd-9", "Morcant Drift"] },
    { id: "razor", n: "Razor Meridian", r: 47, d: 68, t: 55, tint: "rgba(177,18,38,.12)", c: [0.45, 0.28], s: ["Vespera Delta", "Orin Vault", "Crux-12"] },
    { id: "vanta", n: "Vanta Choir", r: 88, d: 56, t: 91, tint: "rgba(177,18,38,.27)", c: [-0.3, -0.29], s: ["Magnetar VX-3", "Choir Rift", "Ember Spine"] },
    { id: "obsidian", n: "Obsidian Frontier", r: 31, d: 42, t: 38, tint: "rgba(177,18,38,.08)", c: [-0.5, 0.24], s: ["Noct Gate", "Ilex-4", "Drome Verge"] },
    { id: "null", n: "Null Aurora Rim", r: 22, d: 28, t: 29, tint: "rgba(42,13,46,.16)", c: [0.04, 0.53], s: ["Helix Quiet", "Pale Bastion", "Tern Hollow"] }
  ],
  systems: [
    {
      id: "kharon-17",
      n: "Kharon-17",
      sector: "Hemlock Core",
      star: { cls: "M3V", tk: 3420, lum: 0.035, age: 6.1, hz: [0.14, 0.27], mult: "Single", frost: 0.5, belt: [0.5, 0.58], m: 0.35 },
      tl: [
        [0, "Cloud collapse and ignition."],
        [20, "Rocky embryos form inward."],
        [300, "Inner planets tidally settle."],
        [6100, "Mature low-luminosity epoch."]
      ],
      p: [
        { n: "Razor Ember", t: "Iron-rich lava world", m: [0.58, "Earth"], rad: [0.82, "Earth"], g: 0.86, a: 0.045, op: 5.65, rp: "5.65 d", tilt: 0.9, temp: [180, 930], atm: { CO2: 62, SO2: 21, CO: 9, "Na/K vapor": 5, N2: 3 }, pb: 0.18, mag: "No", alb: 0.12, hab: 2, v: "Basalt plains cut by magma fissures.", sci: "Extreme flux and tidal lock keep hemispheric heat contrast.", x: { h: "Extreme", c: "None", rv: "High metals", tf: "Near impossible" } },
        { n: "Sable Meridian", t: "Hot super-Earth", m: [1.6, "Earth"], rad: [1.16, "Earth"], g: 1.19, a: 0.095, op: 17.3, rp: "11.5 d (3:2)", tilt: 4, temp: [310, 520], atm: { CO2: 71, N2: 22, SO2: 4, H2O: 2, Ar: 1 }, pb: 1.8, mag: "Weak", alb: 0.19, hab: 25, v: "Red deserts and obsidian flats under sulfur haze.", sci: "CO2 greenhouse dominates; resonance eases day-night extremes.", x: { h: "High", c: "Low", rv: "High geothermal", tf: "Severe" } },
        { n: "Noctis Pelagic", t: "Oceanic super-Earth", m: [2.4, "Earth"], rad: [1.34, "Earth"], g: 1.34, a: 0.18, op: 45.3, rp: "45.3 d", tilt: 1.7, temp: [230, 325], atm: { N2: 75, O2: 11, CO2: 7, H2O: 5, Ar: 2 }, pb: 1.4, mag: "Yes", alb: 0.28, hab: 71, v: "Global dark ocean with bright cloud annulus.", sci: "Dense air and ocean circulation move heat across locked hemispheres.", x: { h: "Moderate", c: "Moderate-high", rv: "High water", tf: "Moderate" } },
        { n: "Acheron Steppe", t: "Cold rocky super-Earth", m: [3.1, "Earth"], rad: [1.46, "Earth"], g: 1.45, a: 0.29, op: 92.4, rp: "30.8 d", tilt: 19, temp: [165, 258], atm: { N2: 68, CO2: 24, Ar: 5, CH4: 2, H2O: 1 }, pb: 2.9, mag: "Yes", alb: 0.31, hab: 38, v: "Rust plains, black escarpments, seasonal frost basins.", sci: "Outer HZ edge needs higher pressure and greenhouse retention.", x: { h: "Moderate-high", c: "Moderate", rv: "High volatiles", tf: "High" } },
        { n: "Crimson Shepherd", t: "Gas giant", m: [0.42, "Jupiter"], rad: [0.92, "Jupiter"], g: 1.25, a: 0.74, op: 377, rp: "13.1 h", tilt: 7, temp: [95, 165], atm: { H2: 86, He: 13, CH4: 0.7, NH3: 0.2, Traces: 0.1 }, pb: 1, mag: "Yes", alb: 0.46, hab: 0, v: "Burgundy bands, lightning cells, faint dusty ring.", sci: "Beyond frost line, volatile-rich core accreted a thick envelope.", x: { h: "Extreme", c: "Moons only", rv: "Very high He-3", tf: "N/A" } },
        { n: "Veil Leviathan", t: "Ice giant", m: [0.09, "Jupiter"], rad: [0.43, "Jupiter"], g: 1.23, a: 1.62, op: 1222, rp: "16.4 h", tilt: 28, temp: [60, 105], atm: { H2: 79, He: 19, CH4: 1.6, NH3: 0.3, Traces: 0.1 }, pb: 1, mag: "Yes", alb: 0.52, hab: 0, v: "Blue-black cloud tops with crimson limb haze.", sci: "Low flux stabilizes methane; tilted field drives asymmetric aurora.", x: { h: "High", c: "Low", rv: "High volatiles", tf: "N/A" } }
      ]
    },
    {
      id: "vespera-delta",
      n: "Vespera Delta",
      sector: "Razor Meridian",
      star: { cls: "K1V", tk: 5050, lum: 0.39, age: 5.4, hz: [0.59, 0.95], mult: "Binary (M5V at 42 AU)", frost: 1.69, belt: [1.8, 2.2], m: 0.79 },
      tl: [
        [0, "Primary/companion ignition."],
        [30, "Inner rocky planet assembly."],
        [80, "Giant cores capture gas."],
        [5400, "Stable temperate corridor."]
      ],
      p: [
        { n: "Glassknife", t: "Hot silicate terrestrial", m: [0.79, "Earth"], rad: [0.91, "Earth"], g: 0.95, a: 0.11, op: 15, rp: "15 d", tilt: 1.2, temp: [430, 720], atm: { CO2: 58, N2: 31, SO2: 6, Ar: 3, H2O: 2 }, pb: 0.9, mag: "No", alb: 0.11, hab: 9, v: "Impact-glass plains and obsidian fractures.", sci: "High insolation and weak shielding drive harsh chemistry.", x: { h: "High", c: "Very low", rv: "Moderate-high", tf: "Extreme" } },
        { n: "Helion Scar", t: "Warm super-Earth", m: [1.9, "Earth"], rad: [1.25, "Earth"], g: 1.22, a: 0.27, op: 57.7, rp: "38.5 d (3:2)", tilt: 6, temp: [305, 470], atm: { N2: 57, CO2: 34, H2O: 5, Ar: 3, SO2: 1 }, pb: 2.2, mag: "Yes", alb: 0.2, hab: 33, v: "Crimson plateaus with mineral haze.", sci: "Thick CO2 atmosphere elevates greenhouse forcing.", x: { h: "Moderate-high", c: "Low-moderate", rv: "High", tf: "High" } },
        { n: "Orphea", t: "Temperate terrestrial", m: [1.12, "Earth"], rad: [1.03, "Earth"], g: 1.06, a: 0.67, op: 225, rp: "26.4 h", tilt: 23, temp: [252, 304], atm: { N2: 77, O2: 21, Ar: 1.4, CO2: 0.1, H2O: 0.5 }, pb: 1.03, mag: "Yes", alb: 0.3, hab: 82, v: "Dark oceans and iron-rich continents with white cloud systems.", sci: "Near-optimal flux for K-dwarf; Earthlike pressure and chemistry.", x: { h: "Moderate", c: "High", rv: "High", tf: "Low" } },
        { n: "Rimegate", t: "Cold super-Earth", m: [2.6, "Earth"], rad: [1.42, "Earth"], g: 1.29, a: 1.04, op: 435, rp: "31 h", tilt: 31, temp: [185, 271], atm: { N2: 63, CO2: 23, O2: 8, Ar: 4, CH4: 2 }, pb: 2.4, mag: "Yes", alb: 0.37, hab: 56, v: "Icy uplands, dark ridges, seasonal red cloud veils.", sci: "Low flux + high albedo cool climate; dense air buffers collapse.", x: { h: "Moderate", c: "Moderate", rv: "High", tf: "Moderate-high" } },
        { n: "Tyr Vox", t: "Gas giant", m: [0.83, "Jupiter"], rad: [1.05, "Jupiter"], g: 1.91, a: 2.85, op: 1977, rp: "10.8 h", tilt: 2, temp: [95, 145], atm: { H2: 88, He: 11, CH4: 0.6, NH3: 0.3, Traces: 0.1 }, pb: 1, mag: "Yes", alb: 0.49, hab: 0, v: "Red-gray bands, bright storm ovals, narrow rings.", sci: "Core accretion beyond frost line with rapid spin-driven jets.", x: { h: "Extreme", c: "Moons only", rv: "Very high", tf: "N/A" } },
        { n: "Morrow Crown", t: "Cold gas giant", m: [0.23, "Jupiter"], rad: [0.72, "Jupiter"], g: 1.12, a: 6.1, op: 6190, rp: "9.6 h", tilt: 26, temp: [60, 95], atm: { H2: 85, He: 13, CH4: 1.4, NH3: 0.4, H2S: 0.2 }, pb: 1, mag: "Yes", alb: 0.57, hab: 0, v: "Pale upper haze with broad reflective rings.", sci: "Low stellar flux preserves methane-rich reflective cloud layers.", x: { h: "High", c: "Low", rv: "Very high", tf: "N/A" } }
      ]
    },
    {
      id: "nyx-trident",
      n: "Nyx Trident",
      sector: "Cinder Lattice",
      star: { cls: "M0V", tk: 3900, lum: 0.07, age: 7.8, hz: [0.24, 0.43], mult: "Trinary (M6V+M8V pair)", frost: 0.71, belt: [0.78, 0.95], m: 0.55 },
      tl: [
        [0, "Trinary cloud collapse."],
        [34, "Inner rocky assembly and damping."],
        [680, "Hydrosphere accumulation on temperate planet."],
        [7800, "Old settled trinary system."]
      ],
      p: [
        { n: "Cauter", t: "Volcanic rocky world", m: [0.66, "Earth"], rad: [0.86, "Earth"], g: 0.89, a: 0.06, op: 6.93, rp: "6.93 d", tilt: 0.4, temp: [210, 880], atm: { CO2: 64, N2: 18, SO2: 11, CO: 5, Ar: 2 }, pb: 0.35, mag: "No", alb: 0.09, hab: 1, v: "Scarlet lava basins and black clinker ridges.", sci: "Tidal lock and intense irradiation sustain active resurfacing.", x: { h: "Extreme", c: "None", rv: "Moderate", tf: "Near impossible" } },
        { n: "Umbra Dune", t: "Arid super-Earth", m: [1.35, "Earth"], rad: [1.09, "Earth"], g: 1.14, a: 0.14, op: 24.7, rp: "24.7 d", tilt: 2.1, temp: [260, 430], atm: { N2: 61, CO2: 29, Ar: 5, H2O: 3, CH4: 2 }, pb: 1.6, mag: "Weak", alb: 0.17, hab: 29, v: "Hematite dune seas under persistent dust veils.", sci: "Synchronous heating plus moderate greenhouse creates harsh gradients.", x: { h: "High", c: "Low", rv: "High", tf: "Very high" } },
        { n: "Terminus Mare", t: "Oceanic super-Earth", m: [1.98, "Earth"], rad: [1.27, "Earth"], g: 1.23, a: 0.28, op: 69.9, rp: "69.9 d", tilt: 1.3, temp: [235, 310], atm: { N2: 73, O2: 15, CO2: 7, H2O: 4, Ar: 1 }, pb: 1.7, mag: "Yes", alb: 0.29, hab: 74, v: "Dark ocean hemisphere with permanent cloud shield.", sci: "Ocean heat transport prevents night-side atmospheric collapse.", x: { h: "Moderate", c: "High", rv: "Very high", tf: "Low-moderate" } },
        { n: "Redline Tundra", t: "Cold super-Earth", m: [2.9, "Earth"], rad: [1.48, "Earth"], g: 1.32, a: 0.41, op: 123.8, rp: "82.5 d (3:2)", tilt: 14, temp: [170, 248], atm: { N2: 66, CO2: 20, O2: 9, Ar: 3, CH4: 2 }, pb: 2.1, mag: "Yes", alb: 0.35, hab: 48, v: "Red-brown tundra and black volcanic uplands.", sci: "Outer HZ position with dense atmosphere allows seasonal thaw corridors.", x: { h: "Moderate", c: "Moderate", rv: "High", tf: "Moderate-high" } },
        { n: "Gravemantle", t: "Gas giant", m: [0.31, "Jupiter"], rad: [0.84, "Jupiter"], g: 1.11, a: 1.35, op: 739, rp: "11.9 h", tilt: 5, temp: [75, 130], atm: { H2: 87, He: 12, CH4: 0.7, NH3: 0.2, Traces: 0.1 }, pb: 1, mag: "Yes", alb: 0.51, hab: 0, v: "Muted red-gray bands and thin ringlets.", sci: "Cold outer-zone core accretion with fast-rotation jet structure.", x: { h: "High", c: "Moons only", rv: "Very high", tf: "N/A" } },
        { n: "Kestrel Deep", t: "Ice giant", m: [0.12, "Jupiter"], rad: [0.47, "Jupiter"], g: 1.38, a: 3.8, op: 3490, rp: "15.3 h", tilt: 33, temp: [45, 82], atm: { H2: 80, He: 17, CH4: 2.2, NH3: 0.5, H2S: 0.3 }, pb: 1, mag: "Yes", alb: 0.62, hab: 0, v: "Indigo envelope with crimson limb glow and braided rings.", sci: "Low flux preserves methane and high reflectivity cloud condensates.", x: { h: "High", c: "Very low", rv: "Very high", tf: "N/A" } }
      ]
    }
  ],
  topics: [
    "Stellar class and luminosity scaling",
    "M-dwarf tidal locking climate models",
    "Atmospheric escape and magnetic shielding",
    "Frost line and giant planet formation",
    "Mass-radius-density interpretation",
    "Orbital resonance stability",
    "Radiation mitigation architecture",
    "Terraforming energy budgets",
    "Planetary climate forcing",
    "System formation chronology",
    "Exomoon tidal heating",
    "Internal physics validation protocol"
  ]
};

const state = {
  view: "command",
  routes: true,
  systemId: DATA.systems[0].id,
  scanOn: false,
  scanKey: null,
  compare: new Set(),
  gt: 0,
  ot: 0,
  frameTs: null,
  pointer: { x: 0, y: 0, active: false },
  hoverNode: -1,
  galaxyNodes: [],
  stars: [],
  orbit: {
    planets: [],
    hoverKey: null,
    focusKey: null,
    simMs: 0,
    ramp: 0,
    beltBySystem: {},
    elementsBySystem: {},
    zoom: { current: 1, target: 1 },
    pan: { x: 0, y: 0, tx: 0, ty: 0 }
  }
};

const ROUTE_EDGES = [[0, 1], [1, 2], [2, 5], [5, 4], [4, 3], [3, 0], [0, 2], [1, 5]];
const d = {
  galaxyName: document.getElementById("galaxyName"),
  revisionDate: document.getElementById("revisionDate"),
  nav: [...document.querySelectorAll(".nav-btn")],
  view: {
    command: document.getElementById("view-command"),
    sectors: document.getElementById("view-sectors"),
    systems: document.getElementById("view-systems"),
    encyclopedia: document.getElementById("view-encyclopedia")
  },
  gcv: document.getElementById("galaxyCanvas"),
  ocv: document.getElementById("orbitCanvas"),
  warpBtn: document.getElementById("warpBtn"),
  routeBtn: document.getElementById("toggleRoutesBtn"),
  warpResult: document.getElementById("warpResult"),
  sectorGrid: document.getElementById("sectorGrid"),
  sysList: document.getElementById("systemList"),
  classFilter: document.getElementById("starClassFilter"),
  binFilter: document.getElementById("binaryFilter"),
  habFilter: document.getElementById("habitabilityFilter"),
  habValue: document.getElementById("habitabilityFilterValue"),
  radFilter: document.getElementById("highRadiationFilter"),
  sysTitle: document.getElementById("systemTitle"),
  sysSub: document.getElementById("systemSubtitle"),
  starStats: document.getElementById("starStats"),
  registry: document.getElementById("planetRegistry"),
  scanBtn: document.getElementById("scanModeBtn"),
  scanStatus: document.getElementById("scanStatus"),
  scanOverlay: document.getElementById("scanOverlay"),
  orbitWrap: document.querySelector(".orbit-wrap"),
  focusOverlay: document.getElementById("planetFocusOverlay"),
  focusClose: document.getElementById("planetFocusClose"),
  focusContent: document.getElementById("planetFocusContent"),
  slider: document.getElementById("timelineSlider"),
  timelineEvent: document.getElementById("timelineEvent"),
  comparePanel: document.getElementById("comparisonPanel"),
  topics: document.getElementById("encyclopediaGrid")
};

const sectorByName = new Map();
const systemById = new Map();
const planetByKey = new Map();

function pk(sysId, pName) {
  return `${sysId}::${pName}`;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sectorToken(sector) {
  return slugify(sector.id || sector.n);
}

function planetToken(sysId, pName) {
  return `${slugify(sysId)}-${slugify(pName)}`;
}

function sectorUrl(sector) {
  return `./sector.html?sector=${encodeURIComponent(sectorToken(sector))}`;
}

function systemUrl(systemId) {
  return `./system.html?system=${encodeURIComponent(systemId)}`;
}

function planetUrl(systemId, planetName) {
  const token = planetToken(systemId, planetName);
  return `./planet.html?planet=${encodeURIComponent(token)}&system=${encodeURIComponent(systemId)}`;
}

function pickGalaxyNode(x, y) {
  let hit = null;
  let best = Number.POSITIVE_INFINITY;
  for (const node of state.galaxyNodes) {
    const dist = Math.hypot(node.px - x, node.py - y);
    if (dist <= node.radius && dist < best) {
      hit = node;
      best = dist;
    }
  }
  return hit;
}

function rebuildIndexesFromData() {
  sectorByName.clear();
  systemById.clear();
  planetByKey.clear();
  if (!Array.isArray(DATA.sectors) || !Array.isArray(DATA.systems)) return false;
  for (const sector of DATA.sectors) {
    sectorByName.set(sector.n, sector);
  }
  for (const system of DATA.systems) {
    systemById.set(system.id, system);
    if (Array.isArray(system.p)) {
      for (const planet of system.p) {
        planetByKey.set(pk(system.id, planet.n), { s: system, p: planet });
      }
    }
  }
  return DATA.systems.length > 0;
}

function setRuntimeData(payload) {
  if (!payload || !Array.isArray(payload.sectors) || !Array.isArray(payload.systems) || !Array.isArray(payload.topics)) {
    return false;
  }

  for (const key of Object.keys(DATA)) delete DATA[key];
  Object.assign(DATA, payload);

  if (!rebuildIndexesFromData()) return false;
  if (!state.systemId || !systemById.has(state.systemId)) {
    state.systemId = DATA.systems[0].id;
  }
  state.compare.clear();
  state.scanKey = null;
  state.orbit.planets = [];
  state.orbit.hoverKey = null;
  state.orbit.focusKey = null;
  state.orbit.simMs = 0;
  state.orbit.ramp = 0;
  state.orbit.beltBySystem = {};
  state.orbit.elementsBySystem = {};
  state.orbit.zoom.current = 1;
  state.orbit.zoom.target = 1;
  state.orbit.pan.x = 0;
  state.orbit.pan.y = 0;
  state.orbit.pan.tx = 0;
  state.orbit.pan.ty = 0;
  return true;
}

async function loadRuntimeData() {
  try {
    const response = await fetch("./galaxy-data.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    if (setRuntimeData(payload)) return;
    console.warn("galaxy-data.json payload shape invalid, using embedded fallback.");
  } catch (err) {
    console.warn("Failed to load galaxy-data.json, using embedded fallback.", err);
  }
  rebuildIndexesFromData();
  if (DATA.systems.length > 0 && (!state.systemId || !systemById.has(state.systemId))) {
    state.systemId = DATA.systems[0].id;
  }
}

const n = (v, dec = 2) => Number(v).toFixed(dec);
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);
const meanT = (p) => (p.temp[0] + p.temp[1]) / 2;
const atmText = (atm) => Object.entries(atm).map(([g, v]) => `${g} ${v}%`).join(", ");
const smooth = (t) => t * t * (3 - 2 * t);

function orbitDurationSeconds(normDist) {
  const nDist = clamp(normDist, 0, 1);
  return 95 + 40 * nDist + 225 * nDist * nDist;
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

function getOrbitElements(systemId, planetType, planetName) {
  if (!state.orbit.elementsBySystem[systemId]) {
    const sysSeed = hashUnit(`${systemId}:inclination`);
    state.orbit.elementsBySystem[systemId] = {
      _inclination: 0.74 + sysSeed * 0.20
    };
  }
  const cache = state.orbit.elementsBySystem[systemId];
  const key = `${planetName}`;
  if (!cache[key]) {
    const seed = `${systemId}:${planetName}`;
    const giant = /giant/i.test(planetType);
    const eMin = giant ? 0.01 : 0.005;
    const eMax = giant ? 0.09 : 0.16;
    cache[key] = {
      eccentricity: eMin + hashUnit(`${seed}:e`) * (eMax - eMin),
      omega: hashUnit(`${seed}:omega`) * Math.PI * 2,
      phase: hashUnit(`${seed}:phase`) * Math.PI * 2
    };
  }
  return {
    ...cache[key],
    inclination: cache._inclination
  };
}

function resetOrbitRamp() {
  state.orbit.ramp = 0;
}

function getBeltParticles(systemId, innerRadius, outerRadius) {
  if (!state.orbit.beltBySystem[systemId]) {
    const points = [];
    for (let i = 0; i < 260; i += 1) {
      points.push({
        angle: Math.random() * Math.PI * 2,
        radius: rand(innerRadius, outerRadius),
        drift: rand(-0.0000014, 0.0000014),
        alpha: rand(0.12, 0.32)
      });
    }
    state.orbit.beltBySystem[systemId] = points;
  }
  return state.orbit.beltBySystem[systemId];
}

function syncScanVisualState() {
  document.body.classList.toggle("scan-active", state.scanOn);
}

function canvasPoint(ev, canvas) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (ev.clientX - rect.left) * scaleX,
    y: (ev.clientY - rect.top) * scaleY
  };
}

function pickOrbitPlanet(x, y) {
  let hit = null;
  let best = Number.POSITIVE_INFINITY;
  for (const planet of state.orbit.planets) {
    const dist = Math.hypot(planet.sx - x, planet.sy - y);
    const catchRadius = Math.max(8, planet.sr + 5);
    if (dist <= catchRadius && dist < best) {
      hit = planet;
      best = dist;
    }
  }
  return hit;
}

function renderPlanetFocus() {
  if (!d.focusOverlay || !d.focusContent || !d.orbitWrap) return;
  const entry = planetByKey.get(state.orbit.focusKey);
  const focused = Boolean(entry && entry.s.id === state.systemId);
  d.focusOverlay.classList.toggle("hidden", !focused);
  d.orbitWrap.classList.toggle("planet-focused", focused);
  if (!focused) return;
  const { p } = entry;
  d.focusContent.innerHTML = `
    <div class="planet-focus-head">
      <h4>${p.n}</h4>
      <span class="pill">Habitability ${p.hab}</span>
    </div>
    <p class="planet-focus-type">${p.t}</p>
    <div class="planet-focus-grid">
      <p><span class="muted">Mass</span><br /><strong>${p.m[0]} ${p.m[1]}</strong></p>
      <p><span class="muted">Gravity</span><br /><strong>${p.g} g</strong></p>
      <p><span class="muted">Orbit</span><br /><strong>${p.a} AU</strong></p>
      <p><span class="muted">Period</span><br /><strong>${p.op} d</strong></p>
      <p><span class="muted">Temp</span><br /><strong>${p.temp[0]} - ${p.temp[1]} K</strong></p>
      <p><span class="muted">Pressure</span><br /><strong>${p.pb} bar</strong></p>
    </div>
    <p><span class="muted">Atmosphere:</span> ${atmText(p.atm)}</p>
    <p><span class="muted">Visual:</span> ${p.v}</p>
    <p><span class="muted">Science:</span> ${p.sci}</p>
    <div class="planet-focus-status">
      <p><span class="muted">Hazard</span><br /><strong>${p.x.h}</strong></p>
      <p><span class="muted">Colonization</span><br /><strong>${p.x.c}</strong></p>
      <p><span class="muted">Resource</span><br /><strong>${p.x.rv}</strong></p>
      <p><span class="muted">Terraforming</span><br /><strong>${p.x.tf}</strong></p>
    </div>
  `;
}

function clearOrbitFocus(instant = false) {
  state.orbit.focusKey = null;
  state.orbit.hoverKey = null;
  state.orbit.zoom.target = 1;
  state.orbit.pan.tx = 0;
  state.orbit.pan.ty = 0;
  if (instant) {
    state.orbit.zoom.current = 1;
    state.orbit.pan.x = 0;
    state.orbit.pan.y = 0;
  }
  if (d.ocv) d.ocv.style.cursor = "default";
  renderPlanetFocus();
}

function setOrbitFocus(key) {
  const entry = planetByKey.get(key);
  if (!entry || entry.s.id !== state.systemId) return;
  state.orbit.focusKey = key;
  state.scanKey = key;
  renderScan();
  renderPlanetFocus();
}

function initGalaxyStars() {
  state.stars = [];
  for (let i = 0; i < 190; i += 1) {
    state.stars.push({
      x: Math.random(),
      y: Math.random(),
      size: rand(0.4, 1.7),
      alpha: rand(0.12, 0.52),
      drift: rand(0.00002, 0.00018),
      depth: rand(0.4, 1.0),
      phase: rand(0, Math.PI * 2)
    });
  }
}

function initCanvasInteraction() {
  const canvas = d.gcv;
  const updatePointer = (ev) => {
    const p = canvasPoint(ev, canvas);
    state.pointer.x = p.x;
    state.pointer.y = p.y;
    state.pointer.active = true;
  };
  canvas.addEventListener("mousemove", updatePointer);
  canvas.addEventListener("mouseenter", updatePointer);
  canvas.addEventListener("mouseleave", () => {
    state.pointer.active = false;
    state.hoverNode = -1;
    d.gcv.style.cursor = "default";
  });
  canvas.addEventListener("click", (ev) => {
    const p = canvasPoint(ev, canvas);
    const hit = pickGalaxyNode(p.x, p.y);
    if (hit) {
      window.location.href = hit.url;
    }
  });

  d.ocv.addEventListener("mousemove", (ev) => {
    const p = canvasPoint(ev, d.ocv);
    const hit = pickOrbitPlanet(p.x, p.y);
    state.orbit.hoverKey = hit ? hit.key : null;
    d.ocv.style.cursor = hit ? "pointer" : "default";
  });
  d.ocv.addEventListener("mouseleave", () => {
    state.orbit.hoverKey = null;
    d.ocv.style.cursor = "default";
  });
  d.ocv.addEventListener("click", (ev) => {
    const p = canvasPoint(ev, d.ocv);
    const hit = pickOrbitPlanet(p.x, p.y);
    if (hit && hit.sysId && hit.planetName) {
      window.location.href = planetUrl(hit.sysId, hit.planetName);
      return;
    }
    clearOrbitFocus();
  });
  if (d.focusClose) {
    d.focusClose.addEventListener("click", () => clearOrbitFocus());
  }
}

function initHeader() {
  d.galaxyName.textContent = DATA.name.toUpperCase();
  const now = new Date();
  d.revisionDate.textContent = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;
}

function initNav() {
  d.nav.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.view = btn.dataset.view;
      d.nav.forEach((x) => x.classList.toggle("active", x === btn));
      Object.entries(d.view).forEach(([k, v]) => v.classList.toggle("active", k === state.view));
    });
  });
}

function renderSectors() {
  d.sectorGrid.innerHTML = "";
  for (const s of DATA.sectors) {
    const card = document.createElement("article");
    card.className = "sector-card";
    card.style.background = `linear-gradient(155deg, ${s.tint}, rgba(9,8,11,.86))`;
    card.innerHTML = `
      <h3>${s.n}</h3>
      <div class="sector-stats">
        <p><span class="muted">Radiation Index</span><br /><strong>${s.r}</strong></p>
        <p><span class="muted">Star Density</span><br /><strong>${s.d}</strong></p>
      </div>
      <p class="threat-badge">Threat Level ${s.t}</p>
      <p><span class="muted">Notable Systems:</span> ${s.s.join(", ")}</p>
      <div class="mini-map"></div>
      <div class="card-actions">
        <a class="ghost-btn inline-link" href="${sectorUrl(s)}">Open Sector Page</a>
      </div>
    `;
    d.sectorGrid.append(card);
  }
}

function renderTopics() {
  d.topics.innerHTML = "";
  for (const title of DATA.topics) {
    const card = document.createElement("article");
    card.className = "topic-card";
    card.innerHTML = `<h3>${title}</h3><p>Field reference entry for tactical and scientific mission planning.</p>`;
    d.topics.append(card);
  }
}

function filteredSystems() {
  const cls = d.classFilter.value;
  const bin = d.binFilter.checked;
  const minHab = Number(d.habFilter.value);
  const hiRad = d.radFilter.checked;
  return DATA.systems.filter((s) => {
    const c = s.star.cls[0];
    const bestHab = Math.max(...s.p.map((p) => p.hab));
    const multi = /binary|trinary/i.test(s.star.mult);
    const sec = sectorByName.get(s.sector);
    if (cls !== "all" && cls !== c) return false;
    if (bin && !multi) return false;
    if (bestHab < minHab) return false;
    if (hiRad && sec.r < 70) return false;
    return true;
  });
}

function ensureScanKey() {
  const s = systemById.get(state.systemId);
  if (!s) return;
  if (!state.scanKey || !state.scanKey.startsWith(`${s.id}::`)) {
    state.scanKey = pk(s.id, s.p[0].n);
  }
}

function renderSystemList() {
  const list = filteredSystems();
  const previousSystemId = state.systemId;
  d.sysList.innerHTML = "";
  if (!list.length) {
    d.sysList.innerHTML = `<p class="muted">No systems match current filters.</p>`;
    return;
  }
  if (!list.find((s) => s.id === state.systemId)) state.systemId = list[0].id;
  if (state.systemId !== previousSystemId) {
    resetOrbitRamp();
  }
  for (const s of list) {
    const sec = sectorByName.get(s.sector);
    const bestHab = Math.max(...s.p.map((p) => p.hab));
    const item = document.createElement("button");
    item.type = "button";
    item.className = "system-item";
    item.classList.toggle("active", s.id === state.systemId);
    item.innerHTML = `
      <h4>${s.n}</h4>
      <p><span class="muted">Class:</span> ${s.star.cls}</p>
      <p><span class="muted">Sector:</span> ${s.sector}</p>
      <p><span class="muted">Best Habitability:</span> ${bestHab}/100</p>
      <p><span class="muted">Sector Radiation:</span> ${sec.r}</p>
    `;
    item.addEventListener("click", () => {
      if (state.systemId !== s.id) {
        resetOrbitRamp();
      }
      state.systemId = s.id;
      ensureScanKey();
      renderSystemList();
      renderSystem();
    });
    d.sysList.append(item);
  }
}

function renderStarStats(s) {
  d.starStats.innerHTML = `
    <p><span class="muted">Star Name</span><br /><strong>${s.n}</strong></p>
    <p><span class="muted">Stellar Class</span><br /><strong>${s.star.cls}</strong></p>
    <p><span class="muted">Surface Temperature</span><br /><strong>${s.star.tk} K</strong></p>
    <p><span class="muted">Luminosity</span><br /><strong>${s.star.lum} Lsun</strong></p>
    <p><span class="muted">Age</span><br /><strong>${s.star.age} Gyr</strong></p>
    <p><span class="muted">Habitable Zone</span><br /><strong>${s.star.hz[0]} - ${s.star.hz[1]} AU</strong></p>
    <p><span class="muted">Multiplicity</span><br /><strong>${s.star.mult}</strong></p>
    <p><span class="muted">Frost Line</span><br /><strong>${s.star.frost} AU</strong></p>
    <p><span class="muted">Asteroid Belt</span><br /><strong>${s.star.belt[0]} - ${s.star.belt[1]} AU</strong></p>
  `;
}
function renderRegistry(s) {
  d.registry.innerHTML = "";
  for (const p of s.p) {
    const key = pk(s.id, p.n);
    const checked = state.compare.has(key) ? "checked" : "";
    const card = document.createElement("article");
    card.className = "planet-card";
    card.innerHTML = `
      <div class="planet-head">
        <div><h4>${p.n}</h4><p class="planet-type">${p.t}</p></div>
        <span class="pill">Habitability ${p.hab}</span>
      </div>
      <div class="planet-actions">
        <label><input class="cmp" type="checkbox" ${checked} />Compare</label>
        <button class="ghost-btn scan-one" type="button">Scan Atmosphere</button>
        <a class="ghost-btn inline-link" href="${planetUrl(s.id, p.n)}">Open Planet Page</a>
      </div>
      <p class="section-label">DATA PANEL</p>
      <div class="planet-grid">
        <p><span class="muted">Mass</span><br />${p.m[0]} ${p.m[1]}</p>
        <p><span class="muted">Radius</span><br />${p.rad[0]} ${p.rad[1]}</p>
        <p><span class="muted">Gravity</span><br />${p.g} g</p>
        <p><span class="muted">Orbit</span><br />${p.a} AU / ${p.op} d</p>
        <p><span class="muted">Rotation</span><br />${p.rp}</p>
        <p><span class="muted">Axial Tilt</span><br />${p.tilt} deg</p>
        <p><span class="muted">Surface Temp</span><br />${p.temp[0]} - ${p.temp[1]} K</p>
        <p><span class="muted">Pressure</span><br />${p.pb} bar</p>
        <p><span class="muted">Magnetic Field</span><br />${p.mag}</p>
        <p><span class="muted">Albedo</span><br />${p.alb}</p>
      </div>
      <p><span class="muted">Atmosphere:</span> ${atmText(p.atm)}</p>
      <p class="section-label">VISUAL DESCRIPTION</p>
      <p>${p.v}</p>
      <p class="section-label">SCIENTIFIC EXPLANATION</p>
      <p>${p.sci}</p>
      <p class="section-label">EXPLORATION STATUS</p>
      <div class="status-grid">
        <p><span class="muted">Hazard</span><br />${p.x.h}</p>
        <p><span class="muted">Colonization</span><br />${p.x.c}</p>
        <p><span class="muted">Resource Value</span><br />${p.x.rv}</p>
        <p><span class="muted">Terraforming</span><br />${p.x.tf}</p>
      </div>
    `;
    card.querySelector(".cmp").addEventListener("change", (e) => {
      if (e.target.checked) {
        if (state.compare.size >= 4) {
          e.target.checked = false;
          return;
        }
        state.compare.add(key);
      } else {
        state.compare.delete(key);
      }
      renderCompare();
    });
    card.querySelector(".scan-one").addEventListener("click", () => {
      state.scanKey = key;
      state.scanOn = true;
      d.scanBtn.textContent = "Scan Mode: On";
      syncScanVisualState();
      renderScan();
    });
    d.registry.append(card);
  }
}

function renderTimeline(s) {
  const max = s.star.age * 1000;
  const pos = (Number(d.slider.value) / 100) * max;
  let row = s.tl[0];
  for (const entry of s.tl) {
    if (entry[0] <= pos) row = entry;
  }
  d.timelineEvent.textContent = `${Math.round(pos)} Myr: ${row[1]}`;
}

function renderScan() {
  const entry = planetByKey.get(state.scanKey);
  syncScanVisualState();
  if (!state.scanOn || !entry) {
    d.scanOverlay.classList.add("hidden");
    d.scanStatus.textContent = "Select a planet and enable scan mode.";
    return;
  }
  d.scanOverlay.classList.remove("hidden");
  d.scanStatus.textContent = `Active scan: ${entry.p.n} (${entry.s.n})`;
  const lines = Object.entries(entry.p.atm)
    .map(([gas, pct]) => `
      <div class="scan-row"><span>${gas}</span><span>${pct}%</span></div>
      <div class="scan-bar"><div class="scan-fill" style="width:${clamp(pct, 0, 100)}%"></div></div>
    `)
    .join("");
  d.scanOverlay.innerHTML = `
    <h4>Atmospheric Breakdown</h4>
    <p class="muted">${entry.p.n} | Pressure ${entry.p.pb} bar | Albedo ${entry.p.alb}</p>
    ${lines}
  `;
}

function renderCompare() {
  const entries = [...state.compare].map((k) => planetByKey.get(k)).filter(Boolean);
  d.comparePanel.innerHTML = "";
  if (!entries.length) {
    d.comparePanel.innerHTML = `<p class="muted">Select up to 4 planets for comparison.</p>`;
    return;
  }
  const metrics = [
    ["Gravity (g)", (e) => e.p.g],
    ["Mean Temp (K)", (e) => meanT(e.p)],
    ["Pressure (bar)", (e) => e.p.pb],
    ["Habitability", (e) => e.p.hab]
  ];
  const max = metrics.map(([, fn]) => Math.max(...entries.map(fn), 1));
  for (const e of entries) {
    const card = document.createElement("article");
    card.className = "compare-card";
    card.innerHTML = `<h4>${e.p.n} (${e.s.n})</h4>`;
    metrics.forEach(([name, fn], i) => {
      const val = fn(e);
      const w = clamp((val / max[i]) * 100, 0, 100);
      const row = document.createElement("div");
      row.className = "metric-row";
      row.innerHTML = `<span>${name}</span><span class="metric-bar"><i style="width:${w}%"></i></span><strong>${n(val, name === "Habitability" ? 0 : 2)}</strong>`;
      card.append(row);
    });
    d.comparePanel.append(card);
  }
}

function renderSystem() {
  const s = systemById.get(state.systemId);
  if (!s) return;
  if (state.orbit.focusKey && !state.orbit.focusKey.startsWith(`${s.id}::`)) {
    clearOrbitFocus(true);
  } else {
    renderPlanetFocus();
  }
  ensureScanKey();
  d.sysTitle.textContent = s.n;
  d.sysSub.textContent = `${s.sector} | ${s.star.cls} | HZ ${s.star.hz[0]}-${s.star.hz[1]} AU`;
  renderStarStats(s);
  renderRegistry(s);
  renderTimeline(s);
  renderScan();
}

function initFilters() {
  const rerender = () => {
    d.habValue.textContent = d.habFilter.value;
    renderSystemList();
    renderSystem();
  };
  d.classFilter.addEventListener("change", rerender);
  d.binFilter.addEventListener("change", rerender);
  d.habFilter.addEventListener("input", rerender);
  d.radFilter.addEventListener("change", rerender);
  d.slider.addEventListener("input", () => {
    const s = systemById.get(state.systemId);
    if (s) renderTimeline(s);
  });
  d.scanBtn.addEventListener("click", () => {
    state.scanOn = !state.scanOn;
    d.scanBtn.textContent = `Scan Mode: ${state.scanOn ? "On" : "Off"}`;
    syncScanVisualState();
    renderScan();
  });
}
function chooseWeighted(list) {
  let total = list.reduce((a, x) => a + x.w, 0);
  let r = Math.random() * total;
  for (const item of list) {
    r -= item.w;
    if (r <= 0) return item.v;
  }
  return list[list.length - 1].v;
}

function warpCandidate() {
  const weights = [{ v: "M", w: 73 }, { v: "K", w: 14 }, { v: "G", w: 8 }, { v: "F", w: 3 }, { v: "A", w: 1.5 }, { v: "B", w: 0.4 }, { v: "O", w: 0.1 }];
  const props = {
    O: { tk: [30000, 45000], l: [30000, 150000], m: [16, 40] },
    B: { tk: [10000, 30000], l: [25, 30000], m: [2.5, 16] },
    A: { tk: [7500, 10000], l: [5, 25], m: [1.4, 2.5] },
    F: { tk: [6000, 7500], l: [1.5, 5], m: [1.04, 1.4] },
    G: { tk: [5200, 6000], l: [0.6, 1.5], m: [0.8, 1.04] },
    K: { tk: [3900, 5200], l: [0.08, 0.6], m: [0.45, 0.8] },
    M: { tk: [2400, 3900], l: [0.0008, 0.08], m: [0.08, 0.45] }
  };
  const cls = chooseWeighted(weights);
  const p = props[cls];
  const lum = rand(p.l[0], p.l[1]);
  const hzIn = 0.95 * Math.sqrt(lum);
  const hzOut = 1.67 * Math.sqrt(lum);
  const frost = 4.85 * Math.sqrt(lum);
  const multRoll = Math.random();
  const mult = multRoll < 0.12 ? "Binary" : multRoll < 0.14 ? "Trinary" : "Single";
  const count = Math.round(rand(4, 9));
  const arch = [];
  let a = rand(0.04, 0.18);
  for (let i = 0; i < count; i += 1) {
    arch.push(a);
    a *= rand(1.45, 2.05);
  }
  const types = arch.map((dist) => {
    if (dist >= frost) return Math.random() < 0.7 ? "Gas/Ice Giant" : "Ice Super-Earth";
    if (dist > hzIn && dist < hzOut) return Math.random() < 0.5 ? "Temperate Rocky" : "Oceanic Rocky";
    if (dist < hzIn * 0.7) return "Hot Rocky";
    return "Cold Rocky";
  });
  const hazard = clamp(Math.round((cls === "M" ? 35 : 15) + ((cls === "O" || cls === "B") ? 45 : 0) + (mult !== "Single" ? 12 : 0) + rand(5, 25)), 1, 99);
  return {
    code: `${["NX", "VX", "KR", "SD", "TR"][Math.floor(Math.random() * 5)]}-${Math.floor(rand(100, 999))}`,
    cls,
    tk: Math.round(rand(p.tk[0], p.tk[1])),
    lum,
    mass: rand(p.m[0], p.m[1]),
    hzIn,
    hzOut,
    frost,
    mult,
    count,
    hazard,
    types
  };
}

function renderWarp(w) {
  d.warpResult.innerHTML = `
    <h3>${w.code}</h3>
    <p class="muted">Generated with weighted stellar distribution and valid orbital logic.</p>
    <p class="warp-class">${w.cls}</p>
    <div class="warp-divider"></div>
    <div class="warp-grid">
      <p><span class="muted">Multiplicity</span><br /><strong>${w.mult}</strong></p>
      <p><span class="muted">Temperature</span><br /><strong>${w.tk} K</strong></p>
      <p><span class="muted">Luminosity</span><br /><strong class="warp-emph">${n(w.lum, 4)} Lsun</strong></p>
      <p><span class="muted">Mass</span><br /><strong>${n(w.mass, 2)} Msun</strong></p>
      <p><span class="muted">Hazard</span><br /><strong>${w.hazard}</strong></p>
      <p><span class="muted">Habitable Zone</span><br /><strong class="warp-emph">${n(w.hzIn, 2)} - ${n(w.hzOut, 2)} AU</strong></p>
      <p><span class="muted">Frost Line</span><br /><strong>${n(w.frost, 2)} AU</strong></p>
      <p><span class="muted">Planet Count</span><br /><strong>${w.count}</strong></p>
      <p><span class="muted">Outer Regime</span><br /><strong>${w.types[w.types.length - 1]}</strong></p>
    </div>
    <p><span class="muted">Architecture:</span> ${w.types.join(" -> ")}</p>
  `;
}

function initWarp() {
  d.warpBtn.addEventListener("click", () => renderWarp(warpCandidate()));
  d.routeBtn.addEventListener("click", () => {
    state.routes = !state.routes;
    d.routeBtn.textContent = state.routes ? "Hide Routes" : "Show Routes";
  });
}

function drawGalaxy() {
  const c = d.gcv;
  const x = c.getContext("2d");
  const w = c.width;
  const h = c.height;
  const cx = w * 0.5;
  const cy = h * 0.5;
  x.clearRect(0, 0, w, h);

  const bg = x.createRadialGradient(cx, cy, 20, cx, cy, Math.max(w, h) * 0.75);
  bg.addColorStop(0, "rgba(70,15,24,.42)");
  bg.addColorStop(0.55, "rgba(18,8,14,.66)");
  bg.addColorStop(1, "rgba(3,3,5,.96)");
  x.fillStyle = bg;
  x.fillRect(0, 0, w, h);

  for (const star of state.stars) {
    const px = ((star.x + state.gt * star.drift * star.depth) % 1) * w;
    const py = ((star.y + state.gt * star.drift * 0.28 * star.depth) % 1) * h;
    const alpha = star.alpha * (0.65 + 0.35 * Math.sin(state.gt * 0.0013 + star.phase));
    x.beginPath();
    x.arc(px, py, star.size, 0, Math.PI * 2);
    x.fillStyle = `rgba(255,${Math.round(170 + star.depth * 60)},${Math.round(170 + star.depth * 60)},${alpha.toFixed(3)})`;
    x.fill();
  }

  for (let arm = 0; arm < 4; arm += 1) {
    x.beginPath();
    for (let step = 0; step <= 220; step += 1) {
      const th = step * 0.13 + arm * (Math.PI / 2) + state.gt * 0.00008;
      const r = 22 + step * 1.7;
      const px = cx + Math.cos(th) * r;
      const py = cy + Math.sin(th) * r * 0.68;
      if (!step) x.moveTo(px, py);
      else x.lineTo(px, py);
    }
    const armAlpha = 0.06 + 0.06 * (0.5 + 0.5 * Math.sin(state.gt * 0.001 + arm * 1.4));
    x.strokeStyle = `rgba(255,26,26,${armAlpha.toFixed(3)})`;
    x.lineWidth = 1.1 + arm * 0.06;
    x.shadowColor = "rgba(255,26,26,.35)";
    x.shadowBlur = 8;
    x.stroke();
  }

  const nodes = DATA.sectors.map((s) => ({ s, px: cx + s.c[0] * w * 0.78, py: cy + s.c[1] * h * 0.78 }));
  state.galaxyNodes = nodes.map((node) => ({
    id: sectorToken(node.s),
    type: "sector",
    px: node.px,
    py: node.py,
    radius: 42,
    url: sectorUrl(node.s),
    sector: node.s
  }));
  let hoveredNode = -1;
  let bestDistance = Number.POSITIVE_INFINITY;
  if (state.pointer.active) {
    for (let i = 0; i < nodes.length; i += 1) {
      const dx = nodes[i].px - state.pointer.x;
      const dy = nodes[i].py - state.pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist < bestDistance) {
        bestDistance = dist;
        hoveredNode = dist < 42 ? i : -1;
      }
    }
  }
  state.hoverNode = hoveredNode;
  d.gcv.style.cursor = state.hoverNode >= 0 ? "pointer" : "default";

  if (state.routes) {
    x.setLineDash([8, 8]);
    x.lineDashOffset = -(state.gt * 0.02);
    for (let i = 0; i < ROUTE_EDGES.length; i += 1) {
      const [a, b] = ROUTE_EDGES[i];
      const linked = state.hoverNode >= 0 && (state.hoverNode === a || state.hoverNode === b);
      const pulse = 0.5 + 0.5 * Math.sin(state.gt * 0.0017 + i * 1.3);
      const routeAlpha = 0.16 + 0.17 * pulse + (linked ? 0.24 : 0);
      x.beginPath();
      x.moveTo(nodes[a].px, nodes[a].py);
      x.lineTo(nodes[b].px, nodes[b].py);
      x.strokeStyle = `rgba(255,64,64,${routeAlpha.toFixed(3)})`;
      x.lineWidth = linked ? 1.9 : 1.1;
      x.stroke();

      const phase = (state.gt * 0.00024 + i * 0.17) % 1;
      const tx = nodes[a].px + (nodes[b].px - nodes[a].px) * phase;
      const ty = nodes[a].py + (nodes[b].py - nodes[a].py) * phase;
      x.beginPath();
      x.arc(tx, ty, linked ? 2.4 : 1.9, 0, Math.PI * 2);
      x.fillStyle = "rgba(255,140,140,.78)";
      x.shadowColor = "rgba(255, 110, 110, .65)";
      x.shadowBlur = 7;
      x.fill();
    }
    x.setLineDash([]);
  }

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    const hovered = i === state.hoverNode;
    const p = 4 + Math.sin(state.gt * 0.004 + node.px * 0.01) * 1.8 + (hovered ? 2.1 : 0);
    x.beginPath();
    x.arc(node.px, node.py, p + 2.5, 0, Math.PI * 2);
    x.fillStyle = hovered ? "rgba(255,72,72,.30)" : "rgba(255,40,40,.18)";
    x.fill();
    x.beginPath();
    x.arc(node.px, node.py, p, 0, Math.PI * 2);
    x.fillStyle = hovered ? "rgba(255,120,120,.96)" : "rgba(255,26,26,.86)";
    x.shadowColor = "rgba(255,26,26,.72)";
    x.shadowBlur = hovered ? 20 : 14;
    x.fill();

    if (hovered) {
      const sweep = (state.gt * 0.0022) % (Math.PI * 2);
      x.beginPath();
      x.arc(node.px, node.py, p + 9, sweep, sweep + Math.PI * 0.8);
      x.strokeStyle = "rgba(255, 190, 190, 0.65)";
      x.lineWidth = 1.1;
      x.stroke();
    }

    x.fillStyle = "rgba(255,210,210,.92)";
    x.font = "13px Orbitron";
    x.fillText(node.s.n.toUpperCase(), node.px + 10, node.py - 12);
  }

  const hoveredSector = state.hoverNode >= 0 ? nodes[state.hoverNode].s : null;
  if (hoveredSector) {
    const stats = [
      hoveredSector.n.toUpperCase(),
      `STAR DENSITY ${hoveredSector.d}`,
      `THREAT ${hoveredSector.t}`,
      `RADIATION ${hoveredSector.r}`,
      `SYSTEMS ${DATA.systems.filter((s) => s.sector === hoveredSector.n).length}`
    ];
    x.save();
    x.font = "12px Share Tech Mono";
    let width = 0;
    for (const line of stats) {
      width = Math.max(width, x.measureText(line).width);
    }
    const padX = 12;
    const padY = 9;
    const lineH = 16;
    const boxW = width + padX * 2;
    const boxH = stats.length * lineH + padY * 2;
    const anchor = nodes[state.hoverNode];
    const boxX = clamp(anchor.px + 18, 16, w - boxW - 16);
    const boxY = clamp(anchor.py - boxH - 14, 16, h - boxH - 16);
    x.fillStyle = "rgba(11,7,10,0.88)";
    x.strokeStyle = "rgba(255,88,88,0.42)";
    x.lineWidth = 1;
    x.beginPath();
    if (typeof x.roundRect === "function") {
      x.roundRect(boxX, boxY, boxW, boxH, 8);
    } else {
      x.rect(boxX, boxY, boxW, boxH);
    }
    x.fill();
    x.stroke();
    x.fillStyle = "rgba(255,218,218,0.95)";
    for (let i = 0; i < stats.length; i += 1) {
      x.fillText(stats[i], boxX + padX, boxY + padY + (i + 1) * lineH - 4);
    }
    x.restore();
  }

  const core = x.createRadialGradient(cx, cy, 0, cx, cy, 62 + Math.sin(state.gt * 0.002) * 9);
  core.addColorStop(0, "rgba(255, 190, 190, .70)");
  core.addColorStop(0.38, "rgba(255, 55, 55, .35)");
  core.addColorStop(1, "rgba(255, 10, 10, 0)");
  x.fillStyle = core;
  x.beginPath();
  x.arc(cx, cy, 84, 0, Math.PI * 2);
  x.fill();
}
function drawOrbit(deltaMs = 16) {
  const s = systemById.get(state.systemId);
  if (!s) return;
  const dt = clamp(deltaMs, 0, 120);
  state.orbit.ramp = clamp(state.orbit.ramp + dt / 2000, 0, 1);
  const rampGain = smooth(state.orbit.ramp);
  state.orbit.simMs += dt * rampGain;
  state.ot = state.orbit.simMs;
  const c = d.ocv;
  const x = c.getContext("2d");
  const w = c.width;
  const h = c.height;
  const cx = w * 0.44;
  const cy = h * 0.5;
  const maxR = Math.min(w, h) * 0.43;
  x.clearRect(0, 0, w, h);

  const bg = x.createRadialGradient(cx, cy, 40, cx, cy, maxR + 180);
  bg.addColorStop(0, "rgba(40,12,18,.35)");
  bg.addColorStop(1, "rgba(4,4,6,.97)");
  x.fillStyle = bg;
  x.fillRect(0, 0, w, h);

  const far = Math.max(...s.p.map((p) => p.a), s.star.frost, s.star.belt[1]);
  const innerA = Math.min(...s.p.map((p) => p.a));
  const outerA = Math.max(...s.p.map((p) => p.a));
  const spanA = Math.max(outerA - innerA, 0.001);
  const scale = (dist) => 48 + (Math.log(dist + 1) / Math.log(far + 1)) * (maxR - 48);
  const planets = s.p.map((p, i) => {
    const or = scale(p.a);
    const elements = getOrbitElements(s.id, p.t, p.n);
    const normDist = clamp((p.a - innerA) / spanA, 0, 1);
    const orbitSeconds = orbitDurationSeconds(normDist);
    const meanAnomaly = (state.orbit.simMs / 1000) * ((Math.PI * 2) / orbitSeconds) + elements.phase + i * 0.01;
    const eccentricAnomaly = solveKepler(meanAnomaly, elements.eccentricity);
    const cosE = Math.cos(eccentricAnomaly);
    const sinE = Math.sin(eccentricAnomaly);
    const semiMinor = or * Math.sqrt(1 - elements.eccentricity ** 2) * elements.inclination;
    const xFocus = or * (cosE - elements.eccentricity);
    const yFocus = semiMinor * sinE;
    const cosW = Math.cos(elements.omega);
    const sinW = Math.sin(elements.omega);
    const px = cx + (xFocus * cosW) - (yFocus * sinW);
    const py = cy + (xFocus * sinW) + (yFocus * cosW);
    const depth = clamp((yFocus / Math.max(1e-6, semiMinor) + 1) * 0.5, 0, 1);
    const depthScale = 0.86 + depth * 0.28;
    const r = (2.8 + p.m[0] * (p.m[1] === "Jupiter" ? 1.6 : 0.7)) * depthScale;
    return {
      key: pk(s.id, p.n),
      p,
      or,
      e: elements.eccentricity,
      omega: elements.omega,
      semiMinor,
      px,
      py,
      r,
      depth
    };
  });

  const focused = planets.find((p) => p.key === state.orbit.focusKey);
  if (state.orbit.focusKey && !focused) {
    clearOrbitFocus(true);
  }
  if (focused) {
    state.orbit.zoom.target = 1.85;
    const lockX = w * 0.4;
    const lockY = h * 0.53;
    state.orbit.pan.tx = lockX - focused.px * state.orbit.zoom.target;
    state.orbit.pan.ty = lockY - focused.py * state.orbit.zoom.target;
  } else {
    state.orbit.zoom.target = 1;
    state.orbit.pan.tx = 0;
    state.orbit.pan.ty = 0;
  }
  state.orbit.zoom.current = lerp(state.orbit.zoom.current, state.orbit.zoom.target, 0.12);
  state.orbit.pan.x = lerp(state.orbit.pan.x, state.orbit.pan.tx, 0.12);
  state.orbit.pan.y = lerp(state.orbit.pan.y, state.orbit.pan.ty, 0.12);
  state.orbit.pan.x = clamp(state.orbit.pan.x, -w * 0.6, w * 0.6);
  state.orbit.pan.y = clamp(state.orbit.pan.y, -h * 0.6, h * 0.6);
  const z = state.orbit.zoom.current;
  const panX = state.orbit.pan.x;
  const panY = state.orbit.pan.y;

  x.save();
  x.setTransform(z, 0, 0, z, panX, panY);

  const fr = scale(s.star.frost);
  x.beginPath();
  x.arc(cx, cy, fr, 0, Math.PI * 2);
  x.strokeStyle = "rgba(255,98,98,.35)";
  x.lineWidth = 1 / z;
  x.setLineDash([6, 6]);
  x.stroke();
  x.setLineDash([]);
  x.fillStyle = "rgba(255,170,170,.65)";
  x.font = `${12 / z}px Orbitron`;
  x.fillText("FROST LINE", cx + fr + 8, cy - 6);

  const b0 = scale(s.star.belt[0]);
  const b1 = scale(s.star.belt[1]);
  const beltDot = 1.05 / z;
  const belt = getBeltParticles(s.id, b0, b1);
  for (const grain of belt) {
    const ang = grain.angle + state.orbit.simMs * grain.drift;
    const pulse = 0.7 + 0.3 * Math.sin(state.orbit.simMs * 0.00015 + grain.angle);
    x.fillStyle = `rgba(255,110,110,${(grain.alpha * pulse).toFixed(3)})`;
    x.fillRect(cx + Math.cos(ang) * grain.radius, cy + Math.sin(ang) * grain.radius, beltDot, beltDot);
  }

  for (const planet of planets) {
    const isHover = planet.key === state.orbit.hoverKey;
    const isFocus = planet.key === state.orbit.focusKey;
    const labelOn = !state.orbit.focusKey || isHover || isFocus;

    x.save();
    x.translate(cx, cy);
    x.rotate(planet.omega);
    x.beginPath();
    x.ellipse(-planet.or * planet.e, 0, planet.or, planet.semiMinor, 0, 0, Math.PI * 2);
    x.strokeStyle = "rgba(255,26,26,.22)";
    x.lineWidth = (isFocus ? 1.5 : 1) / z;
    x.stroke();

    if (isFocus) {
      x.beginPath();
      x.ellipse(-planet.or * planet.e, 0, planet.or + 2.8 / z, planet.semiMinor + 2.8 / z, 0, 0, Math.PI * 2);
      x.strokeStyle = "rgba(255,130,130,.32)";
      x.lineWidth = 1 / z;
      x.stroke();
    }
    x.restore();

    const r = planet.r + (isHover ? 1 : 0) + (isFocus ? 1.8 : 0);
    x.beginPath();
    x.arc(planet.px, planet.py, r, 0, Math.PI * 2);
    const heat = Math.round(78 + planet.depth * 62);
    x.fillStyle = planet.p.m[1] === "Jupiter" ? `rgba(255,${heat + 18},${heat + 18},.92)` : `rgba(255,${heat},${heat},.92)`;
    x.shadowColor = "rgba(255,26,26,.75)";
    x.shadowBlur = (isFocus ? 19 : 10 + planet.depth * 5) / z;
    x.shadowOffsetX = ((planet.depth - 0.5) * 3) / z;
    x.shadowOffsetY = ((0.5 - planet.depth) * 2.4) / z;
    x.fill();

    if (isFocus || isHover) {
      x.beginPath();
      x.arc(planet.px, planet.py, r + 4.5 / z, 0, Math.PI * 2);
      x.strokeStyle = isFocus ? "rgba(255,220,220,.8)" : "rgba(255,180,180,.58)";
      x.lineWidth = 1 / z;
      x.stroke();
    }

    if (labelOn) {
      x.fillStyle = `rgba(255,220,220,${(0.52 + planet.depth * 0.38).toFixed(3)})`;
      x.font = `${11 / z}px Share Tech Mono`;
      x.fillText(planet.p.n, planet.px + r + 5 / z, planet.py - 4 / z);
    }
  }
  x.shadowBlur = 0;
  x.shadowOffsetX = 0;
  x.shadowOffsetY = 0;

  const flicker = 28 + Math.sin(state.ot * 0.0011) * 2 + Math.sin(state.ot * 0.0017) * 1.2;
  const core = x.createRadialGradient(cx, cy, 0, cx, cy, flicker);
  core.addColorStop(0, "rgba(255,230,230,1)");
  core.addColorStop(0.3, "rgba(255,80,80,.95)");
  core.addColorStop(1, "rgba(177,18,38,0)");
  x.fillStyle = core;
  x.beginPath();
  x.arc(cx, cy, flicker, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = "rgba(255,220,220,.9)";
  x.font = `${13 / z}px Orbitron`;
  x.fillText(`${s.n} STAR`, cx + 34, cy + 4);
  x.restore();

  state.orbit.planets = planets.map((p) => ({
    key: p.key,
    sysId: s.id,
    planetName: p.p.n,
    sx: p.px * z + panX,
    sy: p.py * z + panY,
    sr: p.r * z
  }));

  const focusHud = state.orbit.planets.find((p) => p.key === state.orbit.focusKey);
  if (focusHud) {
    const pulse = 18 + Math.sin(state.ot * 0.0012) * 2.3;
    x.strokeStyle = "rgba(255,170,170,.6)";
    x.lineWidth = 1;
    x.beginPath();
    x.arc(focusHud.sx, focusHud.sy, pulse, 0, Math.PI * 2);
    x.stroke();
    x.fillStyle = "rgba(255,210,210,.88)";
    x.font = "11px Orbitron";
    x.fillText("TARGET LOCK", focusHud.sx + pulse + 8, focusHud.sy - 8);
  }
}

function anim(ts) {
  if (state.frameTs === null) {
    state.frameTs = ts;
  }
  const dt = clamp(ts - state.frameTs, 0, 120);
  state.frameTs = ts;
  state.gt += dt * 0.18;
  drawGalaxy();
  drawOrbit(dt);
  requestAnimationFrame(anim);
}

function init() {
  initHeader();
  initGalaxyStars();
  initCanvasInteraction();
  syncScanVisualState();
  initNav();
  renderSectors();
  renderTopics();
  initFilters();
  initWarp();
  renderSystemList();
  renderSystem();
  renderCompare();
  state.frameTs = null;
  resetOrbitRamp();
  d.habValue.textContent = d.habFilter.value;
  d.routeBtn.textContent = "Hide Routes";
  requestAnimationFrame(anim);
}

async function bootstrap() {
  await loadRuntimeData();
  init();
}

bootstrap();
