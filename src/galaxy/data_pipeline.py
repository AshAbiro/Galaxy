"""Galaxy data generator and validator.

This module produces scientifically plausible fictional galaxy data and
validates the generated physics constraints.
"""

from __future__ import annotations

from dataclasses import dataclass
import json
import math
from pathlib import Path
import random
from typing import Any

EARTH_MASS_PER_JUPITER = 317.8
EARTH_RADIUS_PER_JUPITER = 11.21

STAR_MODELS: dict[str, dict[str, tuple[float, float]]] = {
    "O": {"temperature": (30_000, 45_000), "luminosity": (30_000, 150_000), "mass": (16, 40)},
    "B": {"temperature": (10_000, 30_000), "luminosity": (25, 30_000), "mass": (2.5, 16)},
    "A": {"temperature": (7_500, 10_000), "luminosity": (5, 25), "mass": (1.4, 2.5)},
    "F": {"temperature": (6_000, 7_500), "luminosity": (1.5, 5), "mass": (1.04, 1.4)},
    "G": {"temperature": (5_200, 6_000), "luminosity": (0.6, 1.5), "mass": (0.8, 1.04)},
    "K": {"temperature": (3_900, 5_200), "luminosity": (0.08, 0.6), "mass": (0.45, 0.8)},
    "M": {"temperature": (2_400, 3_900), "luminosity": (0.0008, 0.08), "mass": (0.08, 0.45)},
}

STAR_WEIGHTS: dict[str, float] = {
    "M": 73.0,
    "K": 14.0,
    "G": 8.0,
    "F": 3.0,
    "A": 1.5,
    "B": 0.4,
    "O": 0.1,
}

AGE_RANGE_GYR: dict[str, tuple[float, float]] = {
    "O": (0.001, 0.01),
    "B": (0.01, 0.15),
    "A": (0.2, 1.2),
    "F": (1.0, 5.0),
    "G": (2.0, 10.0),
    "K": (1.0, 12.0),
    "M": (1.0, 13.0),
}

SECTOR_TEMPLATES: list[dict[str, Any]] = [
    {"id": "hemlock", "n": "Hemlock Core", "r": 78, "d": 92, "t": 84, "tint": "rgba(177,18,38,.18)", "c": [-0.11, -0.08]},
    {"id": "cinder", "n": "Cinder Lattice", "r": 64, "d": 74, "t": 66, "tint": "rgba(42,13,46,.22)", "c": [0.34, -0.18]},
    {"id": "razor", "n": "Razor Meridian", "r": 47, "d": 68, "t": 55, "tint": "rgba(177,18,38,.12)", "c": [0.45, 0.28]},
    {"id": "vanta", "n": "Vanta Choir", "r": 88, "d": 56, "t": 91, "tint": "rgba(177,18,38,.27)", "c": [-0.30, -0.29]},
    {"id": "obsidian", "n": "Obsidian Frontier", "r": 31, "d": 42, "t": 38, "tint": "rgba(177,18,38,.08)", "c": [-0.50, 0.24]},
    {"id": "null", "n": "Null Aurora Rim", "r": 22, "d": 28, "t": 29, "tint": "rgba(42,13,46,.16)", "c": [0.04, 0.53]},
]

SYSTEM_NAME_PARTS = [
    "Kharon", "Vespera", "Nyx", "Orion", "Acheron", "Helix", "Vanta", "Noctis", "Cinder", "Razor", "Morrow", "Umbra"
]

PLANET_NAME_PARTS = [
    "Razor Ember", "Sable Meridian", "Noctis Pelagic", "Acheron Steppe", "Crimson Shepherd", "Veil Leviathan",
    "Glassknife", "Helion Scar", "Orphea", "Rimegate", "Tyr Vox", "Morrow Crown",
    "Cauter", "Umbra Dune", "Terminus Mare", "Redline Tundra", "Gravemantle", "Kestrel Deep",
    "Ilex Rift", "Obsidian Reach", "Ember Vault", "Drift Hollow", "Sanguine Arc", "Nadir Spine",
]

ENCYCLOPEDIA_TOPICS = [
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
    "Internal physics validation protocol",
]


@dataclass(frozen=True)
class PlanetProfile:
    """Simple type profile used by the generator."""

    label: str
    mass_range: tuple[float, float]
    radius_range: tuple[float, float]
    unit: str
    pressure_range: tuple[float, float]
    albedo_range: tuple[float, float]
    magnetic_prob: float


