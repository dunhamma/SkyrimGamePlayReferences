# 2026-05-20 Gap Review And Tooling Roadmap

This update reviews the repo after the 2026-05-19 extraction, design, and
Papyrus reference waves, then adds a first CK/xEdit authoring architecture layer
for Skyrim SE/AE mod authors and tooling agents.

## Current Baseline

- Local Creation Kit executable inspected: `CreationKit.exe` version
  `1.6.1378.1`.
- Local xEdit executable inspected: `SSEEdit.exe` version `4.1.5.0`.
- The repo already has broad vanilla/DLC extraction tables, source authority
  rules, Papyrus safety guidance, game-design synthesis, and UX cautions.
- CK and xEdit were previously present mostly as verification targets, not as a
  structured authoring workflow reference.

## Gaps Found

- CK/xEdit task boundaries were not machine-readable, so tooling could not
  easily decide whether a task belongs in CK, xEdit, local extraction, or
  runtime testing.
- Current CK practice was underrepresented. The source registry did not yet
  distinguish Steam CK, CKPE, CK Wiki, MO2 setup notes, and local tool versions.
- Modlist integration references were thin. LOOT metadata, Wrye Bash tags,
  plugin descriptions, and patch-friendly release habits needed explicit rows.
- xEdit guidance existed only indirectly. Conflict forwarding, cleaning,
  masters, headers, and author-intent cautions needed a neutral reference layer.
- Community workflow sources needed tier labels so they help with practice
  without becoming unqualified engine-behavior claims.
- The repo still has many `candidate-*`, `needs-local-extraction`, and
  `needs-runtime-test` rows, especially for large extracted surfaces such as
  cells, leveled lists, quests, FormLists, and condition-bearing effects.

## What Changed

- Added `implementation/creation-kit-xedit-authoring-architecture.md`.
- Added `implementation/ck-xedit-source-map.csv`.
- Added `implementation/tool-choice-matrix.csv`.
- Added `implementation/mod-authoring-review-checklist.csv`.
- Added CK/xEdit/LOOT/Wrye Bash/CKPE/MO2/tooling sources to `sources.yaml`.
- Updated the README, source authority rules, and implementation README so the
  new layer is discoverable and not confused with verified vanilla mechanics.

## Roadmap

1. Curate high-risk extracted surfaces.
   Prioritize leveled lists, cells, quests, FormLists, and condition-bearing
   effects where the extraction pack is intentionally broad and candidate-based.

2. Add record-family patching notes.
   Expand from the new tool-choice matrix into focused notes for leveled lists,
   factions, quests, dialogue, cells, navmesh, magic effects, and VMAD.

3. Add automation checks.
   Build scripts that verify `source_id` coverage, CSV importability, authority
   labels, and forbidden retrieval mixing between qualitative and verified
   sources.

4. Add project-agnostic release templates.
   Create templates for mod release metadata, xEdit review notes, LOOT guidance,
   Bash tag rationale, and runtime smoke-test notes.

5. Keep currentness explicit.
   Treat CK, CKPE, xEdit, LOOT, Wrye Bash, and MO2 as versioned tools. Record
   local versions and avoid implying every author has the same setup.

## Validation Performed

- New CSV files imported with PowerShell `Import-Csv`.
- New `source_id` values resolved in `sources.yaml`.
- Tracked diffs passed `git diff --check`.
- New files passed a trailing-whitespace scan.
- New workflow guidance uses authority labels and avoids treating
  community guides as engine-behavior truth.
