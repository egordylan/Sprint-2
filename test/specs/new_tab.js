describe('New tab handling on page', async function () {
    const link = 'https://the-internet.herokuapp.com/windows';
    const newTabLink = '#content > div > a';

    before('open the page', async function () {
        await browser.maximizeWindow();
        await browser.url(link);
    });

    context('Handling new tab', async function () {
        it(`should handling new tab`, async function () {
            await (await $(newTabLink)).click();
            await browser.pause(1000)
            const tabs = await browser.getWindowHandles();

            console.log('11111111', tabs);
            await browser.switchToWindow(tabs[1]);
            await browser.pause(1000)
            await expect(await browser.getTitle()).toBe('New Window');
        });

        it('should retern to the home tab', async function () {
            const tabs = await browser.getWindowHandles();

            await browser.switchToWindow(tabs[0]);
            await browser.pause(1000)
            await expect(await browser.getTitle()).toBe('The Internet');
        });

        it('should close all tabs', async function () {
            const tabs = await browser.getWindowHandles();

            for (let tab of tabs) {
                await browser.switchToWindow(tab);
                await browser.closeWindow();
            }
        });
    });
});

// npx wdio run wdio.conf.js --spec new_tab.js