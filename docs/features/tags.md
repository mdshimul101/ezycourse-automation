# Tags

## What it does

The admin creates tags and attaches them to students, to group and filter them (e.g. for emails or automations).

## Where

| Item | Value |
|---|---|
| Page | `/dashboard/tags` (admin → Marketing → Tags) |
| Create | "Add Tag" → dialog **CREATE NEW TAG** → Tag Name → **Create** → toast "Tag created successfully" |
| Rename | Row **Edit** → dialog **UPDATE TAG** → **Update** → toast "Tag updated successfully" |
| Delete | Row **Delete** → "Are you sure you want to delete this tag?" → **Delete** → toast "Tag Deleted successfully" |
| Other row action | **View Tagged Students** |
| Server calls | `POST /api/teacher/tags/createTags`, `POST .../editTags/<id>`, `POST .../delete/<id>` |

## Test scenarios

| Scenario | Status | Test |
|---|---|---|
| Admin can create a tag | ✅ | `tests/e2e/tags/tags.spec.ts` |
| Admin can rename a tag | ✅ | `tests/e2e/tags/tags.spec.ts` |
| Admin can delete a tag | ✅ | `tests/e2e/tags/tags.spec.ts` |
| Tag name is required | ⬜ Planned | |
| Tag a student, then "View Tagged Students" shows them | ⬜ Planned (combine with `signedUpStudent`) | |

Run: `npx playwright test --grep @tags`

## Test data & cleanup

- Every test creates its own tag named `Auto Tag <unique>`.
- Tests register every name they create (or rename to) with `cleanupTag(name)`; each one is deleted after the test, even if the test failed.
- The school had **no tags** before automation; after the tests the list is empty again (verified after `--repeat-each=3`).

## Quirks & bugs found

- The textbox in the **UPDATE TAG** dialog has no label (the create dialog's textbox is labelled "Tag Name"). Tests find it as the only textbox in the dialog.
- The delete confirmation dialog has no title; tests find it by its text.
- Delete is sent as `POST .../delete/<id>` rather than an HTTP `DELETE` request.

## Not automated / risks

- Tagging real students — only test students created by `signedUpStudent` should ever be tagged.
