# Game Design Reference

Status: qualitative design synthesis

This folder collects general game-design principles that are useful when turning
Skyrim mechanics into modded gameplay. It is not a mechanics source, a CK record
reference, or evidence about how the Skyrim engine behaves.

Use it for:

- design review
- UX risk review
- reward and progression sanity checks
- player-agency questions
- deciding whether a hook should become a mechanic at all
- translating extracted vanilla data into playable systems

Do not use it for:

- exact gameplay formulas
- CK implementation claims
- engine behavior
- statistical claims about player preference
- source-of-truth answers about vanilla records

## Files

| File | Purpose |
|---|---|
| `design-principles.md` | General design principles with Skyrim modding implications. |
| `skyrim-open-world-rpg-audit.md` | Audit of the design layer against Skyrim's specific open-world RPG shape. |
| `skyrim-legacy-context.md` | Design constraints that come from Skyrim being a 2011 game with a long-lived mod ecosystem. |
| `skyrim-modding-application.md` | Practical application notes for Skyrim gameplay mods. |
| `design-review-checklist.csv` | Compact checklist for reviewing proposed mechanics, hooks, and rewards. |

## Retrieval Rule

AI/RAG instruction: include this folder only when the user asks for design,
player experience, UX, reward feel, onboarding, progression, accessibility, or
mechanic-quality review. Exclude it from verified-mechanics retrieval by
default.
