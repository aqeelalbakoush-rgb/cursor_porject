# Contributing

These rules apply to every role. The CTO reviews and merges. Aqeel approves deployment, data deletion, and paid services.

## Branches

- One branch per task.
- Branch name: `<role>/<task-id>-<short-name>`.
- Roles: `cto`, `fullstack`, `uiux`, `qa`, `devops`.
- Example: `fullstack/T-001-arabic-shell`.
- `main` accepts merges from pull requests the CTO has reviewed. Do not push to `main` directly.

## Pull requests

- Every change goes through a pull request.
- The CTO reviews and merges.
- Fill in `.github/pull_request_template.md`.
- One task per pull request.

## Ownership

- Each file and area has one owner. See [docs/OWNERSHIP.md](docs/OWNERSHIP.md).
- Edit only files you own.
- To change another owner's files, ask the CTO. The CTO assigns the change to that owner.
- Do not delete branches or files you do not own.

## Commits

- Commit message: `<role>: <summary>`.
- Example: `qa: add login acceptance checks`.
- Do not force-push.
- Do not rewrite history (no amending published commits, no rebasing that rewrites shared commits, no reset of shared branches).

## Secrets

- Do not commit secrets, credentials, tokens, or private keys.
- Local secrets belong in `.env`, which is gitignored.
- Share variable names only through `.env.example`.

## Approvals

Do not deploy, delete data, or use paid services without Aqeel's explicit approval.

## Statuses

Use these values in [docs/TASKS.md](docs/TASKS.md) and in issues:

| Status | Meaning |
| --- | --- |
| NOT STARTED | No branch yet. |
| IN PROGRESS | An owner is working on the branch. |
| BLOCKED | Work stopped on a named dependency or decision. |
| UNDER REVIEW | A pull request is open for CTO review. |
| TESTING | QA is exercising the change. |
| PASSED | Testing met the acceptance criteria. |
| COMPLETED | The pull request is merged. |

## Implemented, tested, verified, deployed

Keep these words separate. A later stage does not replace an earlier one.

| Word | Meaning |
| --- | --- |
| Implemented | The change exists in the branch or on `main`. |
| Tested | Checks were run and the result is recorded (or `none` when no tests apply). |
| Verified | The CTO confirmed the result against the acceptance criteria. |
| Deployed | The change is running in an environment. This requires Aqeel's explicit approval. |

A merged task is completed in git. It is deployed only after that separate approval.
