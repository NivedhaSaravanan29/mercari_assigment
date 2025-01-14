import { test, expect } from '@playwright/test';
import Utils from '../testtools/Utils'

const slowExpect = expect.configure({timeout:500000});
test.use({
  ignoreHTTPSErrors:true
})
test.only("Interact with scrollbar", async({ page })=>{
  await page.goto('/')
  await slowExpect(page.getByText('写真から商品を検索してみようカメラやアルバムの写真と似ている商品を検索できます')).toBeVisible()
  await page.getByTestId('tutorial-overlay').click();
await Utils.searchProduct(page,'本・雑誌・漫画','本' ,'コンピュータ・IT')


  await page.getByTestId('カテゴリー').getByLabel('コンピュータ・IT').scrollIntoViewIfNeeded()
  const checkbox = await page.getByTestId('カテゴリー').getByLabel('コンピュータ・IT');
  const isChecked = await checkbox.isChecked();
  expect(isChecked).toBe(true);
});

