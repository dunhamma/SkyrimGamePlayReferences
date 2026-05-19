# 2026-05-19 Expanded Gameplay Extraction Wave

This update adds the next broad extraction layer for general Skyrim modding research.

## What Changed

- Added full or scan-level inventories for FormLists, perks, leveled lists, encounter zones, worldspaces, shouts, words of power, and enchantments.
- Added detailed candidate tables for FormLists, perks, leveled lists, cells, containers, and furniture where a full raw dump would be too noisy or slow.
- Added `vanilla-faction-relationships.csv` so authors can inspect ranks, crime data, and faction reactions from one table.
- Added `vanilla-condition-bearing-effects-index.csv` for magic effects, spells, perks, and enchantments that carry direct or effect-level conditions.
- Added `vanilla-reverse-keyword-index.csv` so authors can start from a keyword and see example vanilla records that use it.
- Expanded the extractor to summarize large record classes without dumping placed references, navmeshes, land geometry, or dialogue response text.

## Why It Matters

This makes the repo much stronger as a discovery tool. Mod authors can now move in both directions: from a gameplay idea to likely CK record surfaces, or from a vanilla record pattern back to possible gameplay hooks.

The most compatibility-sensitive areas are deliberately marked as scan-only or candidate data. Leveled lists, cells, containers, and FormLists should still be verified in xEdit or the CK against the author's actual load order before implementation.

## Validation Performed

- The extractor completed against the local vanilla/DLC master set.
- Generated CSV row counts were reviewed during extraction.
- All CSV files were imported with PowerShell `Import-Csv`.
- The extractor passed Node syntax validation.
- The repository passed `git diff --check`.
- Project-specific terms were checked so the data remains generally useful for Skyrim modding.
