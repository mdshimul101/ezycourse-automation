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

The layout follows the community app's suite in `AppifyLab/ezy-web` (`apps/community/tests`).

```text
src/                         Reusable framework code (no tests here)
├── config/global-config.ts  Every setting in one object: base URL, admin credentials, session paths
├── pages/<feature>/         Page objects, split in two:
│   ├── locators/<feature>.locator.ts       WHERE things are: Locator fields + row(name)-style methods
│   └── controllers/<feature>.controller.ts WHAT the user does: goto(), create(), delete()...
├── fixtures/                Our custom `test` that hands locators, controllers and cleanup helpers to tests
├── data/                    Test data builders: students, tags, categories...
└── utils/                   Small helpers (env vars, random names...)

tests/e2e/                   Test files only, one folder per feature
├── setup/auth.setup.ts      Logs in once, saves the session to playwright/.auth/
├── login/  signup/  dashboard/  students/  course-categories/  blog-categories/  tags/
```

Playwright projects (see `playwright.config.ts`):

| Project | Runs | Logged in? |
|---|---|---|
| `setup` | `tests/e2e/setup/*.setup.ts` | Creates the admin session |
| `guest` | tests tagged `@guest` | No |
| `admin` | every other test (runs after `setup`) | Yes, as admin |

Imports use short aliases defined in `tsconfig.json`:
`@fixtures`, `@configs/*`, `@pages/*`, `@data/*`, `@utils/*`.

## Adding a feature

1. `src/pages/<feature>/locators/<feature>.locator.ts`: class `<Feature>Locator`, fields grouped with `// ===== Section =====` comments.
2. `src/pages/<feature>/controllers/<feature>.controller.ts`: class `<Feature>Controller`, builds its own locator, has `goto()` and the actions.
3. Register `<feature>Locator` and `<feature>Controller` fixtures (plus a `cleanup<Thing>` fixture if the test creates data) in `src/fixtures/index.ts`.
4. `tests/e2e/<feature>/<feature>.spec.ts` with test IDs in titles: `TC_<FEATURE>_01: ...`.
5. A `docs/features/<feature>.md` page, and update `docs/coverage.md`.

## Rules

1. Tests import `test` and `expect` from `@fixtures`, not from `@playwright/test`.
2. Controllers hold **actions**, locators hold **selectors**. Tests hold **assertions** (on locators).
3. Locator priority: `getByRole` → `getByLabel` → `getByPlaceholder` → `getByText` → CSS. No XPath.
4. Never hardcode real credentials. Use `.env` locally and CI secrets in pipelines.
5. No `page.waitForTimeout()`. Use web-first assertions (`expect(...).toBeVisible()`), which wait automatically.
6. Each test creates the data it needs and cleans it up. Tests must not depend on each other.
7. Tag tests: `@smoke` (fast, critical), plus a feature tag (`@auth`, `@tags`, `@students`...).
   Tests that must run logged out also get `@guest`; without it a test runs as admin.
8. Test titles start with an ID: `TC_<FEATURE>_<NN>: ...` (e.g. `TC_TAG_01`). Never reuse an ID.
