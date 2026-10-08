# Blog Categories

## What it does

The admin groups blog posts into categories (and sub-categories) so readers can browse them.

## Where

| Item | Value |
|---|---|
| Page | `/dashboard/blogs/categories` (admin → Blog → Categories) |
| Create | "Add Category" → dialog **ADD A CATEGORY** → Category Name + Short description → **Create** → toast "Category created successfully" |
| Rename | Row "⋮" → **Edit** → dialog **EDIT CATEGORY** → **Update** → toast "Category updated successfully" |
| Delete | Row "⋮" → **Delete** → "Are you sure? Category with Id … will be deleted" → **Delete** → toast "1 category deleted" |
| Other row actions | **Add Sub Category**, **View Sub Category** |
| Server calls | `POST /api/teacher/blog-categories/create`, `.../delete`, list: `GET .../get-list?page=1&page_size=10` |

## Test scenarios

| Scenario | Status | Test |
|---|---|---|
| Admin can create a blog category | ✅ | `tests/e2e/blog-categories/blog-categories.spec.ts` |
| Admin can rename a blog category | ✅ | `tests/e2e/blog-categories/blog-categories.spec.ts` |
| Admin can delete a blog category | ✅ | `tests/e2e/blog-categories/blog-categories.spec.ts` |
| Short description is required | ✅ | `tests/e2e/blog-categories/blog-categories.spec.ts` |
| Add / view sub-category | ⬜ Planned | |

Run: `npx playwright test --grep @blog-categories`

## Test data & cleanup

- Every test creates its own category named `Auto Blog Category <unique>` with the description "Created by automation".
- Tests register every name they create (or rename to) with `cleanupBlogCategory(name)`; each one is deleted after the test, even if the test failed.
- The school had **no blog categories** before automation; after the tests the list is empty again (verified after `--repeat-each=5`).

## Quirks & bugs found

- **Short description is required**, but the form does not mark it as required. Submitting without it shows "Please enter a short description!".
- The row actions button ("⋮") has no accessible name, same as Course Categories. Tests use `.ant-dropdown-trigger` scoped to the row.
- The delete confirmation dialog has no title; tests find it by its text "Are you sure?".
- Under parallel load the list re-fetch after a change took **9s** (2026-10-08). The app was correct, but Playwright's 5s
  assertion default failed. The project's assertion timeout is now 15s (`playwright.config.ts`).
- The page heading is just "Categories", the same word as Course Categories; tests match it as a level-1 heading on this URL.

## Not automated / risks

- Assigning categories to real blog posts — not automated until we create our own test post.
