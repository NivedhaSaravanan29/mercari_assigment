import { test, expect } from '@playwright/test';
import Utils from '../testtools/Utils'

const slowExpect = expect.configure({timeout:500000});
test.use({
  ignoreHTTPSErrors:true
})
test.only("Interact with scrollbar", async({ page })=>{
  await page.goto('/') //Go to Mercari top page (https://jp.mercari.com/)
  await slowExpect(page.getByText('写真から商品を検索してみようカメラやアルバムの写真と似ている商品を検索できます')).toBeVisible() //Click on "Select by category" (カテゴリーからさがす)
  await page.getByTestId('tutorial-overlay').click();
await Utils.searchProduct(page,'本・雑誌・漫画','本' ,'コンピュータ・IT') //Select "Books, Magazines & Comics" as the tier 1 category (本・雑誌・漫画),"Books" as the tier 2 category (本), Select "Computers & Technology" as the tier 3 category (コンピュータ/IT)


  await page.getByTestId('カテゴリー').getByLabel('コンピュータ・IT').scrollIntoViewIfNeeded()
  const checkbox = await page.getByTestId('カテゴリー').getByLabel('コンピュータ・IT');
  const isChecked = await checkbox.isChecked(); //Verify the search conditions on the left sidebar are set correctly
  expect(isChecked).toBe(true);
});

