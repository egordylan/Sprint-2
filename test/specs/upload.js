describe('Download file', async function () {
    const link = 'https://the-internet.herokuapp.com/upload';
    const filePath = './additional_files/hello.txt'
    const chooseFileButton = '#file-upload';
    const uploadFileButton = '#file-submit';
    const fileUpload = '.example > h3';
    const fileUploadName = '#uploaded-files';


    before('open the page', async function () {
        await browser.maximizeWindow();
        await browser.url(link);
    });

    context('Upload file', async function () {
        it(`should successfully upload the file`, async function () {
            
            const remoteFilePath = await browser.uploadFile(filePath);

            await (await $(chooseFileButton)).setValue(remoteFilePath);
            await (await $(uploadFileButton)).click();
            await browser.pause(2000);

            const text = await (await $(fileUpload)).getText();
            console.log('RESULT ---> ', text);
            await expect(text).toEqual('File Uploaded!');

            const textOfFileName = await (await $(fileUploadName)).getText();
            console.log('RESULT ---> ', textOfFileName);
            await expect(textOfFileName).toEqual('hello.txt');
        });
    });

    after('Close the window', async function () {
        await browser.closeWindow();
    });
});

// npx wdio run wdio.conf.js --spec upload.js