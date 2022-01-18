// Methods
import { verifyFileExists } from "../controller/theme";
import validatorConfig from './validator-config';
import { __generateErrorString } from '../controller/helper/shared';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

const origin = 'validateField';

// Handle passing of field data to correct method validator
const validateField = async (field: vali_validateFieldObj) => {
    try {
        if(field.value != undefined) {
            switch(field.method) {
                // Components
                case 'comp_name': {
                    let regex = new RegExp(validatorConfig.comp_name);
                    let res = regex.test(field.value);
                    if(!res) {
                        throw __generateErrorString({
                            code: 403,
                            origin: origin,
                            message: `Component name: "${field.value}" does not meet the criteria: "${validatorConfig.comp_name}".`
                        });
                    }
                    break;
                }
                case 'comp_description': {
                    let regex = new RegExp(validatorConfig.comp_description);
                    let res = regex.test(field.value);
                    if(!res) {
                        throw __generateErrorString({
                            code: 403,
                            origin: origin,
                            message: `Component description: "${field.value}" does not meet the criteria: "${validatorConfig.comp_description}".`
                        });
                    }
                    break;
                }
                // Components - Theme
                case 'comp_verifyFileExists': {
                    let res = await verifyFileExists(`/components/${field.value}`);
                    if(!res) {
                        throw __generateErrorString({
                            code: 404,
                            origin: origin,
                            message: `Component with file name: "${field.value}" could not be found in the theme components directory!`
                        });
                    }
                    break;
                }
                // Alt
                case 'uuidVerify': {
                    let res = uuidValidate(field.value) && uuidVersion(field.value) === 1;
                    if(!res) {
                        throw __generateErrorString({
                            code: 403,
                            origin: origin,
                            message: `uuid: "${field.value}" is not a valid ID.`
                        });
                    }
                    break;  
                }
                // Posts
                case 'post_name': {
                    let regex = new RegExp(validatorConfig.post_name);
                    let res = regex.test(field.value);
                    if(!res) {
                        throw __generateErrorString({
                            code: 403,
                            origin: origin,
                            message: `Post name: "${field.value}" does not meet the criteria: "${validatorConfig.post_name}".`
                        });
                    }
                    break;
                }
                // Components - Template
                case 'temp_verifyFileExists': {
                    let res = await verifyFileExists(`/templates/${field.value}`);
                    if(!res) {
                        throw __generateErrorString({
                            code: 404,
                            origin: origin,
                            message: `Template with file name: "${field.value}" could not be found in the theme templates directory!`
                        });
                    }
                    break;
                }
                // Theme
                case 'file_isLiquidExtension': {
                    let res = field.value.includes('.liquid');
                    if(!res) {
                        throw __generateErrorString({
                            code: 403,
                            origin: origin,
                            message: `Template file name must have ".liquid" extension!`
                        });
                    }
                    break;
                }
                // Content Type
                case 'cont_name': {
                    let regex = new RegExp(validatorConfig.cont_name);
                    let res = regex.test(field.value);
                    if(!res) {
                        throw __generateErrorString({
                            code: 403,
                            origin: origin,
                            message: `Content type name: "${field.value}" does not meet the criteria: "${validatorConfig.cont_name}".`
                        });
                    }
                    break;
                }
                // Menu
                case 'menu_name': {
                    let regex = new RegExp(validatorConfig.menu_name);
                    let res = regex.test(field.value);
                    if(!res) {
                        throw __generateErrorString({
                            code: 403,
                            origin: origin,
                            message: `Menu name: "${field.value}" does not meet the criteria: "${validatorConfig.menu_name}".`
                        });
                    } 
                    break;
                }
                case 'menu_linkText': {
                    let regex = new RegExp(validatorConfig.menu_linkText);
                    let res = regex.test(field.value);
                    if(!res) {
                        throw __generateErrorString({
                            code: 403,
                            origin: origin,
                            message: `Menu link text: "${field.value}" does not meet the criteria: "${validatorConfig.menu_linkText}".`
                        });
                    }
                    break;
                }
            }
        } 
        else {
            throw __generateErrorString({
                code: 403,
                origin: origin,
                message: `Method "${field.method}": value is undefined!`
            });
        }
    }
    catch(err) {
        throw err;
    }
}

// Validate handler
const validate = async (data: vali_validateFieldObj | Array<vali_validateFieldObj>) => {
    try {
        // Check if its an array
        if(Array.isArray(data)) {
            for(let i = 0; i < data.length; i++) {
                await validateField(data[i]);
            }
        } 
        else {
            await validateField(data);
        }
    }
    catch(err) {
        throw err;
    }
}

export default validate;