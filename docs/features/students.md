# Students

## What it does

The admin sees every student of the school, can search and filter them, and can manage or delete their accounts.

## Where

| Item | Value |
|---|---|
| Page | `/dashboard/students` (admin → People → Students) |
| Search | Textbox "Student name or email" + Enter → `GET /api/teacher/student/getAllStudent?str=<text>` |
| Row actions | Enable Chat, Info, Enrollments, Magic Login, **More** |
| More menu | Login Sessions, Logout Sessions, Password Reset Email, Send Magic Login, Delete Payment Methods, Delete User |
| Delete | More → **Delete User** → dialog **"Are you sure?"** → choose **Soft Delete** or **Permanent Delete** → **Delete** → toast "Account Deleted Permanently" |
| Server call | `POST /api/teacher/student/deleteStudent` with `{"id": …, "delete_type": "permanent"}` |

## Test scenarios

| Scenario | Status | Test |
|---|---|---|
| A student who signs up appears in the admin students list | ✅ | `tests/e2e/students/students.spec.ts` |
| Admin can permanently delete a student | ✅ | `tests/e2e/students/students.spec.ts` |
| Delete without choosing Soft/Permanent | ⬜ Planned (what does the site do?) | |
| Soft delete, then recover the student | ⬜ Planned | |
| Search by name / filters (product, tags, joining date) | ⬜ Planned | |

Run: `npx playwright test --grep @students`

## Test data & cleanup

- The `signedUpStudent` fixture signs up a brand-new student through the real signup page (via `guestSignupController`),
  in a separate logged-out browser, and **permanently deletes the student after the test, even if it failed**.
- Verified: after 4 runs, no students created by these tests were left behind.
- Only ever delete students whose email starts with `auto.signup` and ends with `@example.com`.
  **Never touch real students** (e.g. "Test User Four", "Test User Five", "Etc. Etc.").
- Signup tests that create accounts use the same cleanup (`cleanupStudent`); see [auth.md](auth.md).

## Quirks & bugs found

- Neither "Soft Delete" nor "Permanent Delete" is pre-selected in the delete dialog.
- The browser's "load" event on this page can take over 30 seconds (background widgets), although the page is usable after ~2 seconds.
  Controllers therefore navigate with `waitUntil: 'domcontentloaded'` and then wait for a specific element.

## Not automated / risks

- **Magic Login**, **Send Magic Login**, **Password Reset Email**: impersonation or real emails — not automated.
- **Logout Sessions** on a real student logs them out — not automated.
- **Delete Payment Methods** affects real billing — not automated.
