# Ownership

One owner per file and area. Edit only paths you own. Ask the CTO to request a change in another owner's area.

| Path | Owner | Notes |
| --- | --- | --- |
| `README.md` | CTO | |
| `CONTRIBUTING.md` | CTO | |
| `docs/PROJECT_CONTEXT.md` | CTO | |
| `docs/REQUIREMENTS.md` | CTO | |
| `docs/ARCHITECTURE.md` | CTO | |
| `docs/IMPLEMENTATION_PLAN.md` | CTO | |
| `docs/TASKS.md` | CTO | |
| `docs/DECISIONS.md` | CTO | |
| `.github/` | CTO | Except `.github/workflows/` |
| `.github/workflows/` | DevOps Engineer | CTO reviews. T-000 exception: the CTO added `qa-gate.yml` during workspace setup. Later workflow edits belong to DevOps. |
| `design/` | UI/UX Designer | |
| `src/` | Full-Stack Developer | Future |
| `docs/API.md` | Full-Stack Developer | Future |
| `tests/` | QA & Security Engineer | Future |
| `docs/QA_SECURITY_PLAN.md` | QA & Security Engineer | Future |
| `infra/` | DevOps Engineer | Future |
| Docker and CI files | DevOps Engineer | Future, except `qa-gate.yml` (see `.github/workflows/`) |
| `docs/DEVOPS_PLAN.md` | DevOps Engineer | Future |
