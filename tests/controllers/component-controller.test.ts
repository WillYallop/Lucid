/// <reference path="../../types/index.d.ts" />

import fs from 'fs-extra';
import * as componentController from "../../src/controller/component";
import { v1 as uuidv1 } from 'uuid';
import path from 'path';
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;

// For saveSingle function
test('Test if saveComponent saves to theme/config/components.json file', async () => {

    // Reset components.json file
    fs.writeFileSync(path.resolve(themeDir + '/config/components.json'), '[]');


    // Test it saves
    const fileName = 'test.liquid';
    const saveComponent = await componentController.saveSingle({
        name: 'test',
        description: 'This is a test component!',
        file_path: fileName
    });
    expect(saveComponent.saved).toBe(true);
    

    // Test it exists
    // Find the newly created component in theme/components.json file
    const directory = path.resolve(themeDir + '/config/components.json');
    const fileRes = fs.readFileSync(directory);
    const data: Array<mod_componentModel> = JSON.parse(fileRes.toString());

    let component = data.find( x => x.file_name === fileName);
    expect(component).toEqual(saveComponent.component);


    // Test it only allows one component instance with file_name
    const saveSecondComponent = await componentController.saveSingle({
        name: 'test',
        description: 'This is a test component!',
        file_path: fileName
    });
    expect(saveSecondComponent.saved).toBe(false);
});

// For updateSingle function
test('Test if updateSingle updates component in theme/config/components.json', async () => {

    // Reset components.json file
    fs.writeFileSync(path.resolve(themeDir + '/config/components.json'), '[]');


    // Test update throws error if it cannot find the component.
    const componentUpdateRes1 = await componentController.updateSingle(uuidv1(), {
        name: 'Test name',
        description: 'Test Description'
    });
    expect(componentUpdateRes1.updated).toBe(false);

    // Save new component for test data.
    let newComponentRes = await componentController.saveSingle({
        name: 'Test name one',
        description: 'Test Description one',
        file_path: 'test.liquid'
    });

    // Test update works and verify
    if(newComponentRes.component != undefined) {
        let newCompID = newComponentRes.component._id;

        const componentUpdateRes2 = await componentController.updateSingle(newCompID, {
            name: 'Test name two',
            description: 'Test Description two'
        });
        expect(componentUpdateRes2.updated).toBe(true);

        // Test it exists
        // Find the newly updated component in theme/components.json file
        const directory = path.resolve(themeDir + '/config/components.json');
        const fileRes = fs.readFileSync(directory);
        const data: Array<mod_componentModel> = JSON.parse(fileRes.toString());

        let component = data.find( x => x._id === newCompID);
        expect(component).toEqual(componentUpdateRes2.component);
    }
});

// For deleteSingle function
test('Test if deleteSingle delete single component from theme/config/components.json', async () => {

    // Reset components.json file
    fs.writeFileSync(path.resolve(themeDir + '/config/components.json'), '[]');

    // Test - failed delete
    const componentDeleteRes1 = await componentController.deleteSingle('af979c80-546d-11ec-9a0b-ad54294d4740');
    expect(componentDeleteRes1.deleted).toBe(false);

    // Save new component for test data.
    const newComponentRes = await componentController.saveSingle({
        name: 'Test name one',
        description: 'Test Description one',
        file_path: 'test.liquid'
    });

    if(newComponentRes.component != undefined) {
        // Test - should work
        const componentDeleteRes2 = await componentController.deleteSingle(newComponentRes.component._id);
        expect(componentDeleteRes2.deleted).toBe(true);
    }

});