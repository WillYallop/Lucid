import db from '../../../db';
import moment from 'moment';
import validate from '../../../validator';
import { __convertStringLowerUnderscore } from '../../../functions/shared';
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
        const origin = 'menuField.createMenu';
        let validateObj: Array<vali_validateFieldObj> = [
            {
                method: 'menu_name',
                value: __convertStringLowerUnderscore(name)
            }
        ];
        await validate(validateObj);
        // Update data
        let menuRes = await db.one('INSERT INTO menus(name) VALUES(${name}) RETURNING *', {
            name: __convertStringLowerUnderscore(name)
        });
        return menuRes;
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
        await validate(validateObj);
        // Set update object
        let updateMenusObj = {
            name: __convertStringLowerUnderscore(name)
        };
        // Update
        let menuRes = await db.one(`UPDATE menus SET ${__updateSetQueryGen(updateMenusObj)} WHERE _id='${_id}' RETURNING *`, updateMenusObj);
        return menuRes;
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
        let links: Array<cont_menu_getMenuLinkstemp> = await db.manyOrNone('SELECT menu_links._id, menu_links.menu_id, menu_links.page_id, menu_links.blank, menu_links.text, pages.slug FROM menu_links INNER JOIN pages ON menu_links.page_id = pages._id WHERE menu_links.menu_id=$1;', _id);

        // Loop through links and update pages.slug value to link.href
        if(links) {
            links.forEach((link) => {
                link.href = link.slug;
                delete link.slug;
            });
        }
        // Set links
        menuRes.links = links;
        
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
        let { _id } = await db.one('INSERT INTO menu_links(menu_id, page_id, blank, text) VALUES(${menu_id}, ${page_id}, ${blank}, ${text}) RETURNING *', item);
        let newMenuItem = await getMenuItem(_id);
        return newMenuItem;
    }
    catch(err) {
        throw err;
    }
}

// Update menu item
export const updateMenuItem = async (_id: mod_menuModelLinks["_id"], data: cont_menu_updateMenuItemInp) => {
    try {

        let updateMenuItemObj: cont_menu_updateMenuItemInp = {};

        // Set data
        if(data.page_id != undefined) updateMenuItemObj.page_id = data.page_id;
        if(data.blank != undefined) updateMenuItemObj.blank = data.blank;
        if(data.text != undefined) updateMenuItemObj.text = data.text;

        // Update
        await db.none(`UPDATE menu_links SET ${__updateSetQueryGen(updateMenuItemObj)} WHERE _id='${_id}'`, updateMenuItemObj);

        let newMenuItem = await getMenuItem(_id);
        return newMenuItem;
    }
    catch(err) {
        throw err;
    }
}

export const getMenuItem = async (_id: mod_menuModelLinks["_id"]) => {
    try {
        let menuItem = await db.one('SELECT menu_links._id, menu_links.menu_id, menu_links.page_id, menu_links.blank, menu_links.text, pages.slug FROM menu_links INNER JOIN pages ON menu_links.page_id = pages._id WHERE menu_links._id=$1;', _id);
        menuItem.href = menuItem.slug;
        delete menuItem.slug;
        return menuItem;
    }
    catch(err) {
        throw err;
    }
}