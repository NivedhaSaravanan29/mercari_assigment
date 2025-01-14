import {  expect, Page } from '@playwright/test';

const slowExpect = expect.configure({ timeout: 500000 });

export default class Utils {


    public static async searchProduct(page: Page, productName: string, subCategory1: string, subcategory2: string) {
        await page.goto('/');
        const expectedURL = page.url() + 'categories';       
        await page.getByPlaceholder('なにをお探しですか？').click();
        await slowExpect(page.getByRole('link', { name: 'カテゴリーからさがす' })).toBeVisible()
        await page.getByRole('link', { name: 'カテゴリーからさがす' }).click();
        await page.waitForURL(expectedURL)
        await page.waitForTimeout(5000)
        await slowExpect(page.getByRole('heading', { name: 'カテゴリー' })).toBeVisible()

        await page.getByRole('link', { name: productName }).click();
        await slowExpect(page.getByRole('heading', { name:productName })).toBeVisible()
        await slowExpect(page.getByTestId('category-list').getByRole('link', { name: subCategory1 })).toBeVisible()
        await page.getByTestId('category-list').getByRole('link', { name: subCategory1 }).click();
        await slowExpect(await page.getByRole('heading', { name: subCategory1 })).toBeVisible()
        await page.getByRole('link', { name: subcategory2 }).scrollIntoViewIfNeeded()
        await page.getByRole('link', { name: subcategory2 }).click();
        await slowExpect(page.getByTestId('カテゴリー')).toBeVisible()

    }
}