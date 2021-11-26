export {};

const verifyFileExists = require('../src/validator/verify-file');

const path = require('path');
const themeDirectory = path.resolve(__dirname, '../../../theme');

test('tests whether a file exists', () => {
    const existsTrue = verifyFileExists(`${themeDirectory}/layouts/default.html`);
    const existsFalse = verifyFileExists(`${themeDirectory}/layouts/doesNotExist.html`);
    expect(existsTrue).toBe(true);
    expect(existsFalse).toBe(false);
});