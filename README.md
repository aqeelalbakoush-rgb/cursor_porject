# Team workspace

**Project:** TBD — project not defined yet.

This repository is the shared workspace for a five-role software team. Documentation is in English. Product copy, when the product is defined, is Arabic and laid out right-to-left (RTL).

No application code is in this repository yet.

## Team

| Role | Focus |
| --- | --- |
| CTO | Lead. Reviews and merges pull requests. Owns planning docs and `.github/`. |
| Full-Stack Developer | Application implementation (future `src/`). |
| UI/UX Designer | Design and Arabic RTL product copy (`design/`). |
| QA & Security Engineer | Tests and security (future `tests/`). |
| DevOps Engineer | Infrastructure, Docker, and CI (future). |

## Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md) — workflow, statuses, and safety rules
- [docs/OWNERSHIP.md](docs/OWNERSHIP.md) — one owner per file and area
- [docs/PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md)
- [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md)
- [docs/DECISIONS.md](docs/DECISIONS.md)
- [docs/TASKS.md](docs/TASKS.md)

## How to work

1. Pick one task from [docs/TASKS.md](docs/TASKS.md). Use the statuses in [CONTRIBUTING.md](CONTRIBUTING.md).
2. Create one branch for that task: `<role>/<task-id>-<short-name>`. Roles are `cto`, `fullstack`, `uiux`, `qa`, and `devops`.
3. Edit only files you own. Ownership is in [docs/OWNERSHIP.md](docs/OWNERSHIP.md). Ask the CTO to request a change in another owner's area.
4. Commit as `<role>: <summary>`. Open a pull request. The CTO reviews and merges. `main` changes only through that review.
5. Record whether work is implemented, tested, verified, and deployed as separate facts. Deployment, data deletion, and paid services need Aqeel's explicit approval.

Full rules: [CONTRIBUTING.md](CONTRIBUTING.md).
