import * as themeController from "../../src/controller/theme";
const fs = require('fs-extra');
import path from 'path';
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;

// For verifyFileExists function
test('test if verifyFileExists function that checks if a theme file exists', async () => {
    const existsTrue = await themeController.verifyFileExists('/components/test.liquid');
    const existsFalse = await themeController.verifyFileExists('/components/doesNotExist.liquid');
    expect(existsTrue).toBe(true);
    expect(existsFalse).toBe(false); 
});


// For getSingleFileContent function
test('test if getSingleFileContent function fetches data', async () => {
    // Test JSON paramater - all we have currently
    const dataMatch = {
        "name": "test",
        "description": "this soley exists to test if getSingleFileContent function works in tests."
    };
    const testContentFileData = await themeController.getSingleFileContent('/tests/test-content.json', 'json');
    expect(testContentFileData).toEqual(dataMatch);
});

// For writeSingleFile function
test('test if writeSingleFile function can write to a file', async () => {
    const dataToWrite = {
        "name": "test",
        "description": "this soley exists to test the writeSingleFile function."
    };
    // Wipe file first
    const directory = path.resolve(themeDir + '/tests/test-write.json');
    await fs.writeFileSync(directory, '');
    // Write data to file with function
    const testFileWrite = await themeController.writeSingleFile('/tests/test-write.json','json', dataToWrite);
    // Expect
    expect(testFileWrite).toBe(true);

    const testContentFileData = await themeController.getSingleFileContent('/tests/test-write.json', 'json');
    expect(testContentFileData).toEqual(dataToWrite);
});