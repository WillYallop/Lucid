/// <reference path="../../types/index.d.ts" />

import fs from 'fs-extra';
import * as componentController from "../../src/controller/component";
import { v1 as uuidv1 } from 'uuid';
import path from 'path';
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;

// For saveSingle function
test('Test if saveComponent saves to theme/config/components.json file', async () => {

});

// For updateSingle function
test('Test if updateSingle updates component in theme/config/components.json', async () => {

    // Reset components.json file
    fs.writeFileSync(path.resolve(themeDir + '/config/components.json'), '[]');


    // Save new component for test data.
    let newComponentRes = await componentController.saveSingle({
        name: 'Test name one',
        description: 'Test Description one',
        file_path: 'test.liquid'
    });

    // Test update works and verify
    if(newComponentRes != undefined) {
        let newCompID = newComponentRes._id;

        const componentUpdateRes2 = await componentController.updateSingle(newCompID, {
            name: 'Test name two',
            description: 'Test Description two'
        });

        // Test it exists
        // Find the newly updated component in theme/components.json file
        const directory = path.resolve(themeDir + '/config/components.json');
        const fileRes = fs.readFileSync(directory);
        const data: Array<mod_componentModel> = JSON.parse(fileRes.toString());

        let component = data.find( x => x._id === newCompID);
        expect(component).toEqual(componentUpdateRes2);
    }
});

// For deleteSingle function
test('Test if deleteSingle delete single component from theme/config/components.json', async () => {

});