PLANET_PROFILES: dict[str, PlanetProfile] = {
    "volcanic": PlanetProfile("Volcanic rocky world", (0.35, 1.30), (0.55, 1.10), "Earth", (0.05, 0.80), (0.07, 0.20), 0.25),
    "hot_super_earth": PlanetProfile("Hot super-Earth", (1.00, 2.80), (1.00, 1.45), "Earth", (0.50, 3.20), (0.10, 0.24), 0.45),
    "temperate_terrestrial": PlanetProfile("Temperate terrestrial", (0.65, 1.50), (0.80, 1.20), "Earth", (0.70, 2.20), (0.22, 0.36), 0.75),
    "oceanic_super_earth": PlanetProfile("Oceanic super-Earth", (1.40, 3.40), (1.08, 1.70), "Earth", (1.00, 3.40), (0.24, 0.40), 0.80),
    "cold_super_earth": PlanetProfile("Cold super-Earth", (1.00, 3.60), (0.95, 1.75), "Earth", (0.80, 4.20), (0.30, 0.50), 0.70),
    "gas_giant": PlanetProfile("Gas giant", (0.18, 2.00), (0.68, 1.18), "Jupiter", (1.0, 1.0), (0.36, 0.60), 1.00),
    "ice_giant": PlanetProfile("Ice giant", (0.05, 0.30), (0.35, 0.75), "Jupiter", (1.0, 1.0), (0.42, 0.72), 1.00),
}

PROFILE_LABEL_TO_KEY: dict[str, str] = {
    profile.label.lower(): key
    for key, profile in PLANET_PROFILES.items()
}


def weighted_choice(rng: random.Random, weights: dict[str, float]) -> str:
    items = list(weights.items())
    total = sum(w for _, w in items)
    value = rng.uniform(0, total)
    running = 0.0
    for key, weight in items:
        running += weight
        if value <= running:
            return key
    return items[-1][0]


def log_uniform(rng: random.Random, low: float, high: float) -> float:
    return math.exp(rng.uniform(math.log(low), math.log(high)))


def slugify(name: str) -> str:
    return name.lower().replace(" ", "-")


def round_dict_percent(values: dict[str, float], digits: int = 1) -> dict[str, float]:
    total = sum(values.values())
    normalized = {k: (v / total) * 100.0 for k, v in values.items()}
    rounded = {k: round(v, digits) for k, v in normalized.items()}
    target_total = round(100.0, digits)
    diff = round(target_total - sum(rounded.values()), digits)
    if diff != 0:
        max_key = max(rounded, key=rounded.get)
        rounded[max_key] = round(rounded[max_key] + diff, digits)
    return rounded


def jitter_mix(rng: random.Random, base: dict[str, float], jitter: float = 0.18) -> dict[str, float]:
    values: dict[str, float] = {}
    for gas, pct in base.items():
        scale = 1.0 + rng.uniform(-jitter, jitter)
        values[gas] = max(0.05, pct * scale)
    return round_dict_percent(values)


def atmosphere_for_type(rng: random.Random, profile_key: str) -> dict[str, float]:
    bases: dict[str, dict[str, float]] = {
        "volcanic": {"CO2": 58, "SO2": 17, "N2": 14, "CO": 8, "Ar": 3},
        "hot_super_earth": {"CO2": 66, "N2": 23, "SO2": 5, "H2O": 3, "Ar": 3},
        "temperate_terrestrial": {"N2": 76, "O2": 20, "Ar": 2, "CO2": 1, "H2O": 1},
        "oceanic_super_earth": {"N2": 72, "O2": 13, "CO2": 8, "H2O": 5, "Ar": 2},
        "cold_super_earth": {"N2": 64, "CO2": 24, "O2": 7, "Ar": 3, "CH4": 2},
        "gas_giant": {"H2": 86, "He": 13, "CH4": 0.7, "NH3": 0.2, "Traces": 0.1},
        "ice_giant": {"H2": 80, "He": 17, "CH4": 2.0, "NH3": 0.5, "H2S": 0.5},
    }
    return jitter_mix(rng, bases[profile_key], jitter=0.12 if "giant" in profile_key else 0.20)


def infer_profile_key(planet_type: str) -> str | None:
    normalized = planet_type.strip().lower()
    if normalized in PROFILE_LABEL_TO_KEY:
        return PROFILE_LABEL_TO_KEY[normalized]
    if "ice giant" in normalized:
        return "ice_giant"
    if "gas giant" in normalized:
        return "gas_giant"
    if "volcanic" in normalized or "lava" in normalized:
        return "volcanic"
    if "hot super-earth" in normalized:
        return "hot_super_earth"
    if "oceanic" in normalized:
        return "oceanic_super_earth"
    if "temperate" in normalized:
        return "temperate_terrestrial"
    if "cold super-earth" in normalized:
        return "cold_super_earth"
    return None


