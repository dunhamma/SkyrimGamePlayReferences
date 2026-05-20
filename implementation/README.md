# Implementation References

Status: implementation reference

This folder contains practical implementation guidance for Skyrim mod authors.
It is more authoritative than qualitative design notes when it cites CK Wiki,
shipped source, local data, or tool documentation, but exact behavior should
still be tested in the target load order.

## Files

| File | Purpose |
|---|---|
| `creation-kit-xedit-authoring-architecture.md` | CK/xEdit authoring boundaries, plugin architecture, conflict review, cleaning, metadata, and modlist-friendliness. |
| `ck-xedit-source-map.csv` | Source authority map for CK, xEdit, CKPE, LOOT, Wrye Bash, MO2, and workflow synthesis. |
| `tool-choice-matrix.csv` | Machine-readable routing for when to use CK, xEdit, local extraction, and runtime tests. |
| `mod-authoring-review-checklist.csv` | Release and architecture checklist for plugin structure, conflicts, VMAD, metadata, and modlist integration. |
| `papyrus-safety-and-save-health.md` | Papyrus scripting safety, performance, persistence, save-health, and debugging rules. |
| `papyrus-script-review-checklist.csv` | Compact review checklist for Papyrus scripts. |

## Retrieval Rule

Use this folder for Papyrus, scripting safety, CK/xEdit authoring, plugin
architecture, save migration, profiling, debugging, and implementation-risk
questions. Do not use it as a replacement for the CK Wiki, shipped `.psc`
source, xEdit, local plugin inspection, or runtime testing.
