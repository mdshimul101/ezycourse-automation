# Automation Coverage — EzyCourse School

The big picture: every feature area, its priority, and how far automation has got.
Details for each automated feature live in [`features/`](features/).

Test school: `BASE_URL` in `.env`. Admin area explored read-only on 2026-10-07:
110 admin pages opened, all returned HTTP 200, no data changed.

## Coverage status

| # | Feature | Scope | Status | Details |
|---|---|---|---|---|
| — | Login & Signup (public) | Login form, invalid login, student signup + validation | ✅ Automated | [auth.md](features/auth.md) |
| — | Admin login session | Log in once, reuse session for admin tests | ✅ Automated | [auth.md](features/auth.md) |
| 1 | Course Categories | Create, rename, delete with cleanup | ✅ Automated | [course-categories.md](features/course-categories.md) |
| 2 | Students | Signed-up student appears in admin, then delete (cleans up signup tests) | ⬜ Planned | |
| 3 | Tags, Blog Categories, Coupons | Same CRUD pattern as categories | ⬜ Planned | |
| 4 | Courses | Create draft course → verify → delete | ⬜ Planned | |
| 5 | Key admin pages | Read-only smoke: page loads and shows its heading | ⬜ Planned | |
| 6 | Orders, Checkout, Automation | Only with a test plan agreed with the lead | ⏸ Later | |

A feature gets its own file in `features/` when work on it starts.

## Feature areas (admin, paths under `/dashboard`)

| Area | Pages | Notes |
|---|---|---|
| Dashboard & Analytics | `/`, `/analytics`, `/analytics/realtime-analytics`, `/analytics/students-history`, `/analytics/course-insights` | Stats and recent student activity |
| Site builder | `/pages`, `/site-menu`, `/banners`, `/variables`, `/color-schema`, `/custom-css`, `/global-javascript`, `/global-js-script`, `/settings/fonts`, `/language` | Affects the public site |
| Courses | `/mycourses`, `/category`, `/certificates`, `/certificate-blueprints`, `/question-bank`, `/import-questions`, `/quiz-submissions`, `/assignment`, `/surveys`, `/reviews` | Core business feature |
| Coaching | `/coaching/coaching-programs`, `/coaching/library`, `/coaching/categories`, `/coaching/quiz-submissions` | |
| Products | `/products?is_digital=1`, `/products?is_digital=0`, `/products/categories` | |
| Booking & live | `/appointments`, `/event-create`, `/meeting` | |
| Community | `/communities`, `/groups`, `/private-chat-settings` | |
| Media | `/video-gallery`, `/video-category` (`?is_audio=1` for audio) | |
| People | `/students`, `/admin-user`, `/role-manager`, `/revenue_share`, `/b2b-users` | |
| Sales | `/orders`, `/coupons`, `/upsells`, `/one-click-upsells`, `/bonus-items`, `/preorders`, `/manual-orders`, `/requests`, `/magic-checkouts/statistics` | Money involved |
| Marketing | `/custom-forms`, `/advanced-form-builder`, `/email-templates`, `/automation-workflows`, `/tags`, `/email/statistics` | Campaigns, affiliates, push are upgrade-locked |
| Marketplace (add-on) | `/myaddons/marketplace/*` | |
| Blog | `/blogs`, `/blogs/categories`, `/blogs/membership-*-pricing` | |
| Settings | `/settings`, `/global-settings`, `/settings/checkout`, `/email`, `/settings/email`, `/settings/student-dashboard-settings`, `/settings/login-sessions`, `/gamification`, `/redirect-url`, `/web-hook/*` | Site-wide impact |

## Site-wide observations

- There is no "Manage Plans" page in a school admin. That flow belongs to the EzyStudio agency dashboard.
- Most admin lists are empty ("No Data"), which makes create → verify → delete tests simple.
- Sidebar links have no accessible names ("Sidebar item", "Dropdown item"). Tests navigate by URL, not by clicking the menu.

## Never automate blindly

| Page / action | Risk |
|---|---|
| Login Sessions → Force Logout | Logs out the test session; later tests fail |
| Purge All Cache | Affects real visitors |
| Pre-Orders → Charge All | Charges real customers |
| General / Global / Checkout settings → Save | Changes how the whole school works |
| Custom CSS / Global JS → Save | Can break every page |
| Students → Magic Login, Sellers → Delete permanently | Impersonation, unrecoverable deletes |
