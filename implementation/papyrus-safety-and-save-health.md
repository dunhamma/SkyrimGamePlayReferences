# Papyrus Safety And Save Health

Status: implementation reference

This note condenses Papyrus scripting safety, performance, persistence,
debugging, and save-health guidance for Skyrim/SSE mod authors. It is based on
CK Wiki pages, CK-derived public indexes, project documentation, and tooling
docs. Use it as a review aid, not as a replacement for source lookup or runtime
testing.

Sources used: `ck_onupdate_form`, `ck_register_single_update`,
`ck_wait_utility`, `ck_latent_functions`, `ck_threading_notes`,
`ck_papyrus_persistence`, `ck_creationkit_persistence`,
`ck_save_files_notes`, `ck_papyrus_runtime_errors`,
`ck_papyrus_ini_settings`, `ck_dump_papyrus_stacks`,
`ck_start_papyrus_script_profile`, `ck_papyrus_console_commands`,
`beyond_skyrim_scripting_best_practices`,
`bgs_handbook_getformfromfile`, `bgs_handbook_logging`,
`papyrus_index_getplayer`, `open_papyrus_docs`, and
`nexus_papyrus_tweaks_ng`.

## Executive Rules

1. Prefer engine data over scripts when it can express the behavior.
   CK conditions, quest stages, packages, scenes, aliases, perks, spells, magic
   effect conditions, linked refs, and default scripts usually patch and persist
   better than custom Papyrus.

2. Prefer events over polling.
   Polling loops, frequent `OnUpdate`, and repeated short waits scale badly
   across real modlists.

3. Use `RegisterForSingleUpdate` chains for timer loops.
   Re-register at the end of the handler only if work remains. Avoid perpetual
   `RegisterForUpdate` unless the interval is truly needed and always
   unregister it.

4. Keep event handlers bounded.
   Papyrus pain usually comes from queued events, blocked instances, persistence,
   long latent work, and accumulated errors.

5. Avoid accidental persistence.
   Reference properties, long-running functions, script variables holding refs,
   and registered events can keep references around.

6. Treat saves as Papyrus databases.
   Script instances, variables, properties, running stacks, dynamic FormList
   additions, and old function versions can persist after plugin/source changes.

7. Guard optional forms, references, and casts.
   Repeated `None`, stale property, bad-cast, and unloaded-cell warnings are
   correctness bugs and log noise.

8. Profile before guessing.
   Use Papyrus logs, stack dumps, and profiling on controlled saves. Optimize
   measured bottlenecks, not visually suspicious lines.

9. Do not "fix" script load with blind INI tweaks.
   Budget increases trade against frame time and memory behavior. Large memory
   settings can create stutter or stack thrashing.

10. Use properties for owned/static data.
    Reserve `Game.GetFormFromFile` for optional dependencies or special cases,
    resolve once, cache, and never call it in hot loops.

## Mental Model

Papyrus is event-driven glue code. The safest scripts react to engine events,
call native game functions sparingly, update deliberate state, and exit.

Papyrus is threaded, but a single script instance is locked while a thread is
running in it. External calls can release that lock and allow queued events to
enter. Code that assumes "nothing else can change state during this function"
is unsafe once it calls outside itself.

Practical implications:

- store state deliberately
- use states, busy flags, version tokens, or queues for overlap
- keep external calls out of critical state transitions when possible
- do not assume event order after updates, waits, menus, or external calls

## Safer Patterns

### Engine First

Use CK/plugin systems where possible:

- conditions
- quest stages and fragments
- aliases
- packages and scenes
- perks
- spells and magic effect conditions
- linked refs
- default scripts

This reduces script instances, avoids many save-migration problems, and usually
plays better with patches.

### Event-Led Scripts

Prefer event handlers such as activation, hit/death, magic effect start/finish,
trigger enter/leave, alias events, item events, location changes, menu events,
tracked stats, or mod events.

Avoid:

- `While` plus `Utility.Wait` loops
- short-interval `RegisterForUpdate`
- many references running the same polling script

### Single-Update Timer Shape

