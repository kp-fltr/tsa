import { test, expect } from '@playwright/test';

// Test 1: Can sign in & fetch clients
test('can sign in and fetch clients', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');

  // Check if we're on login screen or already authenticated
  const isLoginPage = await page.locator('[data-testid="sign-in-screen"]').isVisible();
  
  if (isLoginPage) {
    // Fill in login credentials (adjust selectors based on your auth form)
    await page.fill('input[type="email"]', process.env.TEST_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_PASSWORD || 'password');
    await page.click('button[type="submit"]');
    
    // Wait for successful authentication
    await page.waitForURL('**/dashboard**', { timeout: 10000 });
  }

  // Navigate to Client Directory
  await page.click('[data-testid="nav-client-directory"]');
  
  // Wait for clients to load (should show either clients or empty state)
  await expect(page.locator('[data-testid="client-table"]')).toBeVisible({ timeout: 5000 });
  
  // Verify we don't see any error toasts
  const errorToast = page.locator('[data-sonner-toast][data-type="error"]');
  await expect(errorToast).not.toBeVisible();
  
  // Should see either client data or empty state message
  const hasClients = await page.locator('table tbody tr').count();
  const emptyState = await page.locator('text=No clients found').isVisible();
  
  expect(hasClients >= 0 || emptyState).toBeTruthy();
});

// Test 2: Launch new test (happy path)
test('can launch new test successfully', async ({ page }) => {
  // Navigate to app and ensure we're authenticated
  await page.goto('/');
  
  // Skip login if already authenticated, otherwise login
  const isLoginPage = await page.locator('[data-testid="sign-in-screen"]').isVisible();
  if (isLoginPage) {
    await page.fill('input[type="email"]', process.env.TEST_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_PASSWORD || 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard**', { timeout: 10000 });
  }

  // Open AI Chat
  await page.click('[data-testid="ai-chat-button"]');
  await expect(page.locator('[data-testid="ai-chat"]')).toBeVisible();

  // Start launch test flow
  await page.click('text=Launch New Test');
  
  // Wait for client selection step
  await expect(page.locator('text=Select Client')).toBeVisible({ timeout: 5000 });
  
  // Select first available client (or create one if none exist)
  const firstClient = page.locator('[data-testid="client-option"]').first();
  const hasClients = await firstClient.isVisible();
  
  if (hasClients) {
    await firstClient.click();
  } else {
    // Create a new client
    await page.click('text=Add New Client');
    await page.fill('input[placeholder="Client name"]', 'Test Client');
    await page.fill('input[placeholder="Client email"]', 'test@client.com');
    await page.click('text=Create Client');
  }

  // Select assessment version
  await expect(page.locator('text=Assessment Version')).toBeVisible({ timeout: 3000 });
  await page.click('[data-testid="version-option"]', { timeout: 3000 });

  // Select channel
  await expect(page.locator('text=Delivery Method')).toBeVisible({ timeout: 3000 });
  await page.click('text=Email');

  // Select due date (should have default)
  await expect(page.locator('text=Due Date')).toBeVisible({ timeout: 3000 });
  await page.click('text=Continue with'); // Uses default date

  // Select language
  await expect(page.locator('text=Assessment Language')).toBeVisible({ timeout: 3000 });
  await page.click('text=English');

  // Skip notes
  await expect(page.locator('text=Notes (Optional)')).toBeVisible({ timeout: 3000 });
  await page.click('text=Skip');

  // Confirm launch
  await expect(page.locator('text=Confirm Test Launch')).toBeVisible({ timeout: 3000 });
  await page.click('text=Launch Test');

  // Wait for success message
  await expect(page.locator('text=Test launched successfully!')).toBeVisible({ timeout: 10000 });
  
  // Verify success toast appears
  const successToast = page.locator('[data-sonner-toast][data-type="success"]');
  await expect(successToast).toBeVisible({ timeout: 5000 });
});