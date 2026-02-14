from __future__ import annotations

import importlib.util
from pathlib import Path


def load_root_app():
    app_path = Path(__file__).resolve().parents[1] / "app.py"
    spec = importlib.util.spec_from_file_location("vercel_app", app_path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load Flask entrypoint at {app_path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.app


app = load_root_app()


def test_root_redirects_to_index() -> None:
    client = app.test_client()
    response = client.get("/")
    assert response.status_code == 307
    assert response.headers["Location"] == "/index.html"


def test_legacy_web_path_redirects_to_root_assets() -> None:
    client = app.test_client()
    response = client.get("/web/app.js")
    assert response.status_code == 307
    assert response.headers["Location"] == "/app.js"


def test_health_endpoint() -> None:
    client = app.test_client()
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.get_json() == {"ok": True, "service": "galaxy"}
