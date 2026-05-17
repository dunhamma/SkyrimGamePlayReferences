# Mod Gameplay Crosswalk Template

Use this file inside your mod project, not necessarily in this shared reference repo.

## Mod Scope

- Mod name:
- Gameplay system:
- Vanilla systems consumed:
- Required dependencies:
- Save/update risk:

## Signal Families

| Signal family | Vanilla source | Capture method | State written | Anti-farm rule | UX surface |
|---|---|---|---|---|---|
| Example | Kill Actor Story Manager event | Receiver quest | Daily scratch score | Direct player only, daily cap | Silent unless debug |

## Records To Verify Locally

| Record | Signature | Source plugin | Why needed | Validation status |
|---|---|---|---|---|
| ExampleKeyword | KYWD | Skyrim.esm | Actor/location classification | needs-local-extraction |

## Player Experience Rules

1. What does the player see?
2. What stays silent?
3. How does the player recover from failure?
4. How does this avoid becoming a chore loop?
5. What compatibility promise can the mod honestly make?