def greenhouse_index(atmosphere: dict[str, float]) -> float:
    co2 = atmosphere.get("CO2", 0.0) / 100.0
    ch4 = atmosphere.get("CH4", 0.0) / 100.0
    h2o = atmosphere.get("H2O", 0.0) / 100.0
    so2 = atmosphere.get("SO2", 0.0) / 100.0
    nh3 = atmosphere.get("NH3", 0.0) / 100.0
    broadener = atmosphere.get("N2", 0.0) / 100.0
    index = (1.35 * co2) + (2.05 * ch4) + (1.30 * h2o) + (1.10 * so2) + (1.50 * nh3) + (0.10 * broadener)
    return max(0.0, min(1.8, index))


def estimate_surface_pressure_bar(
    profile_key: str,
    gravity_g: float,
    mass_value: float,
    radius_value: float,
    atmosphere: dict[str, float],
    teq_k: float,
) -> float:
    if "giant" in profile_key:
        return 1.0

    base_column = {
        "volcanic": 0.42,
        "hot_super_earth": 1.35,
        "temperate_terrestrial": 1.00,
        "oceanic_super_earth": 1.55,
        "cold_super_earth": 1.75,
    }[profile_key]
    volatile_fraction = (
        atmosphere.get("N2", 0.0)
        + atmosphere.get("CO2", 0.0)
        + atmosphere.get("H2O", 0.0)
        + atmosphere.get("CH4", 0.0)
        + atmosphere.get("SO2", 0.0)
    ) / 100.0
    retention = max(0.45, min(2.4, math.sqrt(max(0.05, mass_value / max(radius_value, 0.05)))))
    thermal_escape = max(0.18, min(1.0, 1.0 - max(0.0, teq_k - 420.0) / 900.0 * (1.1 / retention)))
    condensation = max(0.35, min(1.2, 0.55 + (min(teq_k, 420.0) / 420.0) * 0.65))
    pressure = base_column * gravity_g * (0.65 + volatile_fraction) * retention * thermal_escape * condensation
    return max(0.02, pressure)


def mean_surface_temperature_k(
    profile_key: str,
    teq_k: float,
    pressure_bar: float,
    atmosphere: dict[str, float],
    gravity_g: float,
    tidally_locked: bool,
) -> float:
    greenhouse = greenhouse_index(atmosphere)
    if profile_key == "gas_giant":
        internal_heat = 14.0 + (18.0 * min(2.0, gravity_g))
        return teq_k + internal_heat
    if profile_key == "ice_giant":
        internal_heat = 9.0 + (10.0 * min(2.0, gravity_g))
        return teq_k + internal_heat

    greenhouse_scale = {
        "volcanic": 78.0,
        "hot_super_earth": 70.0,
        "temperate_terrestrial": 46.0,
        "oceanic_super_earth": 40.0,
        "cold_super_earth": 34.0,
    }[profile_key]
    broadening = 4.0 * math.log1p(max(0.01, atmosphere.get("N2", 0.0) / 30.0))
    delta = greenhouse_scale * math.log1p(max(0.01, pressure_bar)) * (0.22 + greenhouse)
    lock_offset = 6.0 if tidally_locked else 0.0
    return teq_k + delta + broadening + lock_offset


def gravity_from_mass_radius(mass_value: float, radius_value: float, unit: str) -> float:
    if unit == "Earth":
        return mass_value / (radius_value ** 2)
    mass_earth = mass_value * EARTH_MASS_PER_JUPITER
    radius_earth = radius_value * EARTH_RADIUS_PER_JUPITER
    return mass_earth / (radius_earth ** 2)


def orbital_period_days(semi_major_au: float, star_mass_solar: float) -> float:
    years = math.sqrt((semi_major_au ** 3) / star_mass_solar)
    return years * 365.25


def equilibrium_temperature_k(luminosity_solar: float, semi_major_au: float, albedo: float) -> float:
    return 278.0 * (luminosity_solar ** 0.25) / math.sqrt(semi_major_au) * ((1.0 - albedo) ** 0.25)


def classify_planet_regime(
    rng: random.Random,
    semi_major_au: float,
    hz_inner_au: float,
    hz_outer_au: float,
    frost_line_au: float,
) -> str:
    if semi_major_au >= frost_line_au:
        if semi_major_au >= frost_line_au * 2.2:
            return "ice_giant"
        return "gas_giant" if rng.random() < 0.65 else "ice_giant"
    if semi_major_au < hz_inner_au * 0.65:
        return "volcanic" if rng.random() < 0.55 else "hot_super_earth"
    if hz_inner_au <= semi_major_au <= hz_outer_au:
        return "temperate_terrestrial" if rng.random() < 0.55 else "oceanic_super_earth"
    return "cold_super_earth"


