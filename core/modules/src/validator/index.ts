const path = require('path');
const themeDirectory = path.resolve(__dirname, '../../../../theme');

// Methods
const verifyFileExists = require('./verify-file');

// Interfaces
interface validateFieldResponse {
    valid: boolean
    value: string,
    method: string,
    errors: Array<string>
}
interface validateFieldObj {
    value: string,
    method: string
}
interface validateResponse {
    valid: boolean,
    fields: Array<validateFieldResponse>
}

// Handle passing of field data to correct method validator
const validateField = async (field: validateFieldObj): Promise<validateFieldResponse> => {
    const fieldResponse: validateFieldResponse = {
        valid: true,
        value: field.value,
        method: field.method,
        errors: []
    }
    switch(field.method) {
        // Components
        case 'comp_name': {
            let regex = new RegExp(`^[a-zA-Z ,_-'".]{2,60}$`)
            let res = regex.test(field.value);
            fieldResponse.valid = res;
            if(!res) fieldResponse.errors.push(`Component name: "${field.value}" does not meet the criteria.`);
            break;
        }
        case 'comp_description': {
            let regex = new RegExp(`^[a-zA-Z ,?!_-'".]{0,400}$`)
            let res = regex.test(field.value);
            fieldResponse.valid = res;
            if(!res) fieldResponse.errors.push(`Component name: "${field.value}" does not meet the criteria.`);
            break;
        }
        // Components - Theme
        case 'comp_verifyFileExists': {
            let res = await verifyFileExists(`${themeDirectory}/components/${field.value}`);
            fieldResponse.valid = res;
            if(!res) fieldResponse.errors.push(`Component with file name: "${field.value}" could not be found in the theme components directory!`);
            break;
        }
    }
    return fieldResponse
}

// Validate handler
const validate = async (data: validateFieldObj | Array<validateFieldObj>): Promise<validateResponse> => {
    const validateRes: validateResponse = {
        valid: true,
        fields: []
    }
    // Check if its an array
    if(Array.isArray(data)) {
        for(let i = 0; i < data.length; i++) {
            let fieldRes: validateFieldResponse = await validateField(data[i]);
            validateRes.fields.push(fieldRes)
        }
    } 
    else {
        let fieldRes: validateFieldResponse = await validateField(data);
        validateRes.fields.push(fieldRes)
    }
    return validateRes
}

export default validate;