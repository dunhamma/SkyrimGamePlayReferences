# 2026-05-19 Extracted Gameplay Reference Pack

This update turns the repository from a curated starter scaffold into a broader Skyrim gameplay reference pack for mod authors.

## What Changed

- Added generated vanilla and DLC extraction tables under `data/extracted/` for keywords, magic effects, spells, books, items, factions, crafting recipes, actors, races, quest candidates, locations, and shrine activator candidates.
- Added general modding crosswalks under `data/modding-crosswalk/` to help authors translate vanilla records and systems into reusable gameplay hooks.
- Added `data/rewards/vanilla-effect-palette.csv` and `modding-ux/compatibility-dossiers.md` for reward-shaping and compatibility planning.
- Added `tools/extract-vanilla-gameplay-refs.mjs`, a Mutagen-bridge extractor that can refresh the generated tables from local master data.
- Expanded `sources.yaml`, `docs/table-conventions.md`, `docs/ck-record-types.csv`, and core reference tables to describe the new validation model and source expectations.

## Why It Matters

The goal is not to publish a full raw dump of Skyrim's records. The goal is to give mod authors a practical discovery layer: compact tables that show where useful gameplay hooks probably live, what needs local verification, and which records can seed project-specific systems.

The generated files are deliberately marked as extracted or candidate data. They are suitable for research, planning, search, and crosswalk building, but exact implementation should still verify the target records against the author's current masters, DLC, and modlist.

## Validation Performed

- CSV files were imported with PowerShell `Import-Csv`.
- The extractor passed Node syntax validation.
- The repository passed `git diff --check`.
- Project-specific terms were removed so the data remains generally useful for Skyrim modding, not bound to one mod's architecture.
