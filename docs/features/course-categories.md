# Course Categories

## What it does

The admin groups courses into categories (and sub-categories) so students can browse them.

## Where

| Item | Value |
|---|---|
| Page | `/dashboard/category` (admin → Courses → Categories) |
| Create | "Add Category" → dialog **ADD A CATEGORY** → Name → **Create** → toast "Category Added Successfully" |
| Rename | Row "⋮" → **Edit** → dialog **EDIT CATEGORY** → **Update** → toast "Category Updated Successfully" |
| Delete | Row "⋮" → **Delete** → "Are you sure? Category with Id … will be deleted" → **Delete** → toast "1 category deleted" |
| Server calls | `POST /api/teacher/category/createNewCategory`, `.../updateCategory`, `.../deleteMultipleCategory` |

## Test scenarios

| Scenario | Status | Test |
|---|---|---|
| Admin can create a course category | ✅ | `tests/e2e/course-categories/course-categories.spec.ts` |
| Admin can rename a course category | ✅ | `tests/e2e/course-categories/course-categories.spec.ts` |
| Admin can delete a course category | ✅ | `tests/e2e/course-categories/course-categories.spec.ts` |
| Category name is required | ⬜ Practice task | |
| Add / view sub-category | ⬜ Planned | |
| Upload a category image | ⬜ Planned | |

Run: `npx playwright test --grep @categories`

## Test data & cleanup

- Every test creates its own category named `Auto Category <unique>`, so tests never collide when running in parallel.
- Tests register every name they create (or rename to) with `cleanupCategory(name)`; each one is deleted after the test, even if the test failed halfway.
- **Never touch "Test Category" (ID 6517)** — it existed before automation.
- Verified: after `--repeat-each=3`, only "Test Category" remained.

## Quirks & bugs found

- The row actions button ("⋮") has no accessible name. Tests use a CSS selector scoped to the row (`.ant-dropdown-trigger`).
  Suggestion for devs: add `aria-label="Actions"` — fixes accessibility and gives tests a stable locator.
- The delete confirmation dialog has no title (no accessible name); tests find it by its text "Are you sure?".
- The Add dialog says images up to 100MB; the Edit dialog says 2MB. Possible inconsistency to confirm with the team.
- The delete request sends the category ID in a field called `user_ids`, which is misleading for anyone debugging the API.

## Not automated / risks

- "Add Courses" to a category changes real courses — not automated until we create our own test course.
