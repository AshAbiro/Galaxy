"""CLI for galaxy data generation and validation."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Sequence

from galaxy.data_pipeline import export_galaxy_json, generate_galaxy, validate_galaxy


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="galaxy-data",
        description="Generate and validate astrophysics-grounded galaxy JSON.",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    generate_parser = subparsers.add_parser(
        "generate",
        help="Generate a galaxy dataset and export it as JSON.",
    )
    generate_parser.add_argument(
        "-o",
        "--output",
        default="web/galaxy-data.json",
        help="Output JSON path.",
    )
    generate_parser.add_argument(
        "--seed",
        type=int,
        default=42,
        help="Random seed for reproducible output.",
    )
    generate_parser.add_argument(
        "--sectors",
        type=int,
        default=6,
        help="Sector count.",
    )
    generate_parser.add_argument(
        "--systems",
        type=int,
        default=3,
        help="System count.",
    )
    generate_parser.add_argument(
        "--planets-per-system",
        type=int,
        default=6,
        help="Planet count per system.",
    )
    generate_parser.add_argument(
        "--strict",
        action="store_true",
        help="Return non-zero exit code when validation finds issues.",
    )

    validate_parser = subparsers.add_parser(
        "validate",
        help="Validate an existing galaxy JSON file.",
    )
    validate_parser.add_argument(
        "input",
        type=Path,
        help="Path to JSON file.",
    )
    return parser


def handle_generate(args: argparse.Namespace) -> int:
    data = generate_galaxy(
        seed=args.seed,
        sector_count=args.sectors,
        system_count=args.systems,
        planets_per_system=args.planets_per_system,
    )
    issues = validate_galaxy(data)
    output = export_galaxy_json(data, args.output)

    print(f"Generated: {output}")
    print(f"Systems: {len(data['systems'])}, sectors: {len(data['sectors'])}")
    print(f"Validation issues: {len(issues)}")
    if issues:
        for issue in issues:
            print(f"- {issue}")
        if args.strict:
            return 1
    return 0


def handle_validate(args: argparse.Namespace) -> int:
    try:
        payload = json.loads(args.input.read_text(encoding="utf-8"))
    except FileNotFoundError:
        print(f"Input file not found: {args.input}")
        return 2
    except json.JSONDecodeError as exc:
        print(f"Invalid JSON ({args.input}): {exc}")
        return 2

    issues = validate_galaxy(payload)
    print(f"Validation issues: {len(issues)}")
    for issue in issues:
        print(f"- {issue}")
    return 1 if issues else 0


def main(argv: Sequence[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.command == "generate":
        return handle_generate(args)
    return handle_validate(args)


if __name__ == "__main__":
    raise SystemExit(main())

