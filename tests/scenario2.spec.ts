import { test, expect } from '@playwright/test';
import Utils from '../testtools/Utils'

const slowExpect = expect.configure({timeout:500000});
test.use({
  ignoreHTTPSErrors:true
})
test.only("Search history 1 ", async({ page })=>{
  await page.goto('/')
  await slowExpect(page.getByText('写真から商品を検索してみようカメラやアルバムの写真と似ている商品を検索できます')).toBeVisible()
  await page.getByTestId('tutorial-overlay').click();
  // 1. creating search history 1
  await Utils.searchProduct(page,'本・雑誌・漫画','本' ,'絵本・児童書')
  await page.goto('/')
  // 2. creating search history 2
  await Utils.searchProduct(page,'本・雑誌・漫画','本' ,'コンピュータ・IT')
  await page.goto('/')


  // 3. searching for javascript
  await page.getByPlaceholder('なにをお探しですか？').fill('javascript');  
  await page.getByPlaceholder('なにをお探しですか？').press('Enter');
  await page.waitForTimeout(3000)
  await page.goto('/')

  await page.getByPlaceholder('なにをお探しですか？').click();
  await page.waitForTimeout(3000)
  // 4. check the search  bar
  slowExpect(page.getByRole('heading', { name: '検索履歴' })).toBeVisible()
  // 5. check for history count
  slowExpect(await page.getByTestId('search-history').getByRole('listitem').count()).toBe(3)
  slowExpect( page.getByTestId('search-history').getByRole('link', { name: 'javascript' })).toBeVisible();
});



