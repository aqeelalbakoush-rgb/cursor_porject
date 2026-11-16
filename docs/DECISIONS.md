# Decisions

TBD: project not defined yet.

Product decisions will be added here as ADRs when the project is defined. Team workflow is already decided.

| ID | Date | Decision | Reason | Status |
| --- | --- | --- | --- | --- |
| D-001 | 2026-11-16 | Team workflow: branch per task, PR review by CTO, single file owner | The repository starts with five roles and no product scope. One branch per task, CTO review on every pull request, and one owner per file keep changes traceable before any code exists. | Accepted |
| D-002 | 2026-11-16 | Cursor cloud agents are the code execution engine, one agent per task branch | Each task gets its own cloud agent, VM, and branch, so parallel work does not share a working tree. | Accepted |
| D-003 | 2026-11-16 | No develop branch for now; main + task branches; QA gate via label + qa-gate check | There is no staged-release need yet. `main` stays the only long-lived branch, and QA approval is the `qa-passed` label enforced by the `qa-gate` check. | Accepted |
