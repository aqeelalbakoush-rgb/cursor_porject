# FloCafe import notes

Imported for WinCafe (WinTech) as the product base. This import does not rebrand the source and does not change product features.

## Upstream

- Repository: https://github.com/FreeOpenSourcePOS/FloCafe
- Branch: `main`
- Commit: `2bac03d52f470ab2897ebe0750167c48e4691ce3`
- Commit date: 2026-11-15 21:48:25 -0500
- Subject: `chore(deps): bump minor and patch dependencies (#1595)`
- License: MIT, kept unchanged at `LICENSE` (`Copyright (c) 2025-2026 FloCafe Contributors`)

## History

Upstream git history was preserved. The remote `upstream` points at the FloCafe repository, and `upstream/main` was merged with `--allow-unrelated-histories`. The merge commit has two parents: this repository's `main` and FloCafe commit `2bac03d52f470ab2897ebe0750167c48e4691ce3`.

## Kept

Team files stayed at their existing paths:

- `AGENTS.md`
- `CONTRIBUTING.md`
- `README.md` (a short Upstream section was added)
- `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/OWNERSHIP.md`, `docs/PROJECT_CONTEXT.md`, `docs/REQUIREMENTS.md`, `docs/TASKS.md`, `docs/TEAM_OS.md`
- `.cursor/rules/team-workflow.mdc`
- `.github/ISSUE_TEMPLATE/task.md` (upstream issue forms were added beside it)
- `.github/pull_request_template.md`
- `.github/workflows/qa-gate.yml` (triggers unchanged)
- `.editorconfig`
- `.vscode/extensions.json` (recommendation lists merged)
- `design/.gitkeep`

The rest of the FloCafe tree was imported at the repository root. Upstream docs that did not share a path with a team doc stayed under `docs/`.

## Moved

Path conflicts kept both sides. The team file stayed in place. The upstream file was copied here:

| Upstream path | Preserved as |
| --- | --- |
| `README.md` | `docs/upstream/FLOCAFE_README.md` |
| `AGENTS.md` | `docs/upstream/FLOCAFE_AGENTS.md` |
| `CONTRIBUTING.md` | `docs/upstream/FLOCAFE_CONTRIBUTING.md` |
| `.github/pull_request_template.md` | `docs/upstream/FLOCAFE_pull_request_template.md` |

Relative links inside `docs/upstream/FLOCAFE_README.md` still use paths from the FloCafe repository root.

## Merged

- `.gitignore` is the union of the team rules and the FloCafe rules. Team entries include `build/`, `coverage/`, `*.log`, `.idea/`, and `.vscode/*` with exceptions for `settings.json` and `extensions.json`. FloCafe entries include release outputs, database files, signing assets, and local auth state. FloCafe files already tracked under `build/` stay tracked. `build/` ignores untracked files in that directory.
- `.vscode/extensions.json` keeps the team recommendations and adds FloCafe's `oxc.oxc-vscode`. Upstream `.vscode/settings.json` was added beside it.

## Disabled workflows

Upstream workflow files were renamed with an `upstream-` prefix. Automatic triggers (`push`, `pull_request`, `schedule`, and tag pushes) were removed. Each file is `workflow_dispatch` only, so release and publish jobs do not run against this repository.

| Original | Renamed |
| --- | --- |
| `.github/workflows/ci.yml` | `.github/workflows/upstream-ci.yml` |
| `.github/workflows/full-cross-platform-matrix.yml` | `.github/workflows/upstream-full-cross-platform-matrix.yml` |
| `.github/workflows/publish-mas.yml` | `.github/workflows/upstream-publish-mas.yml` |
| `.github/workflows/release-candidate-gate.yml` | `.github/workflows/upstream-release-candidate-gate.yml` |
| `.github/workflows/release.yml` | `.github/workflows/upstream-release.yml` |
| `.github/workflows/tax-pack-release.yml` | `.github/workflows/upstream-tax-pack-release.yml` |
| `.github/workflows/upgrade-matrix.yml` | `.github/workflows/upstream-upgrade-matrix.yml` |

`publish-mas.yml`, `release-candidate-gate.yml`, and `upgrade-matrix.yml` were already `workflow_dispatch` only. They were renamed and that trigger was kept.

Two lookups inside those files were pointed at the new names: `upstream-ci.yml` queries its own Actions runs, and `upstream-release-candidate-gate.yml` reads and dispatches `upstream-upgrade-matrix.yml`. Path-filter strings inside `upstream-ci.yml` still mention `.github/workflows/ci.yml`, which is the path FloCafe used.

`qa-gate.yml` is the team workflow. It was not renamed and its triggers were not changed.

## Not committed

No secrets, build artifacts, or `node_modules` were added. No `npm publish`, GitHub release, or deployment was run.
