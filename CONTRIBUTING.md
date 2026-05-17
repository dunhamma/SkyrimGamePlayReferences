# Contributing

This repo is meant to stay useful across many Skyrim mods, so contributions should be neutral, source-attributed, and easy to audit.

## Contribution Rules

1. Keep generic Skyrim mechanics here; keep mod-specific scoring, lore, and implementation choices in your own mod repo.
2. Add or reuse a `source_id` from `sources.yaml` for source-backed rows.
3. Prefer local master/plugin extraction for exact FormID, EditorID, and record ownership claims.
4. Do not paste large wiki or mod-page excerpts. Summarize and link.
5. Mark uncertain rows as `needs-local-extraction` or `needs-runtime-test`.
6. Keep CSV files parseable and ASCII-friendly unless a source name requires otherwise.
7. Add design cautions when a mechanic is farmable, compatibility-sensitive, or likely to annoy players.

## Good Additions

- A new Story Manager event row with payload cautions and source link.
- A locally extracted keyword table with source plugin and EditorID.
- A short UX note backed by repeated community/mod-page evidence.
- A generic template that helps mod authors build their own crosswalk.

## Avoid

- Mod-specific theology or scoring rules.
- Full copied tables from UESP/CK Wiki.
- Unsourced claims about engine behavior.
- Treating one Reddit comment as universal player preference.
