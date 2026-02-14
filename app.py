from __future__ import annotations

from pathlib import Path

from flask import Flask, Response, abort, jsonify, send_from_directory

app = Flask(__name__)
WEB_DIR = Path(__file__).resolve().parent / "web"


def _serve_web_asset(asset: str) -> Response:
    if not asset:
        abort(404)
    return send_from_directory(WEB_DIR, asset)


@app.get("/")
def root() -> Response:
    return send_from_directory(WEB_DIR, "index.html")


@app.get("/web")
@app.get("/web/")
def legacy_web_root() -> Response:
    return send_from_directory(WEB_DIR, "index.html")


@app.get("/web/<path:asset>")
def legacy_web_asset(asset: str) -> Response:
    return _serve_web_asset(asset)


@app.get("/<path:asset>")
def root_web_asset(asset: str) -> Response:
    if asset.startswith("api/"):
        abort(404)
    return _serve_web_asset(asset)


@app.get("/api/health")
def health() -> Response:
    return jsonify({"ok": True, "service": "galaxy"})
