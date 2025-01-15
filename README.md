AUTOMATION ASSESSMENT FOR MERCARI USING PLAYWRIGHT:
The repository has tests automted for the below two scenarios using Playwright. To start with, playwright has to installed in Visual code and the package in the repository has to be pulled.
Scenario 1:

File name: scenario1.spec.ts

Run command: npx playwright test scenario1.spec.ts

Steps:
1. Go to Mercari top page (https://jp.mercari.com/)
2. Click on the search bar
3. Click on "Select by category" (カテゴリーからさがす)
4. Select "Books, Magazines & Comics" as the tier 1 category (本・雑誌・漫画)
5. Select "Books" as the tier 2 category (本)
6. Select "Computers & Technology" as the tier 3 category (コンピュータ/IT)
7. Verify the search conditions on the left sidebar are set correctly



Scenario 2:

File name: scenario2.spec.ts

Run command: npx playwright test scenario2.spec.ts

Steps:
1. Go to Mercari top page (https://jp.mercari.com/)
2. Click on the search bar
2. Verify there are 2 browsing histories
3. Verify the latest browsing history is showing correctly (Computers & Technology / コンピュータ/IT)
4. Click on the latest browsing histories
5. Verify the search conditions on the left sidebar are set correctly
6. Input "javascript" in the search bar and search with the keyword
7. Go back to Mercari top page (https://jp.mercari.com/)
8. Verify there are 3 browsing histories
9. Verify the latest browsing history is showing correctly (javascript, Computers & Technology / javascript, コンピュータ/IT)
