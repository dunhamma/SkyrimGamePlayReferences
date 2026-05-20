# Creation Kit Quest Authoring

Status: implementation reference

This note focuses on Creation Kit quest and event authoring for Skyrim SE/AE
mods. Use it when designing service quests, Story Manager receivers, dialogue,
aliases, fragments, script properties, SEQ output, and runtime smoke tests. It
is more CK-centered than `creation-kit-xedit-authoring-architecture.md`; xEdit
appears here mainly as the review surface for CK-authored plugin records.

Sources used: `ck_quests_overview`, `ck_quest_data`, `ck_quest_alias_tab`,
`ck_quest_stages_tab`, `ck_quest_stage_fragments`, `ck_scripts_tab`,
`ck_story_manager`, `ck_sm_event_node`, `ck_quest_script`,
`ck_dialogue_category`, `ck_dialogue_views_tab`, `ck_player_dialogue`,
`ck_player_dialogue_tab`, `ck_topic`, `ck_topic_info`, `ck_scenes_tab`,
`ck_bethesda_dialogue_tutorial`, `xedit_docs`, `local_ck_xedit_versions`,
`ckpe_wiki`, `mo2_ck_setup`, `ck_asset_watcher`, `local_psc_sources`, and
`ck_save_files_notes`.

## Executive Rules

1. Start with the quest's lifecycle.
   Decide whether a quest is a Start Game Enabled service, a manually started
   quest, a dialogue container, or a Story Manager receiver before adding
   scripts or aliases.

2. Keep Story Manager receivers thin.
   Let the receiver quest capture the event payload, validate the event, and
   hand off to a stable service quest. Avoid burying core system behavior in
   event fragments.

3. Compile before CK wiring.
   CK can only attach and fill properties for scripts it can see. If a new
   script is missing in the CK script picker, confirm compiled `.pex` output,
   source roots, and active mod-manager profile before redesigning the script.

4. Use aliases for runtime references.
   Aliases are filled when the quest starts, can carry scripts/packages/dialogue
   context, and can fail quest startup if required aliases cannot fill. Review
   fill order and optional flags deliberately.

5. Treat fragments as glue.
   Quest-stage, dialogue, and scene fragments should call stable scripts or send
   small event signals. Large logic in generated fragment scripts is hard to
   migrate, test, and clean.

6. Review VMAD after CK saves.
   xEdit should be used to inspect script attachments, duplicate same-name
   scripts, missing properties, stale properties, and unexpected script data on
   quest, alias, magic-effect, topic-info, and scene records.

7. Generate SEQ when quest/dialogue shape requires it.
   Start Game Enabled quests and dialogue/scenes can require SEQ output. Treat
   missing or stale SEQ as a runtime failure mode, not as a harmless packaging
   detail.

8. Keep CK output owned.
   New scripts, fragments, dialogue view XML, generated SEQ, facegen, and asset
   watcher output must land in the intended mod output location, not in a shared
   overwrite folder or stale CK output mod.

9. Runtime-test every authoring surface.
   CK and xEdit can prove record shape. They cannot prove that aliases filled,
   dialogue appeared, Story Manager fired, save migration survived, or a script
   event arrived in the expected order.

## Quest Shapes

Use a Start Game Enabled quest for persistent services, bootstrap state, MCM
surfaces, broad dialogue containers, and manager quests that should exist for a
whole playthrough. Keep their event handlers bounded and their properties
explicit. If the quest exposes dialogue or scenes, keep SEQ generation in the
release checklist.

Use a manually started quest for a directed questline, a temporary scene owner,
or a service that should not run until another record starts it. Start it from
CK conditions, dialogue, stage logic, scripts, or other owned systems only when
the startup path is testable.

Use a Story Manager receiver when Skyrim already emits the gameplay event you
need. The receiver quest should usually be non-Start Game Enabled and linked to
the relevant Story Manager node. Check `Shares Event` when multiple mods should
be allowed to observe the same event. Validate event payloads in script before
scoring or state changes.

Use a dialogue-only quest when the main reason for the quest is conversation.
The CK dialogue category notes that dialogue belongs to quests and the quest
must be running for its dialogue to be used. Condition branches and infos
tightly; avoid hidden catch-all dialogue that can appear in the wrong context.

## Aliases And Properties

Aliases are part of the quest contract, not just convenience names. Review:

- fill type and whether it depends on Story Manager event data
- alias order, because later aliases can depend on earlier aliases
- optional versus required behavior
- scripts attached to aliases
- packages, factions, and dialogue attached through aliases
- save/update behavior when an alias script or property changes

Script properties should be wired in CK for owned/static forms whenever
possible. Use Auto-Fill when EditorIDs match, then inspect manually. After
changing property names, script names, or fragment targets, inspect VMAD in
xEdit and test old saves where users may already have saved instances.

## Dialogue, Scenes, And Fragments

Dialogue is authored under quests through dialogue views, player dialogue tabs,
branches, topics, and infos. Use dialogue views for authoring and review the
list views when priority, condition order, or info stack behavior matters.
Topic and Topic Info ordering can affect which line is selected; treat
conditions as part of the contract.

Scenes belong to quests and can use quest aliases as actors. Scene phases can
have start and completion fragments; keep those fragments tiny and route them
to stable scripts or event signals.

Quest-stage fragments run when quest stages start. They are useful for one-shot
quest milestones, but they are generated script surfaces. Keep them short,
avoid custom type casts where a small event signal will do, and re-open/review
the quest when CK requires a close/reopen cycle before fragment properties can
be edited.

## Setup And Output Hygiene

Run CK from the same mod-manager profile used for testing. Confirm the active
plugin, source folders, compiled output folder, and script dependencies before
authoring. CKPE can fix or improve many current CK workflows, but CKPE-specific
behavior should be labeled as CKPE behavior and version-checked against the
installed CK.

Common output surfaces to inspect:

- compiled `.pex` files for attached scripts
- generated fragment source and compiled fragment scripts
- `Seq/*.seq` output for Start Game Enabled quest/dialogue visibility
- `DialogueViews/*.xml` when distributing editable dialogue views
- asset watcher output for art/export workflows
- facegen and generated mesh/texture output when NPCs are edited
- temporary CK output or overwrite folders that may shadow the real mod

## Runtime Smoke Checklist

Minimum smoke tests for quest/event work:

1. Start from a clean game path or disposable save.
2. Confirm the plugin, masters, scripts, and generated output are active.
3. Confirm the quest lifecycle: running/stopped, Start Game Enabled state, Story
   Manager startup, or manual startup.
4. Confirm aliases fill, optional aliases fail safely, and required aliases do
   not block startup unexpectedly.
5. Trigger the event or dialogue path in normal play.
6. Check Papyrus logs for missing scripts, stale properties, `None` access, and
   unexpected duplicate events.
7. Save, reload, and repeat the state check when the feature persists.
8. Inspect the plugin in xEdit after CK saves and before release.

## Automation Use

Use `implementation/ck-quest-authoring-matrix.csv` to route CK quest tasks to
authoring, xEdit review, and runtime proof surfaces. Use
`implementation/ck-failure-mode-checklist.csv` to diagnose likely CK and
runtime issues. Use `implementation/ck-setup-and-output-map.csv` to check where
generated artifacts should live and which tool owns them.