```papyrus
Function StartTimerLoop()
    RegisterForSingleUpdate(5.0)
EndFunction

Event OnUpdate()
    If ShouldContinue()
        DoSmallUnitOfWork()
        RegisterForSingleUpdate(5.0)
    EndIf
EndEvent
```

Rules:

- schedule the next update after deciding work should continue
- stop when the quest stops, effect finishes, object unloads, dependency
  disappears, or work completes
- use game-time variants for game-time behavior
- do not mix multiple timer modes without explicit lifecycle cleanup

### Bounded Work

Prefer:

- split long work across events or timers
- process a bounded number of forms/items per update
- store progress and return
- let quests stop, aliases clear, and effects finish

Avoid:

- long waits inside one function
- giant inventory/ref scans
- workflows trapped in a single event with many latent waits
- persistent script-level reference variables that are no longer needed

### Lifecycle States

Use states for `at rest`, `busy`, `done`, or `disabled` behavior. Empty done
states are useful for do-once scripts.

Rules:

- use busy states or tokens to reject overlapping activation
- keep empty states empty
- unregister updates/events before switching to a disabled or done state

## High-Risk Patterns

| Pattern | Risk | Safer direction |
|---|---|---|
| frequent `OnUpdate` | stacked events, script lag, save growth | event detection or single-update chains |
| long waits | latent persistence and imprecise timing | timers, stored state, quest stages |
| no-failsafe loops | permanent work and queued events | max iterations, timeout, lifecycle stops |
| CK-filled ref properties for convenience | accidental persistence | aliases, linked refs, event args, local refs |
| mass base-object script attachment | many live instances | central quest/controller, conditions, targeted aliases |
| runtime errors as control flow | aborted calls and log spam | explicit `None` and cast guards |
| removing scripts/properties casually | stale save data and VMAD drift | migration, compatibility scripts, new script names when needed |
| blind Papyrus INI tuning | stutter, thrashing, false fixes | profiling, measured optimization |

## Persistence And References

Prefer:

- reference aliases for quest-owned lifetime
- linked refs for static object relationships
- event arguments for transient refs
- locally scoped variables cleared after use

Acceptable common exception:

```papyrus
Actor Property PlayerREF Auto
```

The player is already persistent; use a `PlayerREF` property for repeated player
access. `Game.GetPlayer()` is acceptable for rare one-off access, but avoid
calling it repeatedly in hot paths.

## Save-Health Rules

Papyrus save data can remember:

- script instances
- variable and property values
- running function stacks
- dynamic FormList changes
- old function versions until a saved stack exits

Update-safe design:

- include an integer version variable for scripts expected to survive updates
- run idempotent migration from load-safe events/timers, not only `OnInit`
- stop old timers and unregister old events during migration
- prefer adding variables/properties over renaming or removing them
- clear removed properties from CK/xEdit VMAD data
- leave compatibility scripts that shut old behavior down cleanly when needed

Uninstall safety:

- no scripted mod is truly safe to uninstall mid-save unless designed for it
- stop quests, unregister events, clear aliases, stop timers, and remove spells,
  perks, or items added by scripts where appropriate
- tools such as save cleaners are recovery procedures, not design strategies

## Debugging And Profiling

Recommended workflow:

1. Reproduce on a controlled save.
2. Enable Papyrus logging only for the test.
3. Fix recurring `None`, stale property, missing script, type mismatch, and
   unloaded-cell warnings from your scripts.
4. Use `DumpPapyrusStacks` / `DPS` when the VM appears stuck.
5. Enable profiling only while profiling.
6. Use `StartPapyrusScriptProfile`, `StartPSP`, or script-side profiling helpers
   where appropriate.
7. Inspect profiling logs in the game's script profiling log folder.
8. Optimize measured bottlenecks.
9. Disable profiling when done.

Release posture:

- keep diagnostic hooks if useful
- avoid traces in hot loops
- do not require users to run with Papyrus logging enabled
- do not hide real side effects behind debug-only calls

## Design Link

This implementation guidance reinforces the design guidance in
`game-design/skyrim-legacy-context.md`: older Skyrim saves and modlists reward
quiet, bounded, inspectable, event-led systems. Script cleverness is less
valuable than long-save stability.
