# Agent instructions

Read these before editing:

1. [docs/TEAM_OS.md](docs/TEAM_OS.md)
2. [docs/OWNERSHIP.md](docs/OWNERSHIP.md)
3. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
4. [docs/TASKS.md](docs/TASKS.md)

## Scope

- Work only on the task branch you were given.
- Touch only files listed in the task brief.
- Keep pull requests small: one task, one branch, one PR.
- Do not push to `main`.

## Checks

- Run the lint and tests that already exist. Report the exact commands and their results.
- Never claim a test passed unless that test ran.
- If no lint or tests exist yet, report `none`.
- Do not commit secrets. Put variable names in `.env.example` only.

## Arabic RTL UI

- Set `dir="rtl"` on the document or the Arabic UI root.
- Use logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline`), not physical left/right.
- Product copy is Arabic.
- Use Western digits 0-9.

## Report

End every task with:

- Status
- Branch
- Commit
- Files changed
- Tests run and results
- Open issues