def build_visual_description(profile_key: str, magnetic_field: str, tidally_locked: bool) -> str:
    base = {
        "volcanic": "Black basalt ridges and crimson lava vents dominate the day hemisphere.",
        "hot_super_earth": "Dark red deserts and obsidian plains sit under mineral haze bands.",
        "temperate_terrestrial": "Dark oceans and iron-rich continents with layered cloud decks.",
        "oceanic_super_earth": "A deep ocean world with bright cloud annulus over warm longitudes.",
        "cold_super_earth": "Rust-tinted tundra and black escarpments with seasonal frost fields.",
        "gas_giant": "Burgundy and charcoal cloud bands with bright electrical storm cells.",
        "ice_giant": "Indigo cloud tops with a faint crimson limb glow and thin ring arcs.",
    }[profile_key]
    aurora = "Strong auroral bands appear during particle storms." if magnetic_field == "Yes" else "Aurora is weak due limited magnetospheric shielding."
    lock = "Long-terminator weather corridors indicate synchronous rotation." if tidally_locked else "Coriolis-driven circulation produces broad moving fronts."
    return f"{base} {lock} {aurora}"


def build_science_explanation(
    profile_key: str,
    semi_major_au: float,
    hz_inner_au: float,
    hz_outer_au: float,
    pressure_bar: float,
    gravity_g: float,
    tidally_locked: bool,
) -> str:
    if "giant" in profile_key:
        zone_text = "beyond the frost line where volatile-rich cores can capture deep hydrogen-helium envelopes"
        return (
            f"Orbital placement at {semi_major_au:.2f} AU is {zone_text}. "
            f"Pressure values are reported at a 1 bar reference level, and gravity ({gravity_g:.2f} g) reflects the mass-radius combination."
        )
    in_hz = hz_inner_au <= semi_major_au <= hz_outer_au
    hz_text = "inside the stellar habitable zone" if in_hz else "outside the conservative habitable zone"
    lock_text = "Likely tidal locking reshapes day-night circulation." if tidally_locked else "Non-synchronous rotation enables stronger zonal heat redistribution."
    return (
        f"The planet orbits {hz_text} at {semi_major_au:.3f} AU. "
        f"Surface pressure ({pressure_bar:.2f} bar) and gravity ({gravity_g:.2f} g) set cloud scale heights and convection efficiency. "
        f"{lock_text}"
    )


def habitability_score(
    profile_key: str,
    mean_temp_k: float,
    pressure_bar: float,
    magnetic_field: str,
    semi_major_au: float,
    hz_inner_au: float,
    hz_outer_au: float,
    atmosphere: dict[str, float],
) -> int:
    if "giant" in profile_key:
        return 0

    score = 0.0
    if 240 <= mean_temp_k <= 320:
        score += 35
    elif 200 <= mean_temp_k <= 360:
        score += 20

    if 0.5 <= pressure_bar <= 3.0:
        score += 20
    elif 0.1 <= pressure_bar <= 5.0:
        score += 10

    oxygen = atmosphere.get("O2", 0.0)
    if 10 <= oxygen <= 30:
        score += 15
    elif oxygen >= 1:
        score += 8

    if magnetic_field == "Yes":
        score += 10

    if hz_inner_au <= semi_major_au <= hz_outer_au:
        score += 15

    if mean_temp_k > 420:
        score -= 20
    elif mean_temp_k < 180:
        score -= 15

    if profile_key in {"volcanic", "hot_super_earth"}:
        score -= 8

    return int(max(0, min(100, round(score))))


def exploration_status(habitability: int, profile_key: str) -> dict[str, str]:
    if "giant" in profile_key:
        return {
            "h": "High" if profile_key == "ice_giant" else "Extreme",
            "c": "Moons only",
            "rv": "Very high",
            "tf": "N/A",
        }
    if habitability >= 75:
        return {"h": "Moderate", "c": "High", "rv": "High", "tf": "Low"}
    if habitability >= 50:
        return {"h": "Moderate", "c": "Moderate", "rv": "High", "tf": "Moderate"}
    if habitability >= 25:
        return {"h": "Moderate-high", "c": "Low-moderate", "rv": "High", "tf": "High"}
    return {"h": "High", "c": "Low", "rv": "Moderate-high", "tf": "Very high"}


