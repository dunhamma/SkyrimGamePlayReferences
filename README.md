# Skyrim Gameplay Reference

A reusable, source-attributed reference repository for Skyrim Special Edition gameplay mechanics, Creation Kit data surfaces, and modding UX lessons.

This repo exists so Skyrim mod authors do not have to rediscover the same vanilla mechanics every time they design a gameplay system. It is intentionally table-first: compact CSV indexes point to authoritative sources, while prose files capture interpretation, risks, and design cautions.

## What This Is

- A source-backed map of vanilla Skyrim gameplay systems that frequently matter to mods.
- A CK-facing reference for condition functions, Story Manager events, record types, keywords, actor values, magic effects, factions, crime, races, blessings, diseases, and world/location categories.
- A reusable UX/design reference for immersive mods: what tends to feel good, what tends to feel tedious, and what players commonly distrust.
- A starter kit for building a project-specific crosswalk from vanilla mechanics to your own mod's signals.

## What This Is Not

- It is not a replacement for UESP, the CK Wiki, xEdit, or local plugin inspection.
- It is not a full dump of `Skyrim.esm`.
- It is not specific to any one mod's lore, scoring, factions, or architecture.
- It is not legal or compatibility advice; verify behavior in your own load order.

## Authority Levels For Readers And AI Agents

This repository separates verified gameplay/reference material from qualitative design evidence.

- Files under `data/` and `docs/` are source-backed reference indexes. They still require local plugin verification before implementation.
- Files under `modding-ux/` are qualitative synthesis only. They summarize player/mod-author sentiment and design risks. Do not treat them as verified gameplay mechanics, factual engine behavior, or statistical evidence.
- When building prompts or retrieval pipelines, include `modding-ux/` only for design inspiration, UX risk review, or hypothesis generation. Exclude it from verified-mechanics retrieval unless the user explicitly asks for qualitative player-experience material.

See `docs/source-authority.md` for the full classification model.
## Repository Map

| Path | Purpose |
|---|---|
| `sources.yaml` | Source registry used by the tables and notes. |
| `docs/` | Table conventions, source authority rules, CK record type map, and FormID conventions. |
| `data/core/` | Actor values, condition functions, keywords, and record signatures. |
| `data/story/` | Quest taxonomy, radiant quest cautions, and Story Manager event candidates. |
| `data/social-crime/` | Faction and crime mechanics useful for civic, stealth, justice, and reputation systems. |
| `data/races-actors/` | Playable race baseline, race variants, and actor-type keyword notes. |
| `data/religion-magic/` | Shrine blessings, diseases, divine shrine patterns, magic effect archetypes, and vanilla religion records. |
| `data/world/` | Worldspace, location type, dungeon, and encounter-zone references. |
| `modding-ux/` | Qualitative-only immersive UX lessons and implementation risk notes. |
| `templates/` | Starter templates for project-specific signal/crosswalk work. |

## How To Use This In A Mod Project

1. Start with `docs/table-conventions.md` and `sources.yaml`.
2. Pull the neutral vanilla table you need, such as `data/story/story-manager-events.csv`.
3. Create a project-specific crosswalk using `templates/signal-hook-index-template.csv`.
4. Verify exact records from your local masters/plugins before implementation.
5. Keep your mod's scoring, lore, and player-facing design in your own repo.

## Validation Model

Use the strongest available source for the question:

| Source class | Use for |
|---|---|
| Local game/plugin data | Exact FormID, EditorID, record ownership, and patched load-order truth. |
| CK Wiki / UESP CK Wiki | CK record behavior, condition functions, Papyrus contracts, and Story Manager authoring. |
| UESP gameplay pages | Player-facing vanilla mechanics, quest/faction summaries, shrine/disease tables, and formulas. |
| Mod pages/community discussions | Qualitative UX and compatibility signals only; not verified gameplay truth or statistical proof. |

## Design Posture

The strongest repeated lesson across gameplay and UX research is simple: immersive systems work best when they are quiet, legible, recoverable, and grounded in vanilla play. Prefer meaningful events and authored choices over raw repetitive counters. Avoid notification spam, hidden punishment, chore loops, broad GMST edits, and assumptions that have not been verified in-game.

## Attribution

This repository contains original summaries and table structures that cite sources such as UESP, the CK Wiki, Nexus mod pages, and community discussions. It does not copy full wiki pages or mod documentation. When expanding tables, cite source IDs from `sources.yaml` and prefer local data extraction for exact records.

## License

Unless otherwise noted, the original tables and notes in this repository are dedicated to the public domain under CC0 1.0 Universal. Source projects and referenced websites retain their own rights.
