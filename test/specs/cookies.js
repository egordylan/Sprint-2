/*
working with cookies
(eg.: check cookies after successful/unsuccessful login, 
remove cookies after login then refresh the page and 
check if a user is logged out) - https://automationteststore.com/
*/
const {login, mainPage} = require('./helper.js');


describe('Working with cookies', async function () {
    const url = 'https://automationteststore.com/';
    const userLogin = 'JohnyBravo';
    const userPassword = 'password123';
    const userPasswordInvalid = 'password1';

    before('Open the main page', async function () {
        await mainPage(url);

        await browser.waitUntil(async () => {
            const cookie = await browser.getCookies();
            for (let elem of cookie) {
                if (elem.name === 'neowize_user') {
                    return true;
                }
            }
        });
    });

    context('Check cookies after Login', async function () {
        it('should check cookies after unsuccessfull login', async function () {
            const cookieBeforeLogin = await browser.getCookies();
            console.log('BEFORE ::: ', cookieBeforeLogin);
            await login(userLogin, userPasswordInvalid);
            const cookieAfterLogin = await browser.getCookies();
            console.log('AFTER ::: ', cookieAfterLogin);
            await expect(cookieBeforeLogin).toEqual(cookieAfterLogin);
        });

        it(`should check cookies after successfull login`, async function () {
            await login(userLogin, userPassword);
            const cookie = await browser.getCookies();
            let result;
            console.log('COOKIES ----> ', cookie);
            for (let elem of cookie) {
                if (elem.name === 'customer') {
                    result = true;
                } else { continue; }
            }
            console.log('COOKIES AFTER SUCCESSFULL LOGIN ----> ', result);
            await expect(result).toEqual(true);
        });

        it('should logout after removing cookies', async function () {
            await browser.deleteCookies();
            await browser.refresh();
            const title = await browser.getTitle();
            await expect(title).toEqual('Account Login'); 
        });
    });
    
});

// npx wdio run wdio.conf.js --spec cookies.js