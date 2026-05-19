# Game Design Principles For Skyrim Modding

Status: qualitative synthesis

These principles translate common game-design thinking into practical questions
for Skyrim gameplay mods. They should shape review, not replace CK, xEdit, UESP,
or local runtime verification.

Sources used: `mda_framework`, `fullerton_game_design_workshop`,
`schell_art_of_game_design`, `chen_flow_in_games`, `microsoft_xag`,
`microsoft_gadpeg`, `gdc_upton_game_pitch`, the Skyrim-specific open-world RPG
sources in `skyrim-open-world-rpg-audit.md`, plus the modding-specific UX
sources already tracked in `sources.yaml`.

## Principle Map

| Principle | Design meaning | Skyrim modding implication | Failure smell | Source IDs | Validation |
|---|---|---|---|---|---|
| Start from desired player experience | Mechanics should be chosen because they create a target experience, not because a hook is available. | Decide whether the goal is reverence, danger, belonging, guilt, power, discovery, or mastery before choosing quest stages, keywords, or scripts. | A system has many detectable events but no clear feeling. | `mda_framework`; `schell_art_of_game_design` | qualitative-design-signal |
| Mechanics become dynamics in play | A rule does not matter by itself; it matters through the repeated behavior it creates. | Before scoring a repeatable action, ask what behavior it teaches over a long save. | The mod rewards menu loops, grind routes, or degenerate farming. | `mda_framework`; `fullerton_game_design_workshop` | qualitative-design-signal |
| Interesting choices need tradeoffs | A choice is strongest when options are legible, meaningfully different, and not solved by one obvious optimum. | Patron, faction, curse, and reward choices should express roleplay tradeoffs rather than always stacking into a best build. | Every player should take the same option because it is all upside. | `schell_art_of_game_design`; `gdc_upton_game_pitch` | qualitative-design-signal |
| Friction should open decisions | Friction is useful when it asks the player who they are; it is tedious when it merely asks them to repeat upkeep. | Use pilgrimage, confession, taboo breach, oath, sacrifice, or renunciation as authored moments. Avoid daily click-tax mechanics. | The player is maintaining a spreadsheet instead of roleplaying. | `modding-ux`; `reddit_tedium_not_immersion`; `reddit_survival_tedium` | qualitative-design-signal |
| Feedback should match consequence | Players need enough feedback to understand causality, but routine systems should not interrupt play constantly. | Use rare notifications for major moments, quiet status surfaces for routine state, and debug output for scoring detail. | Notification spam makes the system feel like UI instead of world response. | `nexus_notification_filter`; `nexus_ihud`; `microsoft_xag` | qualitative-design-signal |
| Recovery preserves trust | Punishment feels fairer when players understand it, can recover, and are not silently trapped by hidden state. | Neglect, taboo, faction stigma, and curse pressure should have visible repair routes or clear escalation moments. | A player learns hours later that they unknowingly ruined a path. | `schell_art_of_game_design`; `microsoft_gadpeg`; `nexus_sunhelm` | qualitative-design-signal |
| Pace challenge around ability | Challenge should land near the player's current capability, or let players self-select intensity. | Avoid attaching high-pressure mechanics to normal travel, sleep, or survival loops unless there are opt-outs, grace, or clear difficulty expectations. | The system overwhelms low-level or casual roleplay characters. | `chen_flow_in_games`; `microsoft_xag` | qualitative-design-signal |
| Keep the interface accessible | Design must account for text size, input burden, timing, feedback modality, and cognitive load. | Avoid time-critical configuration, tiny text-only cues, color-only meaning, and controls that assume one input style. | The mod is understandable only to players with perfect vision, hearing, memory, and dexterity. | `microsoft_xag`; `microsoft_gadpeg` | qualitative-design-signal |
| Preserve vanilla affordances | Mods feel better when they respect what vanilla already taught the player. | Shrines, blessings, factions, crime, sleep, disease, crafting, and quest stages should build on familiar expectations unless deliberately subverted. | The mod redefines a familiar action without warning. | `pcgamer_vanilla_plus`; `uesp_skyrim_blessings`; `uesp_skyrim_crime` | qualitative-design-signal |
| Avoid false precision | A precise number can imply certainty the design does not really have. | Use extracted tables as discovery, then curate. Do not turn every keyword, item, or cell candidate into automatic scoring. | The mod acts as if broad record metadata proves moral meaning. | `mda_framework`; `local_vanilla_extraction` | qualitative-design-signal |
| Scope is a design feature | A smaller reliable mechanic beats a broad fragile one. | Prefer a few high-confidence hooks per deity/path over a giant simulated morality net. | The design depends on brittle detection for everything the player might do. | `gdc_upton_game_pitch`; `fullerton_game_design_workshop` | qualitative-design-signal |
| Test the experience, not just the rule | A rule can be technically correct and still feel bad. | Playtest whether a hook changes behavior, creates anxiety, or disappears into noise. | The implementation passes but players do not understand or enjoy the outcome. | `fullerton_game_design_workshop`; `schell_art_of_game_design` | qualitative-design-signal |

See `skyrim-open-world-rpg-audit.md` before using these principles for Skyrim
or Skyrim-like modding. The strongest filter is not generic design quality; it
is whether the mechanic preserves curiosity, self-direction, layered world
simulation, long-session flow, and vanilla affordances.

## Review Questions

1. What feeling is this mechanic meant to create?
2. What repeated behavior will this mechanic teach over a 100-hour save?
3. Can the player understand why the result happened?
4. Can the player recover if the result is negative?
5. Is this a meaningful decision or just upkeep?
6. Does the feedback interrupt play more than the consequence deserves?
7. Does the mechanic respect vanilla expectations?
8. Does the hook prove enough meaning to justify scoring it?
9. Could this be smaller, rarer, or more authored and still achieve the design goal?
10. What would make a player disable this feature?
