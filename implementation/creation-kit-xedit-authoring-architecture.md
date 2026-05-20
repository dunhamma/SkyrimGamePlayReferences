# Creation Kit And xEdit Authoring Architecture

Status: tooling-practice reference

This note helps Skyrim SE/AE mod authors decide what belongs in the Creation
Kit, what belongs in xEdit, what should be verified from local plugin data, and
what must still be tested in game. It is an authoring and integration reference,
not a replacement for CK Wiki pages, xEdit documentation, local masters, or
runtime tests.

Sources used: `steam_ck_sse`, `bethesda_ck_steam`, `ck_wiki_main`,
`ck_data_file`, `ck_asset_watcher`, `xedit_docs`, `xedit_releases`,
`loot_docs`, `loot_mod_authors`, `wrye_bash_advanced`,
`local_ck_xedit_versions`, `ckpe_github`, `ckpe_wiki`, `mo2_ck_setup`,
`beyond_skyrim_ckpe`, `beyond_skyrim_xedit_cleaning`,
`moddinglinked_xedit_basics`, `uesp_skyrim_form_id`,
`local_vanilla_extraction`, `ck_quest_data`, `ck_magic_effect`,
`ck_creationkit_persistence`, and `ck_save_files_notes`.

## Executive Rules

1. Use the Creation Kit for authored game systems.
   Quests, dialogue, scenes, aliases, packages, placed references, navmesh,
   facegen, conditions, magic effects, and most record creation should start in
   the CK because the editor understands relationships that raw record editing
   can hide.

2. Use xEdit for inspection, conflict reasoning, cleaning, and precise patches.
   xEdit is the safer review surface for load-order winners, overrides, dirty
   edits, masters, FormIDs, VMAD inspection, and compatibility patches.

3. Treat local data as the implementation truth.
   UESP, CK Wiki, and tool docs are discovery and behavior references. Exact
   EditorIDs, FormIDs, overrides, masters, and patched values should be verified
   from the author's current masters/plugins through xEdit, CK, Mutagen, or a
   focused extraction.

4. Prefer small compatibility patches over editing someone else's plugin.
   Forward only the records and fields needed to preserve intended behavior.
   Keep the patch load-order purpose clear.

5. Keep plugin boundaries boring.
   Add only necessary masters, avoid accidental dependencies, keep generated
   forms owned by the plugin that creates them, and document plugin type and
   version assumptions.

6. Do not trust CK saves blindly.
   Inspect every CK-authored plugin in xEdit for dirty overrides, accidental
   masters, unexpected VMAD changes, NAVI/navmesh side effects, and broad edits
   to shared vanilla records.

7. Use FormIDs as implementation details.
   Use EditorIDs and source plugins in human-facing docs. Runtime load-order
   prefixes are not stable across modlists, and ESL/plugin header behavior is
   version-sensitive.

8. Make metadata useful to modlists.
   Include a parseable version in plugin descriptions when practical, add Bash
   tags only for changes that need preservation, and provide LOOT guidance when
   load-order intent cannot be inferred safely.

9. Separate verified behavior from workflow advice.
   CK Wiki, shipped source, local data, and runtime tests can support behavior
   claims. Arcane University, ModdingLinked, Nexus, Reddit, and team wikis can
   support workflow cautions when clearly labeled.

10. Test in game before release.
    A clean xEdit view is not a runtime proof. Test saves, quest startup,
    dialogue, aliases, script migration, persistence, asset packaging, and
    representative modlist conflicts.

## Tool Boundaries

Creation Kit is the authoring tool when the work changes player-facing game
systems or editor-managed relationships: quests, dialogue, scenes, aliases,
packages, placed references, navmesh, cells, worldspaces, magic effects, spells,
perks, actor data, conditions, and properties that need editor wiring. Current
Steam CK should be treated as versioned software; local inspection in this
workspace found `CreationKit.exe` version `1.6.1378.1`.

xEdit is the review and patch tool when the work is about record truth:
inspecting overrides, seeing conflict winners, creating lightweight forwarding
patches, checking masters, cleaning identical-to-master records, auditing VMAD,
checking file headers, and understanding load-order impact. Local inspection in
this workspace found SSEEdit version `4.1.5.0`. xEdit release notes matter
because Skyrim SE plugin header and extended FormID handling changed in the 4.1
series.

Local extraction sits between those tools. Use it to build broad candidate
indexes, reverse keyword maps, and record inventories. It should not decide
design meaning by itself. Candidate rows still need CK/xEdit inspection before
implementation.

Runtime testing is mandatory whenever the work touches quest start behavior,
aliases, persistence, Papyrus state, leveled distribution, navmesh, dialogue,
assets, or compatibility patches. Tools can show intended record shape; Skyrim
decides behavior.

## Plugin Architecture Rules

Choose plugin type deliberately. Use ESP/ESL/ESM flags according to the release
target and record count, then verify the header and masters in xEdit. Do not
change plugin type late without retesting references, FormIDs, ONAM behavior,
and downstream patches.

Keep masters minimal. A plugin should depend only on the masters it actually
uses. If an unwanted master appears, first prove no records, assets, scripts,
conditions, or references still depend on it, then clean the master list with a
tool-supported workflow.

Respect record ownership. New records should live in the plugin that owns them.
Overrides should be intentional, field-limited, and easy to explain. Broad
overrides to shared vanilla records are compatibility risks unless the mod is
explicitly an overhaul or a patch.

Forward conflicts by intent, not by color. xEdit conflict colors are an
inspection aid, not a judgment. The correct patch forwards the fields that
preserve each mod's intended behavior and leaves unrelated changes alone.

Clean with authorship context. QuickAutoClean and manual cleaning are useful for
release plugins, but only the author can decide whether an edit is intentional.
Team merge workflows, navmesh/NAVI records, generated data, and intentional
overrides require extra caution.

Treat VMAD and Papyrus state as persistent architecture. Removing properties,
changing script names, moving aliases, or altering quest startup can leave save
state behind. Review VMAD in xEdit, clear stale properties deliberately, and
test migration on old saves when releasing updates.

## Modlist-Friendliness

A mod is easier to add to vanilla Skyrim or a modlist when its integration
surface is explicit:

- plugin description includes a parseable version when practical
- masters are minimal and expected
- Bash tags are present only when the Bashed Patch should preserve the change
- load-order requirements are specific rather than "load last"
- compatibility patches are separate and named for both sides
- user-facing changes are documented by record family and feature
- scripts avoid polling, stale properties, and hidden save-state traps
- release notes say which xEdit/CK version was used for cleaning or review

## Automation Use

Use `implementation/ck-xedit-source-map.csv` to decide which sources can support
tooling claims. Use `implementation/tool-choice-matrix.csv` to route work to CK,
xEdit, local extraction, or runtime testing. Use
`implementation/mod-authoring-review-checklist.csv` as a release checklist for
human review and automated lint-style prompts.

Automation must preserve authority labels. A row marked `workflow-synthesis`
can suggest a review habit, but it must not become an unqualified claim about
engine behavior.