def profile_temp_range(
    profile_key: str,
    mean_temp_k: float,
    pressure_bar: float,
    tidally_locked: bool,
    axial_tilt_deg: float,
    atmosphere: dict[str, float],
) -> tuple[int, int]:
    water_fraction = atmosphere.get("H2O", 0.0) / 100.0
    n2_fraction = atmosphere.get("N2", 0.0) / 100.0
    transport = max(0.25, min(1.25, 0.55 + 0.22 * math.log1p(max(0.01, pressure_bar)) + 0.15 * water_fraction + 0.10 * n2_fraction))

    if tidally_locked:
        base_amp = {
            "volcanic": 520.0,
            "hot_super_earth": 230.0,
            "temperate_terrestrial": 95.0,
            "oceanic_super_earth": 78.0,
            "cold_super_earth": 135.0,
            "gas_giant": 72.0,
            "ice_giant": 58.0,
        }[profile_key]
        amplitude = base_amp * (1.18 - 0.55 * transport)
    else:
        base_amp = {
            "volcanic": 210.0,
            "hot_super_earth": 110.0,
            "temperate_terrestrial": 42.0,
            "oceanic_super_earth": 35.0,
            "cold_super_earth": 66.0,
            "gas_giant": 58.0,
            "ice_giant": 46.0,
        }[profile_key]
        tilt_factor = 0.85 + (axial_tilt_deg / 55.0)
        amplitude = base_amp * tilt_factor * (1.10 - 0.35 * transport)

    amplitude = max(6.0, amplitude)
    low = mean_temp_k - (0.56 * amplitude)
    high = mean_temp_k + (0.44 * amplitude)
    if tidally_locked:
        high = mean_temp_k + (0.50 * amplitude)
    low = max(25.0, low)
    high = max(low + 4.0, high)
    return int(round(low)), int(round(high))


def format_rotation(rotation_days: float) -> str:
    if rotation_days < 2.0:
        return f"{rotation_days * 24:.1f} h"
    return f"{rotation_days:.1f} d"


def generate_star(
    rng: random.Random,
    star_class: str,
) -> dict[str, Any]:
    model = STAR_MODELS[star_class]
    temperature = round(rng.uniform(*model["temperature"]))
    luminosity = log_uniform(rng, *model["luminosity"])
    mass = rng.uniform(*model["mass"])
    age = rng.uniform(*AGE_RANGE_GYR[star_class])

    hz_inner = 0.95 * math.sqrt(luminosity)
    hz_outer = 1.67 * math.sqrt(luminosity)
    frost = 4.85 * math.sqrt(luminosity)
    asteroid_center = frost * rng.uniform(1.00, 1.35)
    asteroid_width = max(0.02, asteroid_center * rng.uniform(0.06, 0.12))
    belt = [max(0.01, asteroid_center - asteroid_width), asteroid_center + asteroid_width]

    multiplicity_roll = rng.random()
    multiplicity = "Single"
    if multiplicity_roll < 0.10:
        multiplicity = "Trinary"
    elif multiplicity_roll < 0.28:
        multiplicity = "Binary"

    cls_with_subtype = f"{star_class}{rng.randint(0, 8)}V"
    mult_text = multiplicity
    if multiplicity == "Binary":
        companion = weighted_choice(rng, STAR_WEIGHTS)
        mult_text = f"Binary ({companion}{rng.randint(0, 8)}V at {round(rng.uniform(15, 90), 1)} AU)"
    elif multiplicity == "Trinary":
        c1 = weighted_choice(rng, STAR_WEIGHTS)
        c2 = weighted_choice(rng, STAR_WEIGHTS)
        mult_text = f"Trinary ({c1}{rng.randint(0, 8)}V + {c2}{rng.randint(0, 8)}V pair)"

    return {
        "cls": cls_with_subtype,
        "tk": int(temperature),
        "lum": round(luminosity, 5),
        "age": round(age, 2),
        "hz": [round(hz_inner, 3), round(hz_outer, 3)],
        "mult": mult_text,
        "frost": round(frost, 3),
        "belt": [round(belt[0], 3), round(belt[1], 3)],
        "m": round(mass, 3),
    }


