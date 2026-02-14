from __future__ import annotations

import shutil
from pathlib import Path


def copy_tree(source: Path, destination: Path) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    for item in source.iterdir():
        target = destination / item.name
        if item.is_dir():
            shutil.copytree(item, target, dirs_exist_ok=True)
        else:
            shutil.copy2(item, target)


def reset_directory(path: Path) -> None:
    if path.exists():
        for item in path.iterdir():
            if item.is_dir():
                shutil.rmtree(item)
            else:
                item.unlink()
    else:
        path.mkdir(parents=True, exist_ok=True)


def main() -> None:
    project_root = Path(__file__).resolve().parents[1]
    source = project_root / "web"
    destination = project_root / "public"
    if not source.exists():
        raise FileNotFoundError(f"Source directory does not exist: {source}")
    reset_directory(destination)
    copy_tree(source, destination)
    print(f"Synced {source} -> {destination}")


if __name__ == "__main__":
    main()
