from __future__ import annotations

from flask import Flask, Response, jsonify, redirect

app = Flask(__name__)


@app.get("/")
def root() -> Response:
    return redirect("/index.html", code=307)


@app.get("/web")
@app.get("/web/")
def legacy_web_root() -> Response:
    return redirect("/index.html", code=307)


@app.get("/web/<path:asset>")
def legacy_web_asset(asset: str) -> Response:
    return redirect(f"/{asset}", code=307)


@app.get("/api/health")
def health() -> Response:
    return jsonify({"ok": True, "service": "galaxy"})
