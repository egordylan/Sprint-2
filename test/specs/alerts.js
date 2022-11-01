describe('Handle alerts on page', async function () {
    const link = 'https://the-internet.herokuapp.com/javascript_alerts';
    const jsAlert = 'button[onclick="jsAlert()"]';
    const jsConfirm = 'button[onclick="jsConfirm()"]';
    const jsPrompt = 'button[onclick="jsPrompt()"]';
    const resultMessage = '#result';
    const alertText = 'Hello World!';

    before('open the page', async function () {
        await browser.maximizeWindow();
        await browser.url(link);
    });

    context('Handling JS alerts', async function () {
        it(`should accept JS alert`, async function () {
            await (await $(jsAlert)).click();
            await browser.acceptAlert();

            await expect(await (await $(resultMessage)).getText()).toEqual('You successfully clicked an alert');
        });
    });

    context('Handling alerts', async function () {
        it('should accept JS confirm', async function () {
            await (await $(jsConfirm)).click();
            await browser.acceptAlert();
            await expect(await (await $(resultMessage)).getText()).toEqual('You clicked: Ok');
        });

        it('should declain JS confirm', async function () {
            await (await $(jsConfirm)).click();
            await browser.dismissAlert();
            await expect(await (await $(resultMessage)).getText()).toEqual(`You clicked: Cancel`);
        });
    });

    context('Handling alerts', async function () {
        it('should get text from alert', async function () {
            await (await $(jsPrompt)).click();
            const alertText = await browser.getAlertText();
            await expect(alertText).toEqual(`I am a JS prompt`);
        });

        it('should accept JS prompt with entered text', async function () {
            await (await $(jsPrompt)).click();
            await browser.sendAlertText(alertText);
            await browser.acceptAlert();
            await expect(await (await $(resultMessage)).getText()).toEqual(`You entered: ${alertText}`);
        });

        it('should accept JS prompt without entered text', async function () {
            await (await $(jsPrompt)).click();
            await browser.acceptAlert();
            await expect(await (await $(resultMessage)).getText()).toEqual(`You entered:`);
        });

        it('should decline JS prompt', async function () {
            await (await $(jsPrompt)).click();
            await browser.sendAlertText(alertText);
            await browser.dismissAlert();
            await expect(await (await $(resultMessage)).getText()).toEqual(`You entered: null`);
        });
    });
});

// npx wdio run wdio.conf.js --spec alerts.js