import { test as base, type Page } from '@playwright/test';
import { buildNewStudent, type NewStudent } from '@data/students';
import { BlogCategoriesController } from '@pages/blog-categories/controllers/blog-categories.controller';
import { BlogCategoriesLocator } from '@pages/blog-categories/locators/blog-categories.locator';
import { CourseCategoriesController } from '@pages/course-categories/controllers/course-categories.controller';
import { CourseCategoriesLocator } from '@pages/course-categories/locators/course-categories.locator';
import { DashboardController } from '@pages/dashboard/controllers/dashboard.controller';
import { DashboardLocator } from '@pages/dashboard/locators/dashboard.locator';
import { LoginController } from '@pages/login/controllers/login.controller';
import { LoginLocator } from '@pages/login/locators/login.locator';
import { SignupController } from '@pages/signup/controllers/signup.controller';
import { SignupLocator } from '@pages/signup/locators/signup.locator';
import { StudentsController } from '@pages/students/controllers/students.controller';
import { StudentsLocator } from '@pages/students/locators/students.locator';
import { TagsController } from '@pages/tags/controllers/tags.controller';
import { TagsLocator } from '@pages/tags/locators/tags.locator';

type Fixtures = {
  loginLocator: LoginLocator;
  loginController: LoginController;
  signupLocator: SignupLocator;
  signupController: SignupController;
  dashboardLocator: DashboardLocator;
  dashboardController: DashboardController;
  courseCategoriesLocator: CourseCategoriesLocator;
  courseCategoriesController: CourseCategoriesController;
  cleanupCategory: (name: string) => void;
  blogCategoriesLocator: BlogCategoriesLocator;
  blogCategoriesController: BlogCategoriesController;
  cleanupBlogCategory: (name: string) => void;
  studentsLocator: StudentsLocator;
  studentsController: StudentsController;
  tagsLocator: TagsLocator;
  tagsController: TagsController;
  cleanupTag: (name: string) => void;
  guestPage: Page;
  guestSignupLocator: SignupLocator;
  guestSignupController: SignupController;
  cleanupStudent: (email: string) => void;
  signedUpStudent: NewStudent;
};

/**
 * Our own `test`: same as Playwright's, plus ready-made locators, controllers and test data.
 * Tests ask for `{ loginController }` instead of writing `new LoginController(page)` every time.
 * Controllers do the actions; tests assert on locators.
 */
export const test = base.extend<Fixtures>({
  loginLocator: async ({ page }, use) => {
    await use(new LoginLocator(page));
  },
  loginController: async ({ page }, use) => {
    await use(new LoginController(page));
  },
  signupLocator: async ({ page }, use) => {
    await use(new SignupLocator(page));
  },
  signupController: async ({ page }, use) => {
    await use(new SignupController(page));
  },
  dashboardLocator: async ({ page }, use) => {
    await use(new DashboardLocator(page));
  },
  dashboardController: async ({ page }, use) => {
    await use(new DashboardController(page));
  },
  courseCategoriesLocator: async ({ page }, use) => {
    await use(new CourseCategoriesLocator(page));
  },
  courseCategoriesController: async ({ page }, use) => {
    await use(new CourseCategoriesController(page));
  },

  /** Call `cleanupCategory(name)` for every category a test creates (or renames to); it is deleted after the test. */
  cleanupCategory: async ({ courseCategoriesController }, use) => {
    const names: string[] = [];
    await use((name) => {
      names.push(name);
    });
    for (const name of names) {
      await courseCategoriesController.deleteIfExists(name);
    }
  },
  blogCategoriesLocator: async ({ page }, use) => {
    await use(new BlogCategoriesLocator(page));
  },
  blogCategoriesController: async ({ page }, use) => {
    await use(new BlogCategoriesController(page));
  },

  /** Call `cleanupBlogCategory(name)` for every blog category a test creates (or renames to); it is deleted after the test. */
  cleanupBlogCategory: async ({ blogCategoriesController }, use) => {
    const names: string[] = [];
    await use((name) => {
      names.push(name);
    });
    for (const name of names) {
      await blogCategoriesController.deleteIfExists(name);
    }
  },
  studentsLocator: async ({ page }, use) => {
    await use(new StudentsLocator(page));
  },
  studentsController: async ({ page }, use) => {
    await use(new StudentsController(page));
  },
  tagsLocator: async ({ page }, use) => {
    await use(new TagsLocator(page));
  },
  tagsController: async ({ page }, use) => {
    await use(new TagsController(page));
  },

  /** Call `cleanupTag(name)` for every tag a test creates (or renames to); it is deleted after the test. */
  cleanupTag: async ({ tagsController }, use) => {
    const names: string[] = [];
    await use((name) => {
      names.push(name);
    });
    for (const name of names) {
      await tagsController.deleteIfExists(name);
    }
  },

  /** A logged-out browser tab, separate from the test's own `page` (which may be logged in as admin). */
  guestPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    await use(await context.newPage());
    await context.close();
  },
  guestSignupLocator: async ({ guestPage }, use) => {
    await use(new SignupLocator(guestPage));
  },
  guestSignupController: async ({ guestPage }, use) => {
    await use(new SignupController(guestPage));
  },

  /**
   * Call `cleanupStudent(email)` for every student a test creates.
   * After the test (even a failed one) each of them is permanently deleted.
   * Admin tests only: the cleanup needs the admin session.
   */
  cleanupStudent: async ({ studentsController }, use) => {
    const emails: string[] = [];
    await use((email) => {
      emails.push(email);
    });
    for (const email of emails) {
      await studentsController.deleteIfExists(email);
    }
  },

  /** A brand-new student who signed up through the real signup page. Deleted after the test. */
  signedUpStudent: async ({ guestPage, guestSignupController, cleanupStudent }, use) => {
    const student = buildNewStudent();
    cleanupStudent(student.email);
    await guestSignupController.goto();
    await guestSignupController.signup(student);
    await guestPage.waitForURL(/\/student\/dashboard/);
    await use(student);
  },
});

export { expect } from '@playwright/test';
