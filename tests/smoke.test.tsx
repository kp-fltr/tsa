import { test, expect, Page } from '@playwright/test';

async function ensureAuthenticated(page: Page) {
  await page.goto('/');
  const emailField = page.locator('input[type="email"]').first();
  const isLoginVisible = await emailField.isVisible().catch(() => false);
  if (isLoginVisible) {
    await emailField.fill(process.env.TEST_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_PASSWORD || 'password');
    await page.click('button[type="submit"]');
  }
}

test('can sign in and view client directory', async ({ page }) => {
  await ensureAuthenticated(page);

  // Open Client Management via sidebar button label
  const navButton = page.getByRole('button', { name: /Navigate to Client Management/i });
  if (await navButton.isVisible().catch(() => false)) {
    await navButton.click();
  } else {
    await page.getByText('Client Management', { exact: true }).click();
  }

  // Expect Client Directory header
  await expect(page.getByText('Client Directory')).toBeVisible({ timeout: 10000 });

  // Ensure no error toast is visible
  await expect(page.locator('[data-sonner-toast][data-type="error"]')).toHaveCount(0);
});

test('can open AI chat and start launch flow', async ({ page }) => {
  await ensureAuthenticated(page);

  // Open AI Chat via header button
  await page.getByRole('button', { name: /Ask AI/i }).click();
  await expect(page.locator('[data-testid="ai-chat"]').first()).toBeVisible();

  // Start the launch flow
  await page.getByText('Launch New Test', { exact: true }).click();
  await expect(page.getByText('Select Client')).toBeVisible({ timeout: 5000 });

  // Try to pick a client if options are rendered
  const possibleClient = page.locator('button').filter({ hasText: /@|\./ }).first();
  if (await possibleClient.isVisible().catch(() => false)) {
    await possibleClient.click();
  }

  // Advance by clicking Continue buttons if present
  for (let i = 0; i < 5; i++) {
    const cont = page.getByRole('button', { name: /^Continue$/ });
    if (await cont.isVisible().catch(() => false)) {
      await cont.click();
    }
  }

  // Validate that the flow is active
  await expect(page.getByText(/Launch flow step:|Select Client/)).toBeVisible();
});



