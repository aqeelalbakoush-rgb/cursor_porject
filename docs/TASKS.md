# Tasks

TBD: project not defined yet.

| # | Task | Owner | Branch | Status | PR |
| --- | --- | --- | --- | --- | --- |
| T-000 | Workspace setup | CTO | setup/workspace | PASSED | https://github.com/aqeelalbakoush-rgb/cursor_porject/pull/1 |
| T-002 | Record QA follow-ups from PR #1 | CTO | cto/T-002-qa-followups | UNDER REVIEW | https://github.com/aqeelalbakoush-rgb/cursor_porject/pull/2 |
| T-003 | Clear `qa-passed` when a pull request receives new commits | DevOps Engineer | - | NOT STARTED | - |
| T-004 | Require `qa-gate` in branch protection and limit who can set `qa-passed` | DevOps Engineer | - | NOT STARTED | - |

T-001 stays unused here. [TEAM_OS.md](TEAM_OS.md) reserves it for the DevOps dev environment and CI skeleton.

QA review on PR #1 (docs only, no tests executed) asked for these follow-ups:

- T-003 files: `.github/workflows/qa-gate.yml`. `qa-passed` currently stays on after `synchronize`, so a later commit keeps the old approval. The workflow today has `contents: read` and cannot remove a label. Until DevOps changes that, QA applies `qa-passed` again after every push.
- T-004 is a GitHub setting on `main`, not a file. This repository is public, so branch protection does not need a paid plan. Any account with triage access can add `qa-passed` today.

Status values and the difference between implemented, tested, verified, and deployed are defined in [../CONTRIBUTING.md](../CONTRIBUTING.md).
