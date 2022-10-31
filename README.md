## **WeddriverIO Practice Tasks**

---

Setup new WebdriverIO project using Starter Toolkit (npm init wdio .) use mocha framework without Page Objects.

---

### Task:

In your WebdriverIO repo create simple test cases :

1. In your "One shopping card flow on behalf of login user"  test from S1 WebdriverIO Practice topic - Add login(username, password) helper method and use this for test precondition.

2. Add the new test to your project - "Search in certain category smoke case", use only CSS Selectors, to handle the list of search items - use $$() function to get elements and then iterate through the list using JS capabilities (e.g.: for..of loop).

3.  Come up with and add short advanced browser interaction tests:

    - new tab handling on page: https://the-internet.herokuapp.com/windows
    - working with iframes on page: https://the-internet.herokuapp.com/iframe
    - handle alerts on page: https://the-internet.herokuapp.com/javascript_alerts
    - drag and drop - https://the-internet.herokuapp.com/drag_and_drop
    - mouse hover on element - https://the-internet.herokuapp.com/hovers
    - working with cookies (eg.: check cookies after successful/unsuccessful login, remove cookies after login then refresh the page and check if a user is logged out) - https://automationteststore.com/
    - download file (also you can change the download folder in chrome capabilities, and then check file in the folder) - https://the-internet.herokuapp.com/download  
    - upload file - https://the-internet.herokuapp.com/upload
    - working with element state (check specific element state using is*ed() and waitFor* methods - https://the-internet.herokuapp.com/dynamic_loading/1
    - execute JS (e.g.: hide the animated banner, click on some elements, set search input value using JS) - https://automationteststore.com/

### Comments: 

- You should use basic mocha.js syntax
- You should not use Page Objects and other extra Patterns
- Use async mode
