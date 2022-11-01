/*download file (also you can change the download folder in chrome capabilities, 
and then check file in the folder) */
const fs = require('fs');


describe('Download file', async function () {
    const link = 'https://the-internet.herokuapp.com/download';
    const element = 'a[href="download/UplodFile1.txt"]';
    const elemName = 'UplodFile1.txt';
    const pathToDir = 'tempDownload'; 

    before('open the page', async function () {
        await browser.maximizeWindow();
        await browser.url(link);
    });

    context('Download and check file', async function () {
        it(`should successfully download the file`, async function () {
            await (await $(element)).click();
            await browser.pause(1000);
        });

        it('should check if the file download', async function () {
            fs.readdir(pathToDir, (err, items) => {
                console.log(items);
                expect(items.length).toEqual(1);
                expect(items[0]).toEqual(elemName);
            });
        });
    });

    after('Close the window', async function () {
        await browser.closeWindow();
    });
});

// npx wdio run wdio.conf.js --spec download.js