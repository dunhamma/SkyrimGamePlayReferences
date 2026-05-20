# Creation Kit Authoring Playbooks

Status: implementation reference

These playbooks translate CK and xEdit reference material into repeatable
authoring packets. They are intentionally generic: use them to shape your own
mod's quests, signals, dialogue, fragments, and review workflow, then verify
the exact records in your current load order.

Sources used: `ck_quest_data`, `ck_quest_alias_tab`,
`ck_quest_stage_fragments`, `ck_scripts_tab`, `ck_sm_event_node`,
`ck_dialogue_category`, `ck_dialogue_views_tab`, `ck_player_dialogue_tab`,
`ck_topic`, `ck_topic_info`, `ck_scenes_tab`, `xedit_docs`,
`ck_save_files_notes`, `mo2_ck_setup`, and `local_psc_sources`.

## Playbook 1: Service Quest

Use this when the mod needs a stable runtime owner for state, routing, MCM,
debug commands, or shared helper functions.

Authoring packet:

1. Create one Start Game Enabled quest for the service.
2. Keep quest priority modest unless dialogue or package competition requires a
   stronger reason.
3. Attach one service script on the Scripts tab.
4. Fill owned/static forms as CK properties.
5. Keep hot event handlers bounded; route long or repeated work through
   controlled timers or explicit function calls.
6. Generate SEQ if the service quest owns dialogue or Start Game Enabled
   behavior that needs it.
7. Review the QUST VMAD in xEdit for script attachment, properties, and
   duplicate script rows.
8. Runtime-test new game, save/load, and old-save migration if this service
   replaces or changes persistent script state.

Avoid:

- hiding feature logic in startup fragments
- using a service quest as a dumping ground for unrelated state
- treating `OnInit()` as an update/migration hook for existing saves

## Playbook 2: Story Manager Receiver

Use this when Skyrim already emits the event the mod needs: kill, location,
crime, skill, book, infection, craft, or another Story Manager surface.

Authoring packet:

1. Create a non-Start Game Enabled receiver quest.
2. Set the Quest Data event to match the intended Story Manager event.
3. Attach a small receiver script that implements the matching event callback.
4. Wire only the routing/service properties the receiver needs.
5. Add the quest under the intended Story Manager event node.
6. Use `Shares Event` when other vanilla/mod receivers should still observe the
   event.
7. Keep CK conditions minimal for the first proof; validate payload and
   attribution in script.
8. Runtime-test at least one valid event, one rejected event, and rapid repeated
   events.
9. Confirm the receiver does not remain stuck running unless that is intended.

Avoid:

- scoring directly inside the receiver when a stable service can own scoring
- broad CK conditions that make the first failure impossible to diagnose
- assuming the event payload is present, typed, hostile, or player-caused
  without script-side guards

## Playbook 3: Alias Event Surface

Use this when the event belongs naturally to the player, an NPC, a reference,
or a quest-selected object rather than to a global service quest.

Authoring packet:

1. Decide whether the alias should fill from a unique actor/reference, event
   data, forced reference, location, or condition.
2. Mark aliases optional only when the script can safely handle absence.
3. Attach an alias script only after the script compiles.
4. Fill service/router properties on the alias script.
5. Register external or SKSE/plugin events only when the alias is valid, and
   unregister when the alias clears, quest stops, or feature shuts down.
6. Review alias VMAD in xEdit.
7. Runtime-test alias fill, event arrival, save/load, and duplicate event
   suppression where relevant.

Avoid:

- treating alias fill as guaranteed just because the CK UI accepts it
- keeping long-lived Actor/ObjectReference properties when an alias can own the
  runtime reference
- adding fallback routes without duplicate suppression

## Playbook 4: Dialogue Quest

Use this when the feature needs player-facing branches, topics, infos, force
greets, or scenes tied to quest state.

Authoring packet:

1. Put dialogue under a quest that is running when the dialogue should appear.
2. Use Quest Conditions for broad gates and topic/info conditions for local
   gates.
3. Keep branch and topic names readable and stable.
4. Use Dialogue Views for authoring; review list tabs when order and condition
   precedence matter.
5. Keep Topic Info fragments tiny and route through stable scripts or event
   signals.
6. Generate SEQ after adding or changing Start Game Enabled dialogue.
7. Package DialogueViews XML if collaborators need editable graph layout.
8. Runtime-test the intended speaker, wrong speaker, intended state, wrong
   state, save/load, and first-load visibility.

Avoid:

- relying on dialogue that belongs to a stopped quest
- broad Hello/forcegreet conditions that can hijack unrelated actors
- long fragment logic that becomes hard to migrate

## Playbook 5: Stage Or Fragment Signal

Use this when a vanilla or mod quest milestone is the cleanest one-shot signal.

Authoring packet:

1. Verify the target quest and stage locally in CK or xEdit.
2. Prefer completion or irreversible state stages over intermediate objective
   stages when the signal should be once-only.
3. Keep the fragment body one or two lines.
4. Route through a stable service script, a small event signal, or a property
   filled in the fragment UI.
5. Avoid duplicating gameplay math or long condition logic in the fragment.
6. Reopen the quest if CK requires it before fragment properties can be edited.
7. Runtime-test normal progression and forced stage progression separately.

Avoid:

- fragment casts to custom types when a simple signal will do
- multiple fragments that can fire the same one-shot without idempotent guards
- editing vanilla quest fragments directly without an explicit patch strategy

## Playbook 6: VMAD And Property Review

Use this after CK saves, overlay patches, script renames, property changes, or
manual xEdit work.

Review packet:

1. Inspect each touched QUST, INFO, SCEN, MGEF, ALIAS, or placed reference VMAD.
2. Confirm the script name is expected.
3. Confirm each property has the intended type and target.
4. Look for duplicate same-name script rows.
5. Look for stale properties that no longer exist in source.
6. Compare old-save risk: renamed scripts, removed properties, changed alias
   shape, or moved startup logic.
7. Runtime-test old saves when migration matters.

Avoid:

- deleting properties from source and assuming saved instances forget them
- accepting duplicate script attachments because the game "seems fine"
- shipping a patch that fixes VMAD by overriding unrelated fields

## Playbook 7: CK Output Audit

Use this after any CK/xEdit generation pass.

Audit packet:

1. Check the active plugin timestamp.
2. Check compiled `.pex` output.
3. Check generated fragment source and compiled fragment scripts.
4. Check `Seq/` output for eligible quest/dialogue changes.
5. Check `DialogueViews/` output when dialogue graph editability matters.
6. Check facegen, meshes, textures, and asset watcher output if actor/assets
   changed.
7. Check mod-manager overwrite or generated-output mods.
8. Keep temporary output mods inactive unless deliberately part of the test.

Avoid:

- letting CK output shadow the real mod
- leaving generated artifacts outside the packaged mod
- testing from a profile that sees files the release package does not contain
