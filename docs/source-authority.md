# Source Authority And Retrieval Rules

This repository is designed for both humans and AI-assisted modding workflows. Not every file has the same authority level.

## Authority Classes

| Class | Meaning | Can support verified gameplay claims? | Typical paths |
|---|---|---|---|
| `verified-reference-index` | Source-backed table pointing at UESP, CK Wiki, or local-data validation targets. | Yes, with source citation and local verification when implementing. | `data/`, `docs/` |
| `implementation-reference` | CK/Papyrus/modding behavior reference, usually from CK Wiki, local records, or cited tool docs. | Yes, but runtime behavior should still be tested. | `implementation/`, `docs/`, selected `data/core/` and `data/story/` rows |
| `tooling-practice-reference` | CK/xEdit/LOOT/Wrye Bash/MO2 workflow guidance, including tool-choice, cleaning, conflict review, metadata, and release-review habits. | Only for tooling workflow claims. It cannot prove vanilla gameplay behavior. | `implementation/`, selected `docs/` |
| `qualitative-design-signal` | Synthesis of design sources, mod pages, comments, Reddit threads, and design impressions. | No. Use only for UX hypotheses and design risk review. | `game-design/`, `modding-ux/` |
| `template` | Starter structure for a mod's own crosswalk. | No. It is a planning aid. | `templates/` |

## AI Retrieval Rules

If using this repository in RAG, coding agents, or prompt context:

1. Treat `data/` and `docs/` as reference indexes, not as complete source-of-truth dumps.
2. Treat `game-design/` and `modding-ux/` as qualitative-only. They must not be used to answer questions like "how does Skyrim calculate X?" or "what records exist?"
3. Do not convert community sentiment into factual claims. Say "qualitative player/mod-user signal suggests..." rather than "players hate..." unless the user explicitly asked for qualitative synthesis.
4. For implementation, verify exact records from local masters/plugins, xEdit, Mutagen, or CK before wiring anything.
5. For engine behavior, prefer CK Wiki, shipped source scripts, and runtime tests over design notes.
6. For gameplay formulas/tables, prefer UESP gameplay pages and local game data over UX notes.
7. For tool workflow, prefer official/tool docs and local tool versions. Treat community guides as workflow synthesis unless backed by primary docs or local verification.

## Suggested Retrieval Filters

| User intent | Include | Exclude by default |
|---|---|---|
| Verified gameplay mechanics | `data/`, `docs/`, `sources.yaml` | `game-design/`, `modding-ux/` |
| CK implementation planning | `docs/`, `data/core/`, `data/story/`, relevant `data/*` | `game-design/`, `modding-ux/` unless design/UX risk requested |
| CK/xEdit authoring workflow | `implementation/creation-kit-xedit-authoring-architecture.md`, `implementation/tool-choice-matrix.csv`, `implementation/ck-xedit-source-map.csv`, `implementation/mod-authoring-review-checklist.csv`, `sources.yaml` | `game-design/`, `modding-ux/` unless UX/design risk requested |
| Papyrus scripting safety | `implementation/`, `docs/`, `sources.yaml` | `game-design/`, `modding-ux/` unless design/UX risk requested |
| UX/design brainstorming | `game-design/`, `modding-ux/`, selected relevant `data/*` | none, but label qualitative claims clearly |
| Project-specific scoring | Your mod repo's crosswalk files plus this repo's neutral tables | Any unrelated mod-specific interpretation |

## Required Wording For Qualitative Claims

Use wording like:

- "Qualitative mod-user evidence suggests..."
- "Community/mod-page signals point toward..."
- "This is a design risk, not a verified mechanic."
- "Workflow guidance suggests..." when the support is a community guide or project wiki.

Avoid wording like:

- "Skyrim players always..."
- "This proves..."
- "The engine behaves this way..." when the support is only `game-design/` or `modding-ux/`.
- "xEdit/CK guarantees..." when the support is only a community workflow guide.
