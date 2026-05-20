# 2026-05-20 CK Playbooks And Validation

This update extends the CK quest-authoring deepening pass with reusable
authoring playbooks and a lightweight repository validator.

## What Changed

- Added `implementation/ck-authoring-playbooks.md`.
- Added `implementation/ck-authoring-playbook-index.csv`.
- Added `tools/validate-reference-repo.mjs`.
- Updated README, implementation index, table conventions, and update notes so
  the playbooks and validator are discoverable.

## Why It Matters

The CK quest authoring reference explains concepts and failure modes. The new
playbooks provide repeatable packets for service quests, Story Manager
receivers, alias event surfaces, dialogue quests, fragments, VMAD review, and
CK output audits.

The validator turns the repo's table-first discipline into a repeatable command
that checks CSV shape, `source_id` references, trailing whitespace, and
project-specific leakage.

## Validation Performed

- `node .\tools\validate-reference-repo.mjs`
- `git diff --check`
