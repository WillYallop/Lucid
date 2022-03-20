import { templateController } from '../../index';

// Get templates
export const getAll = async () => {
    try {
        let templates = templateController.getAll();
        return templates;
    }
    catch(err) {
        throw err;
    }
}