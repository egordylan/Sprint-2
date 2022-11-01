/*
execute JS
(e.g.: hide the animated banner, 
    click on some elements, 
    set search input value using JS)
https://automationteststore.com/
 */

describe('Execute JavaScript', async function () {
    const link = 'https://automationteststore.com/';
    const banner = '.banner_container';
    const menuItem = 'a[href="https://automationteststore.com/index.php?rt=product/category&path=65"]';
    const pageTitle = 'Books';
    const searchBar = 'input#filter_keyword';
    const goButton = '.fa.fa-search';

    before('open the page', async function () {
        await browser.maximizeWindow();
        await browser.url(link);
    });

    
    it(`should hide animated banner`, async function () {
        const bannerSelector = await $(banner);
        await browser.execute((element) => {
            element.remove();
        }, bannerSelector);

        await browser.pause(2000);
        await bannerSelector.waitForDisplayed({ reverse: true });
        await expect(bannerSelector).not.toBeDisplayed();
    });

    it(`should click on BOOKS menu item`, async function () {
        const menuSelector = await $(menuItem);
        await browser.execute((element) => {
            element.click();
        }, menuSelector);

        await browser.pause(2000);
        const title = await browser.getTitle();
        await expect(title).toEqual(pageTitle);
    });

    it(`should set search input value`, async function () {
        await (await $(searchBar)).click();
        const searchBarSelector = await $(searchBar);
        await browser.execute((element) => {
            element.value = 'paper town';
        }, searchBarSelector);
        await (await $(goButton)).click();
        await browser.pause(2000);

        const title = await browser.getTitle();
        await expect(title).toEqual('Paper Towns by John Green');
    });
 
});

// npx wdio run wdio.conf.js --spec execute_js.js