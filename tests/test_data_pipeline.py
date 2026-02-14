from __future__ import annotations

from galaxy.data_pipeline import export_galaxy_json, generate_galaxy, validate_galaxy


def test_generate_galaxy_validates_cleanly() -> None:
    data = generate_galaxy(seed=7, sector_count=6, system_count=3, planets_per_system=6)
    issues = validate_galaxy(data)
    assert issues == []


def test_validator_flags_giant_inside_frost_line() -> None:
    data = generate_galaxy(seed=11, sector_count=6, system_count=3, planets_per_system=6)
    system = data["systems"][0]
    planet = system["p"][0]
    planet["t"] = "Gas giant"
    planet["a"] = system["star"]["frost"] * 0.2
    issues = validate_galaxy(data)
    assert any("inside frost line" in issue for issue in issues)


def test_validator_flags_gravity_mismatch() -> None:
    data = generate_galaxy(seed=19, sector_count=6, system_count=3, planets_per_system=6)
    system = data["systems"][0]
    planet = system["p"][0]
    planet["g"] = planet["g"] * 2.0
    issues = validate_galaxy(data)
    assert any("gravity mismatch" in issue for issue in issues)


def test_validator_flags_pressure_model_mismatch() -> None:
    data = generate_galaxy(seed=27, sector_count=6, system_count=3, planets_per_system=6)
    system = data["systems"][0]
    rocky = next(p for p in system["p"] if "giant" not in p["t"].lower())
    rocky["pb"] = rocky["pb"] * 6.0
    issues = validate_galaxy(data)
    assert any("surface pressure inconsistent" in issue for issue in issues)


def test_validator_flags_temperature_model_mismatch() -> None:
    data = generate_galaxy(seed=31, sector_count=6, system_count=3, planets_per_system=6)
    system = data["systems"][0]
    rocky = next(p for p in system["p"] if "giant" not in p["t"].lower())
    rocky["temp"] = [1200, 1600]
    issues = validate_galaxy(data)
    assert any("temperature range inconsistent" in issue for issue in issues)


def test_export_galaxy_json_writes_file(tmp_path) -> None:
    data = generate_galaxy(seed=23, sector_count=6, system_count=3, planets_per_system=6)
    output = export_galaxy_json(data, tmp_path / "galaxy-data.json")
    assert output.exists()
    assert output.read_text(encoding="utf-8").startswith("{")
