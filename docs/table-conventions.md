# Table Conventions

CSV files in this repository are compact reference indexes, not exhaustive wiki mirrors.

## Required Habits

1. Keep one row per stable concept.
2. Include a `source_id` column when the row depends on an external or local source.
3. Use source IDs from `sources.yaml` where possible.
4. Use `mod_design_use` or `modding_relevance` to explain why the row matters to mod authors.
5. Use `needs_validation` when a row is plausible but not yet verified from local game data.
6. Prefer `EditorID` and `source_plugin` columns for extracted records.
7. Do not hand-copy long wiki tables. Add enough rows to guide design, then expand by extraction or focused verification.

## CSV Encoding

- UTF-8, ASCII text content preferred.
- Comma-separated with a header row.
- Quote fields that contain commas.
- Use `none`, `unknown`, or `todo` instead of blank cells when absence is meaningful.

## Suggested Columns By Table Type

| Table type | Suggested columns |
|---|---|
| CK records | `editor_id,form_id,signature,source_plugin,category,mod_design_use,source_id,notes` |
| Gameplay mechanics | `mechanic,vanilla_behavior,mod_design_use,caution,source_id` |
| UX findings | `theme,evidence,design_rule,risk_if_ignored,source_id` |
| Crosswalks | `mod_signal,vanilla_surface,capture_pattern,scoring_use,anti_farm_rule,source_id,status` |
| Tooling references | `topic,tool_or_domain,source_id,authority_tier,use_for,not_for,currentness_note,automation_note,validation` |
| Authoring review | `area,review_question,preferred_pattern,risk_if_ignored,source_id,validation` |
| CK quest authoring | `task,CK surface,xEdit review surface,runtime proof,source_id,validation` |
| CK playbook index | `playbook,primary_use,ck_surface,xedit_review,runtime_acceptance,source_id,validation` |
| CK failure modes | `symptom,likely cause,inspection path,fix pattern,source_id,validation` |
| CK output maps | `artifact/output,expected location,owner tool,risk if misplaced,verification step,source_id` |

## Source Authority

Qualitative rows and documents must be labeled so they are not retrieved as verified mechanics. Use `validation` values such as `qualitative-design-signal` or `qualitative signal only` for UX/community evidence. See `source-authority.md`.

## Validation States

| State | Meaning |
|---|---|
| `source-backed` | Verified from UESP, CK Wiki, official documentation, or a named mod page/community source. |
| `implementation-reference` | Practical CK, Papyrus, xEdit, or tooling guidance backed by source docs and still requiring runtime or local verification when behavior matters. |
| `tooling-practice-reference` | Tooling workflow guidance for authoring, cleaning, patching, metadata, or setup; not vanilla gameplay truth. |
| `workflow-synthesis` | Practical guidance synthesized from community or project docs; use for review habits, not unqualified engine behavior. |
| `local-data-backed` | Verified from local master/plugin data or live mod source. |
| `extracted` | Generated directly from local master/plugin data. |
| `candidate-extracted` | Generated from local master/plugin data by a broad modding-relevant filter; needs human curation before implementation. |
| `candidate-scan` | Generated from local scan inventory only; read individual record details before implementation. |
| `seed` | Curated design seed intended to drive later extraction, patcher rules, or implementation review. |
| `design-inference` | Reasoned from source-backed facts, but not itself a direct source claim. |
| `needs-local-extraction` | Should be expanded from local plugin data before implementation. |
| `needs-runtime-test` | Needs in-game verification before being treated as behaviorally proven. |
| `qualitative-design-signal` | Community/mod-page/design evidence only; not verified mechanics or statistical proof. |
