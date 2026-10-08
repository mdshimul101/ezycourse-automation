# Authentication — Login & Signup

## What it does

- Visitors log in or sign up as students on the school site.
- The school admin uses the **same login page**; after login an admin lands on the admin dashboard.

## Where

| Page | URL | Server call |
|---|---|---|
| Login | `/en/login` | `POST /api/student/auth/login` (used by students **and** admin, despite the name) |
| Signup | `/en/signup` | `POST /api/student/auth/register` |
| Admin landing page | `/dashboard` | — |
| Student landing page | `/student/dashboard` | — |

## Test scenarios

| Scenario | Status | Test |
|---|---|---|
| Login page shows the sign-in form | ✅ `@smoke` | `tests/e2e/login/login.spec.ts` |
| Invalid credentials show "Invalid credentials" | ✅ | `tests/e2e/login/login.spec.ts` |
| New student can sign up and lands on the student dashboard | ✅ | `tests/e2e/signup/student-signup.spec.ts` |
| Empty signup form shows an error for every field | ✅ | `tests/e2e/signup/signup-validation.spec.ts` |
| Password shorter than 6 characters is rejected | ✅ | `tests/e2e/signup/signup-validation.spec.ts` |
| Existing email is rejected ("This email already exists") | ✅ | `tests/e2e/signup/student-signup.spec.ts` |
| Admin logs in once; session reused by admin tests | ✅ | `tests/e2e/setup/auth.setup.ts` |
| Forgot password link opens the reset page | ⬜ Practice task | |
| First name with 1 character is rejected | ⬜ Practice task | |

## Test data & cleanup

- Admin credentials come from `.env` (`TEST_USER_EMAIL`, `TEST_USER_PASSWORD`), never from code.
- Negative login tests use a fake account (`not-a-real-user@example.com`) so the real account is never locked out.
- Validation tests (`tests/e2e/signup/signup-validation.spec.ts`) never create an account, so they are tagged `@guest` and run logged out with no cleanup.
- Tests that create a student (`tests/e2e/signup/student-signup.spec.ts`) sign up in a logged-out browser (`guestSignupController`)
  and register the email with `cleanupStudent(email)`. After the test the admin session permanently deletes it.
  They have no `@guest` tag, so they run in the admin project: the cleanup needs the admin session.
- Created students are named `Auto Student` with `auto.signup.<unique>@example.com` emails.
  On 2026-10-07 all older leftovers were deleted; only real students remain.
- The saved admin session (`playwright/.auth/admin.json`) is git-ignored; it works like a password.

## Quirks & bugs found

- The signup email field has no label, only a placeholder (`email@example.com`). Screen readers cannot announce it properly. Tests use `getByPlaceholder` for this one field.
- Signup has no email verification: new students are logged in immediately.
- The login API path contains `student` even for admin logins, which is easy to misread while debugging.

## Not automated / risks

- Real admin login runs only locally for now; CI has no admin credentials yet (they must go into GitHub Secrets).
