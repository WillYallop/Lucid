const { getTemplateFileNames } = require('../../../modules/dist/theme')

// ------------------------------------ ------------------------------------
// GET list of theme page templates
// ------------------------------------ ------------------------------------
exports.get_theme_templates = async (req, res, next) => {
    // Grab names of all templates in theme/templates directory
    let fileNames = await getTemplateFileNames();
    res.send(fileNames);
}