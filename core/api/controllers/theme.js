const fs = require('fs');
const path = require('path');
const themeDirectory = path.resolve(__dirname, '../../theme');

// ------------------------------------ ------------------------------------
// GET list of theme page templates
// ------------------------------------ ------------------------------------
exports.get_theme_templates = (req, res, next) => {
    // Grab names of all templates in theme/templates directory
    fs.readdir(`${themeDirectory}/templates`, (err, files) => {
        let fileNames = [];
        files.forEach((file) => {
            fileNames.push(file);
        });
        res.send(fileNames);
    });
}

// ------------------------------------ ------------------------------------
// GET list of theme layouts
// ------------------------------------ ------------------------------------
exports.get_theme_layouts = (req, res, next) => {
    fs.readdir(`${themeDirectory}/layouts`, (err, files) => {
        let fileNames = [];
        files.forEach((file) => {
            fileNames.push(file);
        });
        res.send(fileNames);
    });
}