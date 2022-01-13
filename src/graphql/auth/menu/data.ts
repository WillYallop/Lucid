import db from '../../../db';
import moment from 'moment';
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

    }
}

// Create menu
export const createMenu = async () => {
    try {

    }
    catch(err) {
        
    }
}

// Update menu
export const updateMenu = async () => {
    try {

    }
    catch(err) {
        
    }
}

// Get menu
export const getMenu = async () => {
    try {

    }
    catch(err) {
        
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
        
    }
}

// Add menu item
export const addMenuItem = async () => {
    try {

    }
    catch(err) {
        
    }
}

// Update menu item
export const updateMenuItem = async () => {
    try {

    }
    catch(err) {
        
    }
}