const {mainPage} = require('./helper.js');
const mainLink = 'https://automationteststore.com/';
const searchBar = '#filter_keyword';
const goSearchButton = '.button-in-search';
const cathegory = '#category_49';
const searchValue = 'toilette';
const searchResultArray = '.fixed_wrapper';
const testArray = ['POUR HOMME EAU DE TOILETTE', 'OMNIA EAU DE TOILETTE 65ML', 'ARMANI EAU DE TOILETTE SPRAY', 
                   'MAN EAU DE TOILETTE SPRAY', 'EUPHORIA MEN INTENSE EAU DE TOILETTE SPRAY'];



describe('Search in certain category', async function () {
    before('Open the main page', async function () {
        // precondition
        await mainPage(mainLink);
    });

    context('Searching items: ', async function () {
        it(`should find items`, async function () {

            await (await $(searchBar)).click();
            await (await $(cathegory)).click();
            await (await $(searchBar)).setValue(searchValue);
            await (await $(goSearchButton)).click();
            await (await $(searchResultArray)).scrollIntoView();

            const resultArray = await $$(searchResultArray);
            let array = [];
            
            for (let elem of resultArray) {
                array.push(await elem.getText());
            }

            console.log('Our array: ---> ', array);

            await expect(array).toEqual(testArray);
        });
    });

});

// npx wdio run wdio.conf.js --spec search_in_certain_category_smoke_case.js
