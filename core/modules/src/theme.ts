{

    const fse = require('fs-extra');
    const path = require('path');
    const themeDirectory = path.resolve(__dirname, '../../../theme');

    const getTemplateFileNames = async () => {
        try {
            // Grab names of all templates in theme/templates directory
            let fileNames: Array<string> = [];
            let files = await fse.readdir(`${themeDirectory}/templates`);
            await files.forEach((file: string) => {
                fileNames.push(file);
            });
            return fileNames
        }
        catch(err) {
            throw err
        }
    }

    module.exports = {
        getTemplateFileNames
    }

}