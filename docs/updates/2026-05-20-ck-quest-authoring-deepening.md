# 2026-05-20 CK Quest Authoring Deepening

This update adds a CK-first quest and event authoring layer. It turns the broad
CK/xEdit workflow pass into more actionable guidance for service quests, Story
Manager receivers, aliases, dialogue, scenes, fragments, generated output, and
runtime proof.

## What Changed

- Added `implementation/creation-kit-quest-authoring.md`.
- Added `implementation/ck-quest-authoring-matrix.csv`.
- Added `implementation/ck-failure-mode-checklist.csv`.
- Added `implementation/ck-setup-and-output-map.csv`.
- Added CK Wiki source entries for quest overview, aliases, stages, fragments,
  scripts, dialogue, scenes, topics, and quest scripts.
- Updated source authority, table conventions, implementation index, and README
  discovery paths for the deeper CK layer.

## Why It Matters

The previous tooling layer answered "which tool should I use?" This pass
answers "how should a CK-authored quest surface be shaped and verified?" It is
meant to help mod authors diagnose common CK issues without treating xEdit or
Papyrus as replacements for CK's quest/dialogue authoring model.

## Validation Performed

- New CSV files imported with PowerShell `Import-Csv`.
- New `source_id` values resolved in `sources.yaml`.
- Tracked diffs passed `git diff --check`.
- New files passed a trailing-whitespace scan.
- Project-specific leakage scan passed for the new CK-deepening files.
