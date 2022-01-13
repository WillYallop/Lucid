import db from '../../../db';
import moment from 'moment';
import validate from '../../../validator';
import { __convertStringLowerUnderscore } from '../../../controller/helper/shared';
import { __updateSetQueryGen } from '../shared/functions';


// ------------------------------------ ------------------------------------
// Menu
// ------------------------------------ ------------------------------------

// Delete menu
export const deleteMenu = async (_id: mod_menuModel["_id"]) => {
    try {
        // Delete all data related to the page
        await db.none('DELETE FROM menus WHERE _id=$1', _id);
        return {
            deleted: true
        }
    }
    catch(err) {
        throw err;
    }
}

// Create menu
export const createMenu = async (name: mod_menuModel["name"]) => {
    try {

        let validateObj: Array<vali_validateFieldObj> = [
            {
                method: 'menu_name',
                value: __convertStringLowerUnderscore(name)
            }
        ];
        let verifyData = await validate(validateObj);
        // Update data
        if(verifyData.valid) {
            let menuRes = await db.one('INSERT INTO menus(name) VALUES(${name}) RETURNING *', {
                name: name
            });
            return menuRes;
        }
        else {
            throw 'Menu name doesnt meet criteria!'
        }

    }
    catch(err) {
        throw err;
    }
}

// Update menu
export const updateMenu = async () => {
    try {

    }
    catch(err) {
        throw err;
    }
}

// Get menu
export const getMenu = async () => {
    try {

    }
    catch(err) {
        throw err;
    }
}


// ------------------------------------ ------------------------------------
// Menu Items
// ------------------------------------ ------------------------------------

// Delete menu item
export const deleteMenuItem = async () => {
    try {

    }
    catch(err) {
        throw err;
    }
}

// Add menu item
export const addMenuItem = async () => {
    try {

    }
    catch(err) {
        throw err;
    }
}

// Update menu item
export const updateMenuItem = async () => {
    try {

    }
    catch(err) {
        throw err;
    }
}