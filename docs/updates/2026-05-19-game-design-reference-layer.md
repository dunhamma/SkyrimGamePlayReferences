# 2026-05-19 Game Design Reference Layer

This update adds a qualitative game-design layer to the reference repo.

## What Changed

- Added `game-design/README.md` to define the folder's authority and retrieval rules.
- Added `game-design/design-principles.md` with reusable design principles translated for Skyrim modding.
- Added `game-design/skyrim-open-world-rpg-audit.md` to audit those principles against Skyrim's specific open-world RPG shape.
- Added `game-design/skyrim-legacy-context.md` to account for Skyrim as a 2011 game with old UI expectations, long saves, rereleases, and a large modding ecosystem.
- Added `game-design/skyrim-modding-application.md` for moving from hook discovery to playable mechanics.
- Added `game-design/design-review-checklist.csv` for quick review of proposed hooks, rewards, progression systems, and UX surfaces.
- Updated `README.md`, `docs/source-authority.md`, and `sources.yaml` so design-theory material is clearly marked as qualitative and excluded from verified-mechanics retrieval by default.

## Why It Matters

The extraction tables answer "what can we detect?" The game-design layer asks
"should this become a mechanic?" That distinction matters for Skyrim mods because
many detectable events are too broad, too frequent, too noisy, or too weak as
evidence of player intent.

## Validation Performed

- The new checklist CSV imports cleanly with PowerShell `Import-Csv`.
- The repository passed `git diff --check`.
- The source registry now includes the added design references.