def generate_planets(
    rng: random.Random,
    star: dict[str, Any],
    planet_count: int,
    name_pool: list[str],
) -> list[dict[str, Any]]:
    star_class = star["cls"][0]
    hz_inner, hz_outer = star["hz"]
    frost = star["frost"]
    star_mass = star["m"]
    lum = star["lum"]

    if star_class == "M":
        start = rng.uniform(0.03, 0.08)
    elif star_class == "K":
        start = rng.uniform(0.05, 0.14)
    else:
        start = rng.uniform(0.10, 0.35)

    distances = [start]
    for _ in range(planet_count - 1):
        distances.append(distances[-1] * rng.uniform(1.42, 2.05))

    if distances[-1] < frost * 1.10:
        scale = (frost * 1.20) / distances[-1]
        distances = [d * scale for d in distances]

    planets: list[dict[str, Any]] = []
    for index, distance in enumerate(distances):
        profile_key = classify_planet_regime(rng, distance, hz_inner, hz_outer, frost)
        profile = PLANET_PROFILES[profile_key]

        mass = rng.uniform(*profile.mass_range)
        radius = rng.uniform(*profile.radius_range)
        gravity = gravity_from_mass_radius(mass, radius, profile.unit)
        albedo = rng.uniform(*profile.albedo_range)
        orbital_days = orbital_period_days(distance, star_mass)
        tidally_locked = (star_class in {"M", "K"} and distance < hz_inner * 0.85) or (orbital_days < 20 and profile.unit == "Earth")
        if tidally_locked:
            rotation_days = orbital_days
        elif "giant" in profile_key:
            rotation_days = rng.uniform(0.35, 0.90)
        else:
            rotation_days = rng.uniform(0.60, 2.80)

        if tidally_locked:
            tilt = rng.uniform(0.0, 6.0)
        elif "giant" in profile_key:
            tilt = rng.uniform(0.0, 32.0)
        else:
            tilt = rng.uniform(2.0, 35.0)

        atmosphere = atmosphere_for_type(rng, profile_key)
        magnetic = "Yes" if rng.random() <= profile.magnetic_prob else "No"
        teq = equilibrium_temperature_k(lum, distance, albedo)
        if profile.unit == "Earth":
            pressure_model = estimate_surface_pressure_bar(
                profile_key=profile_key,
                gravity_g=gravity,
                mass_value=mass,
                radius_value=radius,
                atmosphere=atmosphere,
                teq_k=teq,
            )
            pressure = max(profile.pressure_range[0], min(profile.pressure_range[1], pressure_model))
        else:
            pressure = 1.0

        mean_temp = mean_surface_temperature_k(
            profile_key=profile_key,
            teq_k=teq,
            pressure_bar=pressure,
            atmosphere=atmosphere,
            gravity_g=gravity,
            tidally_locked=tidally_locked,
        )
        t_min, t_max = profile_temp_range(
            profile_key,
            mean_temp_k=mean_temp,
            pressure_bar=pressure,
            tidally_locked=tidally_locked,
            axial_tilt_deg=tilt,
            atmosphere=atmosphere,
        )
        hab = habitability_score(
            profile_key=profile_key,
            mean_temp_k=(t_min + t_max) / 2,
            pressure_bar=pressure,
            magnetic_field=magnetic,
            semi_major_au=distance,
            hz_inner_au=hz_inner,
            hz_outer_au=hz_outer,
            atmosphere=atmosphere,
        )

        name = name_pool[index % len(name_pool)]
        planet = {
            "n": name,
            "t": profile.label,
            "m": [round(mass, 2), profile.unit],
            "rad": [round(radius, 2), profile.unit],
            "g": round(gravity, 2),
            "a": round(distance, 4),
            "op": round(orbital_days, 2),
            "rp": format_rotation(rotation_days),
            "rot_days": round(rotation_days, 4),
            "tilt": round(tilt, 1),
            "temp": [int(t_min), int(t_max)],
            "atm": atmosphere,
            "pb": round(pressure, 2) if profile.unit == "Earth" else 1,
            "teq": round(teq, 1),
            "tmean": round(mean_temp, 1),
            "mag": magnetic,
            "alb": round(albedo, 2),
            "hab": hab,
            "v": build_visual_description(profile_key, magnetic, tidally_locked),
            "sci": build_science_explanation(
                profile_key,
                semi_major_au=distance,
                hz_inner_au=hz_inner,
                hz_outer_au=hz_outer,
                pressure_bar=pressure if profile.unit == "Earth" else 1.0,
                gravity_g=gravity,
                tidally_locked=tidally_locked,
            ),
            "x": exploration_status(hab, profile_key),
            "locked": tidally_locked,
        }
        planets.append(planet)

    return planets


def system_timeline(age_gyr: float) -> list[list[Any]]:
    age_myr = int(round(age_gyr * 1000))
    mid = max(100, int(age_myr * 0.22))
    late = max(300, int(age_myr * 0.45))
    return [
        [0, "Molecular cloud collapse and protostar ignition."],
        [20, "Rocky embryo growth and early orbital clearing."],
        [mid, "Late accretion and migration damping."],
        [late, "Atmospheric restructuring and climate stabilization."],
        [age_myr, "Present epoch with mature orbital architecture."],
    ]


def build_sector_list(rng: random.Random, sector_count: int) -> list[dict[str, Any]]:
    sectors: list[dict[str, Any]] = []
    for i in range(sector_count):
        base = SECTOR_TEMPLATES[i % len(SECTOR_TEMPLATES)]
        if i < len(SECTOR_TEMPLATES):
            sectors.append({**base, "s": []})
        else:
            jitter = rng.uniform(-0.08, 0.08)
            sectors.append(
                {
                    "id": f"sector-{i + 1}",
                    "n": f"Sector {i + 1}",
                    "r": int(max(5, min(99, base["r"] + rng.randint(-12, 12)))),
                    "d": int(max(5, min(99, base["d"] + rng.randint(-14, 14)))),
                    "t": int(max(5, min(99, base["t"] + rng.randint(-15, 15)))),
                    "tint": base["tint"],
                    "c": [round(base["c"][0] + jitter, 2), round(base["c"][1] - jitter, 2)],
                    "s": [],
                }
            )
    return sectors


