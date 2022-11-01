describe('Mouse hover on element', async function () {
    const link = 'https://the-internet.herokuapp.com/hovers';

    before('open the page', async function () {
        await browser.maximizeWindow();
        await browser.url(link);
    });


    it(`should hover the element and show "name: user1"`, async function () {
        const elements = await $$('.figure');
        await (elements[0]).moveTo();

        const el = await $$('h5');
        await expect(el[0]).toBeDisplayed();
        await expect(await el[0].getText()).toEqual("name: user1");
    });
});

// npx wdio run wdio.conf.js --spec hover_mouse.js