describe('Drag and drop', async function () {
    const link = 'https://the-internet.herokuapp.com/drag_and_drop';


    before('open the page', async function () {
        await browser.maximizeWindow();
        await browser.url(link);
    });

    context('Drag and drop element', async function () {
        it(`should successfully drag A to B`, async function () {

            const elem = await $('//*[@id="column-a"]');
            const target= await $('//*[@id="column-b"]');
            // const elem = await $('#column-a');
            // const target = await $('#column-b');

            
            // this test didn't work :(
            await elem.dragAndDrop(target);
            await browser.pause(3000);
            const elemHeader = await(await $('#column-a > header')).getText();
            console.log('A HEADER ::: ', elemHeader);
            const targetHeader = await(await $('#column-b > header')).getText();
            console.log('B HEADER ::: ', targetHeader);
            await expect(targetHeader).toHaveText('A');
            await expect(elemHeader).toHaveText('B');
        });
    });

    // after('Close the window', async function () {
    //     await browser.closeWindow();
    // });
});

// npx wdio run wdio.conf.js --spec drag_drop.js