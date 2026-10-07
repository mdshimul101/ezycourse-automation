# EzyCourse Automation

End-to-end tests for EzyCourse, written with Playwright + TypeScript.

## Setup

```bash
npm install
npx playwright install chromium
cp .env.example .env   # then fill in real values
```

## Run

| Command | What it does |
|---|---|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:ui` | Open Playwright UI Mode (best for debugging) |
| `npm run test:smoke` | Run only tests tagged `@smoke` |
| `npm run report` | Open the last HTML report |
| `npm run typecheck` | Check TypeScript types without running tests |

## Documentation

- [`docs/coverage.md`](docs/coverage.md): every feature area, priority and automation status
- [`docs/features/`](docs/features/): one file per automated feature (scenarios, test data, cleanup, bugs found)

## Folder structure

```text
src/                 Reusable framework code (no tests here)
├── pages/           Page Objects: one class per page — locators + actions
├── fixtures/        Our custom `test` that hands page objects to tests
├── data/            Test data: users, plans, courses...
└── utils/           Small helpers (env vars, random names, dates...)

tests/               Test files only (*.spec.ts)
├── setup/           auth.setup.ts: logs in once, saves the session to playwright/.auth/
├── e2e/             UI tests, grouped by feature: auth/, plans/, courses/...
│   └── admin/       Tests that start logged in as admin (reuse the saved session)
└── api/             API tests (added later)
```

Playwright projects (see `playwright.config.ts`):

| Project | Runs | Logged in? |
|---|---|---|
| `setup` | `tests/setup/*.setup.ts` | Creates the admin session |
| `guest` | `tests/e2e/**` except `admin/` | No |
| `admin` | `tests/e2e/admin/**` (runs after `setup`) | Yes, as admin |

Imports use short aliases defined in `tsconfig.json`:
`@fixtures`, `@pages/*`, `@data/*`, `@utils/*`.

## Rules

1. Tests import `test` and `expect` from `@fixtures`, not from `@playwright/test`.
2. Page Objects hold **locators and actions**. Tests hold **assertions**.
3. Locator priority: `getByRole` → `getByLabel` → `getByPlaceholder` → `getByText` → CSS. No XPath.
4. Never hardcode real credentials. Use `.env` locally and CI secrets in pipelines.
5. No `page.waitForTimeout()`. Use web-first assertions (`expect(...).toBeVisible()`), which wait automatically.
6. Each test creates the data it needs and cleans it up. Tests must not depend on each other.
7. Tag tests: `@smoke` (fast, critical), plus a feature tag (`@auth`, `@plans`, `@courses`...).
