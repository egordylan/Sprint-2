describe('Download file', async function () {
    const link = 'https://the-internet.herokuapp.com/iframe';
    const frameId = '#mce_0_ifr.tox-edit-area__iframe';
    const frameIdXpath = '//*[@id="mce_0_ifr"]';
    const textField = '#tinymce';
    const fileButton = 'div.tox-menubar > button:nth-child(1) > span';
    const newDoc = '.tox-collection__item-label';
    const text ='Hello World!';

    before('open the page', async function () {
        await browser.maximizeWindow();
        await browser.url(link);
    });

    context('Work with text in iFrame', async function () {
        it(`should write text`, async function () {
            // don't work with css
            // const frame = await browser.findElement('css', frameId);

            await (await $(frameId)).waitForExist({ timeout: 5000 });
            const frame = await browser.findElement('xpath', frameIdXpath);            
            await browser.switchToFrame(frame);

            await (await $(textField)).click();
            await (await $(textField)).clearValue();
            await (await $(textField)).setValue(text);

            const result = await (await $('#tinymce > p')).getText();
            console.log('RESULT TEXT: ', result);
            await expect(result).toEqual(text);

        });

        it(`should create new file`, async function () {
            await browser.switchToParentFrame();
            await (await $(fileButton)).click();
            await (await $(newDoc)).waitForExist({ timeout: 5000 });
            await (await $(newDoc)).click();
            await browser.pause(2000);

            const frame = await browser.findElement('xpath', frameIdXpath);            
            await browser.switchToFrame(frame);
            const result = await (await $('#tinymce > p')).getText();
            console.log('RESULT TEXT: ', result);
            await expect(result).toEqual('');
        });
    });

    after('Close the window', async function () {
        await browser.closeWindow();
    });
});

// npx wdio run wdio.conf.js --spec iframes.js