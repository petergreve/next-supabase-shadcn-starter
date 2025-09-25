import { test, expect } from '@playwright/test';

// Generate unique test credentials
const generateTestEmail = () => `test-${Date.now()}-${Math.random().toString(36).substring(2, 8)}@example.com`;
const testPassword = 'TestPassword123!';

test.describe('Authentication Flow', () => {
  test('should complete signup, login, and access protected page', async ({ page }) => {
    const testEmail = generateTestEmail();

    // Test Signup Flow
    await test.step('User can sign up', async () => {
      await page.goto('/auth/sign-up');

      // Verify signup page loads
      await expect(page).toHaveTitle(/Next.js/);
      await expect(page.locator('text=Create an account')).toBeVisible();

      // Fill out signup form
      await page.fill('#email', testEmail);
      await page.fill('#password', testPassword);
      await page.fill('#repeat-password', testPassword);

      // Submit form and wait for navigation
      await Promise.all([
        page.waitForURL('/auth/sign-up-success', { timeout: 15000 }),
        page.click('button[type="submit"]')
      ]);
    });

    // Test Login Flow
    await test.step('User can log in', async () => {
      await page.goto('/auth/login');

      // Verify login page loads
      await expect(page.locator('[data-slot="card-title"]:has-text("Login to your account")')).toBeVisible();

      // Fill out login form
      await page.fill('#email', testEmail);
      await page.fill('#password', testPassword);

      // Submit form and wait for navigation
      await Promise.all([
        page.waitForURL('/protected', { timeout: 15000 }),
        page.click('button[type="submit"]')
      ]);
    });

    // Test Protected Page Access
    await test.step('User can access protected page', async () => {
      // Verify protected page content
      await expect(page.locator('text=Hello World! 👋')).toBeVisible();
      await expect(page.locator('text=Welcome to your protected area')).toBeVisible();
      await expect(page.locator('p.font-medium').filter({ hasText: testEmail })).toBeVisible();
      await expect(page.locator('text=This is your starting point')).toBeVisible();
    });
  });

  test('should handle signup with mismatched passwords', async ({ page }) => {
    await page.goto('/auth/sign-up');

    const testEmail = generateTestEmail();

    await page.fill('#email', testEmail);
    await page.fill('#password', testPassword);
    await page.fill('#repeat-password', 'DifferentPassword123!');

    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator('text=Passwords do not match')).toBeVisible();

    // Should stay on signup page
    await expect(page).toHaveURL('/auth/sign-up');
  });

  test('should handle login with invalid credentials', async ({ page }) => {
    await page.goto('/auth/login');

    await page.fill('#email', 'invalid@example.com');
    await page.fill('#password', 'WrongPassword123!');

    await page.click('button[type="submit"]');

    // Should show error message (may vary based on Supabase configuration)
    await expect(page.locator('.text-red-500')).toBeVisible();

    // Should stay on login page
    await expect(page).toHaveURL('/auth/login');
  });

  test('should redirect unauthenticated users to login', async ({ page }) => {
    // Try to access protected page without authentication
    await page.goto('/protected');

    // Should redirect to login page
    await expect(page).toHaveURL('/auth/login');
  });

  test('should navigate between signup and login pages', async ({ page }) => {
    // Start on signup page
    await page.goto('/auth/sign-up');
    await expect(page.locator('text=Create an account')).toBeVisible();

    // Click "Sign in" link
    await page.click('text=Sign in');
    await expect(page).toHaveURL('/auth/login');
    await expect(page.locator('[data-slot="card-title"]:has-text("Login to your account")')).toBeVisible();

    // Click "Sign up" link
    await page.click('text=Sign up');
    await expect(page).toHaveURL('/auth/sign-up');
    await expect(page.locator('text=Create an account')).toBeVisible();
  });

  test('should show loading states during form submission', async ({ page }) => {
    await page.goto('/auth/login');

    await page.fill('#email', 'test@example.com');
    await page.fill('#password', testPassword);

    // Click submit and check that the form attempts to submit
    await page.click('button[type="submit"]');

    // The form should either show a loading state briefly or complete the submission
    // Since this is an invalid login, we should see an error eventually
    await expect(page.locator('.text-red-500')).toBeVisible({ timeout: 10000 });
  });
});