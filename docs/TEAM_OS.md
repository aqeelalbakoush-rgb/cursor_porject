# Team Operating System (5 bots + Cursor + GitHub)

## 1. Architecture
- **Aqeel**: owner. Gives ideas, approves consequential actions (deploy, delete, paid, prod, release merges).
- **CTO bot**: single entry point and coordinator. Only the CTO talks to all bots and launches Cursor cloud agents.
- **Cursor Cloud Agents** = code execution engine. Each task runs on its own VM and its own branch, so parallel work never collides (no shared working tree; worktrees not needed in the cloud).
- **GitHub repo** = single source of truth: code, docs, decisions, tasks, PRs, CI.
- **Aqeel's local Cursor IDE** = viewing, pulling, reviewing PRs, optional local runs. Not controlled by bots unless the Cursor Agent CLI is installed and approved.
- **Specialist bots** produce specs, designs, reviews, test reports; code changes are executed through cloud agents on task branches.

## 2. Roles and permissions
| Role | Does | Writes (owns) | Never |
|---|---|---|---|
| CTO | requirements, research, architecture, task split, launches cloud agents, merges after QA PASSED | README, CONTRIBUTING, AGENTS.md, docs/* (except role docs), .github/ (except workflows), .cursor/rules | merge without QA PASSED, deploy without Aqeel |
| Full-Stack | writes precise implementation briefs for cloud agents, reviews agent diffs, fixes bugs, writes unit/integration tests | src/, tests/unit, docs/API.md | edit design/, infra/ |
| UI/UX | flows, design spec + static HTML mocks, RTL/responsive/a11y rules, design tokens | design/ | edit src/ directly (requests go via CTO) |
| QA & Security | reviews PRs, runs tests that actually execute, security review, files bug reports, sets qa-passed | tests/e2e, docs/QA_SECURITY_PLAN.md, docs/reports/qa-*.md | mark PASSED on tests not run |
| DevOps | Docker, CI/CD, env config, deploy (with approval), monitoring, backups | infra/, Dockerfile*, docker-compose*, .github/workflows/ (CTO reviews), docs/DEVOPS_PLAN.md | deploy, pay or delete without Aqeel |

## 3. Git model
- `main`: always working. Protected when possible. No direct pushes.
- Task branches: `<role>/<task-id>-<slug>`, e.g. `fullstack/T-012-login-api`.
- One task = one branch = one PR = one owner. Small PRs. Squash merge.
- No `develop` branch until there is a real staged-release need.
- Conflict avoidance: CTO never assigns two open tasks touching the same files; TASKS.md lists files/areas per task.

## 4. QA gate (all bots act through one GitHub account, so self-approval is impossible)
1. PR from task branch; CI runs (lint/tests when they exist).
2. QA reviews, actually runs tests, posts a PR comment report (commands + results).
3. QA sets label `qa-passed` or `qa-changes-requested`.
4. Check `qa-gate` fails unless `qa-passed` is present; branch protection requires it (needs public repo or GitHub Pro).
5. CTO merges only when CI green + `qa-passed`.

## 5. Workflow: idea to delivery
1. Idea (Aqeel to CTO).
2. CTO: PROJECT_CONTEXT.md, REQUIREMENTS.md; blocking questions to Aqeel only.
3. CTO: research official docs; ARCHITECTURE.md + DECISIONS.md; Aqeel approves stack.
4. CTO: IMPLEMENTATION_PLAN.md + TASKS.md (task id, owner, files, acceptance criteria, depends on).
5. UI/UX: design/ for screens needed by next tasks; CTO reviews.
6. DevOps: dev env + CI skeleton (T-001) before feature work.
7. Build loop per task: CTO launches cloud agent with brief (Full-Stack spec + design links) on task branch -> PR -> Full-Stack reviews diff -> QA tests and labels -> CTO merges.
8. Milestone report to Aqeel: done / in progress / tests run + results / issues / approvals needed.
9. Release: DevOps deploy plan -> Aqeel approves -> DevOps deploys -> QA smoke-tests production.
10. Handover: README run instructions, docs current, backups verified.

## 6. Messaging and files between bots
- Bot messages are short pointers: task id + branch/PR + files. Context lives in repo docs, not messages.
- Task brief: Goal / Files allowed / Inputs (doc links) / Acceptance criteria / Tests to run / Out of scope / Report format.
- Report (max 8 lines): Status, Branch/PR, Commit, Tests run + result, Issues, Needs decision.
- Call only the specialist needed: QA on every code PR; UI/UX only for UI; DevOps only for env/CI/deploy.

## 7. Token and cost rules
- Project memory in docs/*.md, AGENTS.md and .cursor/rules; don't re-explain context.
- Cloud agents use Grok models by default (included); other models only with Aqeel's approval (they need paid credits).
- One cloud agent per task; reuse it for follow-ups on that PR.
- Parallel tasks only when their file sets don't overlap.

## 8. Statuses
NOT STARTED, IN PROGRESS, BLOCKED, UNDER REVIEW, TESTING, PASSED, COMPLETED. Always state implemented / tested / verified / deployed explicitly.
