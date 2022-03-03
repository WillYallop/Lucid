import { listDirectoryFiles } from './theme';
import { __generateErrorString } from '../helper/shared';

// ------------------------------------ ------------------------------------
// get all templates
// ------------------------------------ ------------------------------------
const getAll = async () => {
    try {
        const origin = 'templateController.getAll';
        let templateFiles = await listDirectoryFiles('/templates');
        const templateFilePathArray: Array<string> = [];
        templateFiles.forEach((template) => {
            templateFilePathArray.push(template.file_path.replace('/templates/', ''));
        });
        return templateFilePathArray;
    }
    catch(err) {
        throw err;
    }
}

export {
    getAll
}