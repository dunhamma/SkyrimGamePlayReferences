# Skyrim Compatibility Dossiers

Status: living reference - first broad planning pass

These are not compatibility commitments. They define what to inspect when a Skyrim mod project chooses a compatibility target.

## Default Compatibility Posture

- Prefer soft compatibility through vanilla events, keywords, factions,
  locations, and generated patch ESPs.
- Do not make a major overhaul a hard dependency.
- Read external mod state only through explicit adapters.
- Never let an external mod become your mod's source of truth.
- If integration requires records from another plugin, put them in an optional
  generated patch or hand-authored compat patch.

## Wintersun - Faiths of Skyrim

Source: `nexus_wintersun`

Suggested posture: coexist by default, integrate only if a later compatibility phase
proves a clear need.

Why it matters:

- It is the most obvious player comparison for Skyrim religion.
- It has its own deity/favor/tenet model, so direct mechanical integration can
  create doubled religion systems.

Likely mod-integration route:

- Do not detect or suppress Wintersun in 1.0.
- Avoid overwriting shrine activators broadly.
- Optional later patch could suppress duplicate notifications or map selected
  Wintersun worship state into a mod read-only context, but not source-of-truth.

## Pilgrim - A Religion Overhaul

Source: `nexus_pilgrim`

Suggested posture: shrine/effect coexistence review.

Why it matters:

- It changes religion through shrine/effect balance rather than a large hidden
  score simulation.
- It can overlap with your mod's blessing/privilege layer.

Likely mod-integration route:

- Avoid replacing shrine activators.
- Use your mod's own blessings/neglect as separate spells/effects.
- Later generated patch may classify Pilgrim shrine records if needed.

## Requiem - The Roleplaying Overhaul

Source: `public_requiem_github`

Suggested posture: optional balance compatibility after core 1.0.

Why it matters:

- Requiem changes combat, perks, race balance, enemy danger, and economy
  expectations.
- effect magnitudes that are modest in vanilla may be too strong or too weak
  in Requiem.

Likely mod-integration route:

- Keep 1.0 magnitudes vanilla-safe.
- Add a Requiem tuning patch later for reward/neglect magnitudes.
- Avoid assumptions about enemy difficulty from vanilla actor categories.

## Sacrosanct - Vampires of Skyrim

Source: `nexus_sacrosanct`

Suggested posture: high-value optional curse-state adapter.

Why it matters:

- Vampire feeding, progression, and scripts can diverge from vanilla vampire
  assumptions.
- Its mod page warns about modified vampire scripts and compatibility patches,
  which is exactly the kind of area a mod should touch carefully.

Likely mod-integration route:

- Do not overwrite vampire quest scripts.
- Prefer PO3/vanilla curse-state observation and optional Sacrosanct adapter
  events if available.
- Keep the vampire quest/lore context independent of Sacrosanct progression math.

## Growl - Werebeasts of Skyrim

Source: `nexus_growl`

Suggested posture: optional werewolf/Hircine adapter.

Why it matters:

- It changes werebeast progression and can interact with werewolf race/form
  behavior.
- Hircine, Bosmer, Nord, and curse-state overlays all care about beast form.

Likely mod-integration route:

- Observe beast-form state, do not modify Growl's progression.
- Optional patch can map Growl-specific perks/effects into a mod curse context.
- Keep Hircine score separate from werewolf power growth.

## SunHelm / Streamlined Survival

Source: `nexus_sunhelm`

Suggested posture: qualitative UX reference and optional survival-context adapter.

Why it matters:

- It is a common modern survival/needs style and demonstrates configurable,
  low-friction survival UX.
- travel, hunger, rest, weather, and wilderness signals can overlap with
  survival mods.

Likely mod-integration route:

- Do not require survival mods.
- If present, read survival state only through optional adapters.
- Avoid punishing players twice for hunger/cold/fatigue.

## Frostfall - Hypothermia Camping Survival

Source: `nexus_frostfall`

Suggested posture: optional cold-weather context adapter, not a baseline dependency.

Why it matters:

- It makes weather, water, exposure, fire, and shelter mechanically meaningful.
- Kyne/Kynareth/Khenarthi travel and weather favors can become too strong if
  they also solve Frostfall problems.

Likely mod-integration route:

- Keep weather favors modest and contextual.
- Later patch can add Frostfall-aware caps or alternate favor magnitudes.
- Avoid mandatory cold-survival worship loops.

## Vigilant

Source: `nexus_vigilant`

Suggested posture: later quest-content compatibility, not 1.0 core.

Why it matters:

- It is a major Stendarr/Daedric quest mod with heavy moral and quest/lore
  content.
- It can become a rich curated quest-stage source, but only with focused review.

Likely mod-integration route:

- Do not infer from mod presence alone.
- Optional compatibility pass should map selected quest stages to mod signals.
- Keep the Stendarr/Vigilant baseline playable without Vigilant installed.

## Multi-Religion-Mod Stack Rule

If a player runs multiple religion mods:

- The mod should remain quiet and additive.
- Do not fight over shrine scripts.
- Prefer separate blessings/effects with clear names.
- Avoid duplicate daily prompts.
- Offer MCM/debug visibility rather than forced migration.
