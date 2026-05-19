# 2026-05-19 Papyrus Implementation Reference

This update adds a neutral Papyrus safety and save-health reference layer.

## What Changed

- Added `implementation/README.md`.
- Added `implementation/papyrus-safety-and-save-health.md`.
- Added `implementation/papyrus-script-review-checklist.csv`.
- Updated `README.md`, `docs/source-authority.md`, and `sources.yaml` so Papyrus implementation guidance has a clear authority class.

## Why It Matters

The gameplay extraction and design layers answer what a mod might react to and
whether that reaction is good design. The Papyrus implementation layer asks
whether the script shape is safe for Skyrim's event queue, persistence model,
long saves, and modded load orders.

## Validation Performed

- The new checklist CSV imports cleanly with PowerShell `Import-Csv`.
- The repository passed `git diff --check`.
- Project-specific terms were checked so the data remains generally useful for Skyrim modding.
