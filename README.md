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

## Vercel + Flask deployment

The project is configured for Vercel's Python runtime with Flask:

- Flask entrypoint: `app.py`
- Health endpoint: `/api/health`
- Static assets served directly from `web/` by Flask routes
- Live URL: `https://galaxy-eziw.vercel.app/index.html`

Deploy:

```bash
pip install -r requirements.txt
vercel
vercel --prod
```

For local Vercel preview:

```bash
vercel dev
```

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
- `app.py` - Flask entrypoint for Vercel
