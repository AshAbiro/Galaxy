# Galaxy

A starter Python project scaffold named "Galaxy".

## Quick start

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -e .[dev]
galaxy
pytest
```

## Web command console

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/web/` in your browser.

## Data generator + validator

Generate astrophysics-grounded JSON for the web layer:

```bash
galaxy-data generate --output web/galaxy-data.json --seed 42 --strict
```

The website bootstraps from `web/galaxy-data.json` at runtime (with embedded fallback if the file is unavailable).

Validate any exported dataset:

```bash
galaxy-data validate web/galaxy-data.json
```

Model notes:
- Surface pressure is derived from gravity, volatile inventory, thermal escape tendency, and regime-specific retention.
- Surface temperature ranges are derived from equilibrium temperature + greenhouse forcing + circulation transport (including tidal-lock effects).
- Validator checks Kepler, gravity consistency, giant placement beyond frost line, and pressure/temperature model consistency.

## Project layout

- `src/galaxy/` - application package
- `tests/` - automated tests
- `web/` - cyberpunk galaxy exploration website
