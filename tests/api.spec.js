import { test, expect } from '@playwright/test';

test('Retrieve single post', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.userId).toBe(1);
    expect(json.id).toBe(1);
    expect(json.title).toBeTruthy();
});

