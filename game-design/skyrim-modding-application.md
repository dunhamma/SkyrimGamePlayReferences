# Applying Game Design Principles To Skyrim Mods

Status: qualitative design synthesis

This note is for the moment after a mod author finds a possible hook. The main
question is not "can I detect this?" It is "will reacting to this make Skyrim
better to play?"

Read `skyrim-open-world-rpg-audit.md` first when designing for Skyrim or a
Skyrim-like modlist. The practical bias should be toward curiosity, player
self-direction, place-aware meaning, quiet long-save systems, and compatibility
with heavily modded load orders.

## From Hook To Mechanic

| Step | Question | Skyrim example | Good outcome |
|---|---|---|---|
| Desired experience | What should the player feel? | A shrine visit should feel like recognition, not a vending machine. | The mechanic has a player-facing purpose. |
| Evidence quality | Does the hook actually prove the intended meaning? | `ActorTypeDaedra` proves actor classification, not the player's motive. | Broad hooks become context, not automatic morality. |
| Cadence | How often will this fire? | Kill, harvest, craft, eat, and sleep can happen constantly. | Frequent hooks are batched, capped, or moved to status surfaces. |
| Consequence | Is the result proportionate? | A one-off prayer should not permanently reshape a build. | Small acts produce small acknowledgement; major acts produce major response. |
| Feedback | How will the player learn what happened? | A major patron offer can notify; a minor daily drift can wait for MCM/status. | Feedback feels legible without becoming noise. |
| Recovery | What if the player regrets it? | A taboo breach can create repair play instead of permanent hidden failure. | Negative states create choices, not traps. |
| Compatibility | What else touches this surface? | Leveled lists, vendor chests, factions, and shrine effects are common conflict points. | Risky surfaces are patcher rules or compatibility dossiers, not casual edits. |

## Design Patterns That Fit Skyrim

### Quiet Background Recognition

Use when the action is frequent or low-stakes.

Good fits:

- travel context
- repeated sleep or inn use
- ordinary hunting or crafting
- broad faction identity
- low-level devotional consistency

Implementation posture:

- accumulate quietly
- summarize at dawn, shrine, MCM/status, or major threshold
- cap daily or per-context gains
- avoid routine notifications

### Authored Turning Point

Use when the action is rare, moral, costly, or identity-shaping.

Good fits:

- Daedric quest choices
- faction commitment
- vampire/werewolf acceptance or cure
- patron commitment
- betrayal, mercy, renunciation, oath, or taboo breach

Implementation posture:

- use quest stages, dialogue branches, faction ranks, or curated aliases
- make feedback explicit
- record the state once
- allow repair or later authored reorientation where appropriate

### Contextual Favor

Use when the god, culture, place, or state should briefly notice the player.

Good fits:

- sacred-place entry
- a hunt completed under the right conditions
- a battle after a vow
- a burial rite
- a craft act at a culturally meaningful forge

Implementation posture:

- short duration
- narrow trigger
- clear context
- no permanent stacking by default

### Eligibility Gate

Use when a vanilla state should unlock dialogue, shrine access, status, or a
future offer, but should not itself award power.

Good fits:

- faction rank
- location type
- race variant
- disease or curse state
- questline progress
- crime/faction reputation

Implementation posture:

- use CK conditions where possible
- keep scoring separate from eligibility
- explain blocked states in player terms

## Design Patterns To Treat Carefully

### Raw Counter Scoring

Avoid turning raw counts into moral meaning.

Risky examples:

- every crafted item
- every harvested plant
- every humanoid kill
- every lock picked
- every fast travel

Safer alternatives:

- milestone bands
- daily caps
- curated contexts
- quest/faction proof
- high-confidence semantic tags

### Hidden Permanent Penalty

Avoid penalties that the player cannot see, understand, or repair.

Safer alternatives:

- grace periods
- warning thresholds
- visible status text
- repair rituals
- delayed dawn resolution
- debug-only detail plus player-facing summary

### Broad Metadata Morality

Keywords, factions, locations, and leveled lists are excellent discovery tools.
They are not always sufficient proof of meaning.

Safer alternatives:

- use metadata as candidate context
- require a second proof signal
- hand-curate moral/ritual rows
- verify exact records locally

## Skyrim-Specific Review Heuristics

1. If the player can repeat it safely in town forever, do not make it an uncapped progression source.
2. If the hook is broad enough to catch normal play, the reward should be modest or contextual.
3. If the consequence is permanent, the signal should be rare, authored, and legible.
4. If a vanilla system already has a strong player expectation, respect that expectation or clearly teach the exception.
5. If another major mod is likely to touch the record surface, prefer a generated patch or compatibility note.
6. If a mechanic needs explanation every time, the surface is probably too noisy.
7. If a deity or reputation system cannot explain why it cared, the hook is probably too broad.
8. If a feature feels like maintenance, look for a way to turn it into a decision.
