/**
* @jest-environment jsdom
*/

const ejs = require("ejs");
beforeEach(async () => {
    const html = await ejs.renderFile("src/views/login.ejs", {});
    document.body.innerHTML = html;
});

test.each`
    pass          | label
    ${"12345abc"} | ${"8文字"}
    ${"!@#$%^&*"} | ${"特殊文字で8文字"}
    ${"1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"} | ${"100文字"}

`("sLabelはエラーにならない", (data) => {
    const passwordInputElement = document.querySelector('input[name="password"]');
    passwordInputElement.value = data.pass;
    expect(passwordInputElement.validity.valid).toBe(true);
});

test.each`
    pass          | label
    ${""} | ${"パスワードが空文字"}
    ${"1"} | ${"1文字"}
    ${"1234abc"} | ${"7文字"}
`("sLabelはエラーになる", (data) => {
    const passwordInputElement = document.querySelector('input[name="password"]');
    passwordInputElement.value = data.pass;
    expect(passwordInputElement.validity.valid).toBe(false);
});