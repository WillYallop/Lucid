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
                name: __convertStringLowerUnderscore(name)
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
export const updateMenu = async (_id: mod_menuModel["_id"], name: mod_menuModel["name"]) => {
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
            // Set update object
            let updateMenusObj = {
                name: __convertStringLowerUnderscore(name)
            };
            // Update
            let menuRes = await db.one(`UPDATE menus SET ${__updateSetQueryGen(updateMenusObj)} WHERE _id='${_id}' RETURNING *`, updateMenusObj);
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

// Get menu
export const getMenu = async (_id: mod_menuModel["_id"]) => {
    try {
        // Get page
        let menuRes: mod_menuModel = await db.one('SELECT * FROM menus WHERE _id=$1', _id);
        // Get all menu_links with menu _id
        // Join page slug as href to menu_link
        menuRes.links = await db.manyOrNone('SELECT menu_links._id, menu_links.menu_id, menu_links.page_id, menu_links.blank, menu_links.text, pages.slug FROM menu_links WHERE menu_id=$1 INNER JOIN pages ON menu_links.page_id = pages._id;', _id);

        return menuRes;
    }
    catch(err) {
        throw err;
    }
}


// ------------------------------------ ------------------------------------
// Menu Items
// ------------------------------------ ------------------------------------

// Delete menu item
export const deleteMenuItem = async (_id: mod_menuModelLinks["_id"]) => {
    try {
        // Delete all data related to the page
        await db.none('DELETE FROM menu_links WHERE _id=$1', _id);
        return {
            deleted: true
        }
    }
    catch(err) {
        throw err;
    }
}

// Add menu item
export const addMenuItem = async (item: cont_menu_addMenuItemInp) => {
    try {
        let { _id } = await db.one('INSERT INTO menu_links(menu_id, page_id, blank, text) VALUES(${menu_id}, ${page_id}, ${blank}, ${text} RETURNING _id) ', item);
        let newMenuItem = await getMenuItem(_id);
        return newMenuItem;
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

export const getMenuItem = async (_id: mod_menuModelLinks["_id"]) => {
    try {
        let menuItem = await db.one('SELECT menu_links._id, menu_links.menu_id, menu_links.page_id, menu_links.blank, menu_links.text, pages.slug FROM menu_links WHERE _id=$1 INNER JOIN pages ON menu_links.page_id = pages._id;', _id);
        return menuItem;
    }
    catch(err) {
        throw err;
    }
}