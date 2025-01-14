import { test, expect } from '@playwright/test';
import Utils from '../testtools/Utils'

const slowExpect = expect.configure({timeout:500000});
test.use({
  ignoreHTTPSErrors:true
})
test.only("Interact with scrollbar", async({ page })=>{
await Utils.searchProduct(page,'本・雑誌・漫画','本' ,'コンピュータ・IT')

// ///////////////////////////////////////////////////////////////////////////////
//   // // Get the active descendant of the combobox (the selected option)
//   // const selectedOption = await page.getByRole('combobox').nth(1).getAttribute('aria-activedescendant');
//   // // Print the selected option ID
//   // console.log(selectedOption);

//   // // Now, get the option text content for the selected option
//   // const selectedOptionText = await page.locator(`#${selectedOption}`).innerText();
//   // console.log('Selected option text:', selectedOptionText);
//   /////////////////////////////////////////////////////////////////////////////////////////////////////

const selectedOptionText2 = await page.getByRole('combobox').nth(1).locator('option[value="5"]').elementHandles()
   console.log(await selectedOptionText2.getProperty('selected'))
  await page.pause()
  await page.getByTestId('カテゴリー').getByLabel('コンピュータ・IT').scrollIntoViewIfNeeded()
  const checkbox = await page.getByTestId('カテゴリー').getByLabel('コンピュータ・IT');
  const isChecked = await checkbox.isChecked();
  expect(isChecked).toBe(true);
});