def generate_galaxy(
    *,
    seed: int | None = None,
    sector_count: int = 6,
    system_count: int = 3,
    planets_per_system: int = 6,
) -> dict[str, Any]:
    """Generate galaxy data with deterministic output for a given seed."""
    rng = random.Random(seed)

    sectors = build_sector_list(rng, sector_count)

    required_m_stars = system_count // 2 + 1
    star_classes = ["M"] * required_m_stars
    while len(star_classes) < system_count:
        star_classes.append(weighted_choice(rng, STAR_WEIGHTS))
    rng.shuffle(star_classes)

    systems: list[dict[str, Any]] = []
    for i in range(system_count):
        base_name = SYSTEM_NAME_PARTS[i % len(SYSTEM_NAME_PARTS)]
        code = rng.randint(10, 99)
        system_name = f"{base_name}-{code}"
        star_class = star_classes[i]
        star = generate_star(rng, star_class)

        start_idx = (i * planets_per_system) % len(PLANET_NAME_PARTS)
        planet_names = [
            PLANET_NAME_PARTS[(start_idx + j) % len(PLANET_NAME_PARTS)]
            for j in range(planets_per_system)
        ]
        planets = generate_planets(rng, star, planets_per_system, planet_names)

        sector = sectors[i % len(sectors)]
        sector["s"].append(system_name)

        systems.append(
            {
                "id": slugify(system_name),
                "n": system_name,
                "sector": sector["n"],
                "star": star,
                "tl": system_timeline(star["age"]),
                "p": planets,
            }
        )

    return {
        "name": "Sanguis Noctis",
        "sectors": sectors,
        "systems": systems,
        "topics": ENCYCLOPEDIA_TOPICS[:],
        "meta": {
            "seed": seed,
            "generator": "galaxy.data_pipeline",
            "version": 1,
        },
    }


