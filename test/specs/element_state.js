/*
working with element state 
(check specific element state using is*ed() and waitFor* methods
*/


describe('Working with element state', async function () {
    const link = 'https://the-internet.herokuapp.com/dynamic_loading/1';
    const element = '#start > button';
    const loadingBar ='#loading';
    const hiddenElem = '#finish';


    before('open the page', async function () {
        await browser.maximizeWindow();
        await browser.url(link);
    });

    context('Check the elements state', async function () {
        it(`should make the element visible`, async function () {
            await (await $(element)).click();
            await (await $(loadingBar)).waitForDisplayed({ timeout: 5000, reverse: false, 
                                                        timeoutMsg: 'Error: loading bar did not display', interval: 500, });
            await (await $(loadingBar)).waitForDisplayed({ timeout: 8000, reverse: true, 
                                                        timeoutMsg: 'Error: loading bar did not hide', interval: 500, });
            await (await $('div > h4'[1])).waitForDisplayed({ timeout: 3000, reverse: true, 
                                                        timeoutMsg: 'Error: hidden element did not appear', interval: 500, });

            const text = await( await $(hiddenElem)).getText();
            await expect(text).toEqual('Hello World!');
            console.log(text);
        });
    });

    after('Close the window', async function () {
        await browser.closeWindow();
    });
});

// npx wdio run wdio.conf.js --spec element_state.js