describe('Drag and drop', async function () {
    const link = 'https://the-internet.herokuapp.com/drag_and_drop';


    before('open the page', async function () {
        await browser.maximizeWindow();
        await browser.url(link);
    });

    context('Drag and drop element', async function () {
        it(`should successfully drag A to B`, async function () {
            const elem = await $('#column-a.column');
            const target = await $('#column-b.column');
            // this test didn't work :(
            await elem.dragAndDrop(target);
            
            await expect(target).toHaveText('A');
            await expect(elem).toHaveText('B');
        });
    });

    after('Close the window', async function () {
        await browser.closeWindow();
    });
});

// npx wdio run wdio.conf.js --spec drag_drop.js