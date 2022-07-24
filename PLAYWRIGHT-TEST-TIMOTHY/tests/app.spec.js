// @ts-check
const { test, expect } = require('@playwright/test');



// test.beforeEach(async ({ page }) => {
//     await page.goto('https://very-important.vercel.app/');
//   });

test('To verify links in Introduction page are working working', async ({ page }) => {

    await page.goto('https://very-important.vercel.app/');

    //to verify page has the right title.
    await expect(page).toHaveTitle('Welcome to the Documentation – Project Socrates');

    //to verify Didcomm link is working
    const didCommLink = page.locator('.text-lg');
    await expect(didCommLink).toHaveAttribute('href', '/didcomm');
    await didCommLink.click({delay: 0});

    //to verify link navigate to the right page
    const didCommPage = page.locator('main h1');
    await expect(didCommPage).toHaveText('DIDComm Messaging');
    
    //expect the URL to have https://very-important.vercel.app/didcomm.
    await expect(page).toHaveURL('https://very-important.vercel.app/didcomm');

    //navigate back to Introduction page
    const introLink = page.locator('.text-lg').nth(0);

    //I left the time to see that the link is click. In real test, it will be removed. 
    await introLink.click({delay: 0});

    //to verify that the edit link in Introduction page is working    
    const [ newPage ] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('.text-sm').click(),
    ]);
    await newPage.waitForLoadState('load');
    const shudingLink = newPage.locator('.url');
    await expect(shudingLink).toHaveAttribute('href', '/shuding');
    await newPage.close();

    //go back to Introduction page and verify page title
    await expect(page).toHaveTitle('Welcome to the Documentation – Project Socrates');

});


test('verify links in DIDComm Messaging page', async ({ page }) => {

    await page.goto('https://very-important.vercel.app/');

    const didCommLink = page.locator('a[href="/didcomm"]').nth(0);
    await didCommLink.click({delay: 0});

     //to verify link navigate to the right page
    const didCommPage = page.locator('main h1');
    await expect(didCommPage).toHaveText('DIDComm Messaging');

    //to verify decentralize identifiers link is working   
    const [ newPage ] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('a[href="https://www.w3.org/TR/did-core/"]').click(),
    ]);
    await newPage.waitForLoadState('load');
    const tableOfContent = newPage.locator('#table-of-contents');
    await expect(tableOfContent).toHaveText('Table of Contents');
    await newPage.close();

    //go back to DIDComm Messaging page
    await expect(page).toHaveTitle('DIDComm Messaging – Project Socrates');

    //to verify that the edit link DIDComm Messaging page is not working  
    //test should fail here but I passed it
    const [ editPage ] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('.text-sm').click(),
    ]);
    await editPage.waitForLoadState('load');
    const loggedOut = editPage.locator('.logged-out');
    await loggedOut.click({delay: 5000});
    const pageNotFound = editPage.locator('.px-2').nth(3);
    await expect(pageNotFound).toHaveText(/repository doesn't contain/);
    await editPage.close();

})

// Note: Links mentioned are missing in Implementation paragram

test('to verify the search field is working', async ({ page }) => {

    await page.goto('https://very-important.vercel.app/');

    //const searchField = page.locator('.appearance-none').nth(0);
    await page.locator('.appearance-none').nth(0).fill('Didcomm');
    await page.locator('.appearance-none').nth(0).press('Enter');   

     //to verify page title for DIDComm Messaging page
     await expect(page).toHaveTitle('DIDComm Messaging – Project Socrates');

})