def validate_galaxy(data: dict[str, Any]) -> list[str]:
    """Validate astrophysics consistency and schema-level constraints."""
    issues: list[str] = []

    sectors = data.get("sectors")
    systems = data.get("systems")
    if not isinstance(sectors, list) or not isinstance(systems, list):
        return ["Missing required top-level lists: sectors/systems"]

    sector_names = {s.get("n") for s in sectors if isinstance(s, dict)}
    if len(sector_names) != len(sectors):
        issues.append("Sector names must be unique.")

    m_count = 0
    for system in systems:
        name = system.get("n", "<unknown>")
        star = system.get("star", {})
        planets = system.get("p", [])
        if system.get("sector") not in sector_names:
            issues.append(f"{name}: references unknown sector '{system.get('sector')}'.")

        if not isinstance(star, dict) or not isinstance(planets, list):
            issues.append(f"{name}: invalid star/planet payload.")
            continue

        cls = str(star.get("cls", ""))
        if cls.startswith("M"):
            m_count += 1

        try:
            mass = float(star["m"])
            lum = float(star["lum"])
            hz_inner, hz_outer = float(star["hz"][0]), float(star["hz"][1])
            frost = float(star["frost"])
        except Exception:
            issues.append(f"{name}: star block is missing numeric fields.")
            continue

        expected_hz_inner = 0.95 * math.sqrt(lum)
        expected_hz_outer = 1.67 * math.sqrt(lum)
        expected_frost = 4.85 * math.sqrt(lum)
        if abs(expected_hz_inner - hz_inner) / max(expected_hz_inner, 1e-6) > 0.25:
            issues.append(f"{name}: habitable-zone inner boundary is inconsistent with luminosity.")
        if abs(expected_hz_outer - hz_outer) / max(expected_hz_outer, 1e-6) > 0.25:
            issues.append(f"{name}: habitable-zone outer boundary is inconsistent with luminosity.")
        if abs(expected_frost - frost) / max(expected_frost, 1e-6) > 0.30:
            issues.append(f"{name}: frost line is inconsistent with luminosity.")

        previous_distance = -1.0
        for idx, planet in enumerate(planets):
            pname = planet.get("n", f"{name}-planet-{idx}")
            try:
                distance = float(planet["a"])
                period = float(planet["op"])
                mass_value = float(planet["m"][0])
                radius_value = float(planet["rad"][0])
                unit = str(planet["m"][1])
                gravity = float(planet["g"])
                pressure = float(planet["pb"])
                t_low, t_high = int(planet["temp"][0]), int(planet["temp"][1])
                albedo = float(planet["alb"])
                tilt = float(planet.get("tilt", 0.0))
                planet_type = str(planet.get("t", ""))
            except Exception:
                issues.append(f"{name}/{pname}: missing numeric fields.")
                continue

            if distance <= previous_distance:
                issues.append(f"{name}/{pname}: orbital distances must increase outward.")
            previous_distance = distance

            expected_period = orbital_period_days(distance, mass)
            period_error = abs(expected_period - period) / max(expected_period, 1e-6)
            if period_error > 0.18:
                issues.append(f"{name}/{pname}: orbital period deviates from Kepler by >18%.")

            expected_g = gravity_from_mass_radius(mass_value, radius_value, unit)
            g_error = abs(expected_g - gravity) / max(expected_g, 1e-6)
            if g_error > 0.15:
                issues.append(f"{name}/{pname}: gravity mismatch for mass/radius.")

            atm = planet.get("atm", {})
            if not isinstance(atm, dict) or len(atm) == 0:
                issues.append(f"{name}/{pname}: atmosphere payload missing.")
            else:
                atm_total = sum(float(v) for v in atm.values())
                if abs(atm_total - 100.0) > 1.2:
                    issues.append(f"{name}/{pname}: atmosphere percentages must sum to ~100.")

            if pressure <= 0:
                issues.append(f"{name}/{pname}: surface pressure must be positive.")
            if t_low >= t_high:
                issues.append(f"{name}/{pname}: temperature range is invalid.")

            ptype = planet_type.lower()
            if ("gas giant" in ptype or "ice giant" in ptype) and distance < frost * 0.95:
                issues.append(f"{name}/{pname}: giant planet appears inside frost line.")

            rot_days = planet.get("rot_days")
            rotation_days: float | None = None
            if rot_days is not None:
                try:
                    rotation_days = float(rot_days)
                except Exception:
                    issues.append(f"{name}/{pname}: invalid rot_days value.")
            if rotation_days is not None and distance < hz_inner * 0.80 and cls.startswith(("M", "K")):
                lock_error = abs(rotation_days - period) / max(period, 1e-6)
                if lock_error > 0.30:
                    issues.append(f"{name}/{pname}: close-in planet should be near tidal synchronization.")

            profile_key = infer_profile_key(planet_type)
            if profile_key and isinstance(atm, dict) and len(atm) > 0:
                teq = equilibrium_temperature_k(luminosity_solar=lum, semi_major_au=distance, albedo=albedo)
                tidally_locked = False
                if rotation_days is not None:
                    tidally_locked = abs(rotation_days - period) / max(period, 1e-6) <= 0.25
                elif distance < hz_inner * 0.80 and cls.startswith(("M", "K")):
                    tidally_locked = True

                if profile_key not in {"gas_giant", "ice_giant"}:
                    modeled_pressure = estimate_surface_pressure_bar(
                        profile_key=profile_key,
                        gravity_g=gravity,
                        mass_value=mass_value,
                        radius_value=radius_value,
                        atmosphere=atm,
                        teq_k=teq,
                    )
                    min_p, max_p = PLANET_PROFILES[profile_key].pressure_range
                    modeled_pressure = max(min_p, min(max_p, modeled_pressure))
                    pressure_error = abs(modeled_pressure - pressure) / max(modeled_pressure, 0.05)
                    if pressure_error > 0.75:
                        issues.append(f"{name}/{pname}: surface pressure inconsistent with gravity/volatile/thermal model.")

                modeled_mean = mean_surface_temperature_k(
                    profile_key=profile_key,
                    teq_k=teq,
                    pressure_bar=pressure,
                    atmosphere=atm,
                    gravity_g=gravity,
                    tidally_locked=tidally_locked,
                )
                modeled_low, modeled_high = profile_temp_range(
                    profile_key=profile_key,
                    mean_temp_k=modeled_mean,
                    pressure_bar=pressure,
                    tidally_locked=tidally_locked,
                    axial_tilt_deg=tilt,
                    atmosphere=atm,
                )
                observed_mean = (t_low + t_high) / 2.0
                mean_error = abs(observed_mean - modeled_mean)
                if mean_error > max(65.0, 0.45 * modeled_mean):
                    issues.append(f"{name}/{pname}: temperature range inconsistent with irradiation/greenhouse model.")

                modeled_span = max(1.0, modeled_high - modeled_low)
                observed_span = max(1.0, t_high - t_low)
                if observed_span > modeled_span * 2.4 or observed_span < modeled_span * 0.30:
                    issues.append(f"{name}/{pname}: temperature span inconsistent with circulation model.")

    if systems:
        if m_count / len(systems) <= 0.5:
            issues.append("Generated stellar population violates rule: majority of stars should be M-type.")

    return issues


def export_galaxy_json(data: dict[str, Any], output_path: str | Path) -> Path:
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2), encoding="utf-8")
    return path
