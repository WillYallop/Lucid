interface validateField {
    method: string
    value: string | number
}
interface validateConfig {
    length: {
        min: number,
        max: number
    },
    regex: RegExp
}
interface validateRes {
    valid: boolean
    errors: Array<{
        code: string,
        msg: string
    }>
}


const checkMaxLength = require('../max-length')
const checkMinLength = require('../min-length')
const checkRegex = require('../regex')


// Validate field
export const validate = async (validateConfig: validateConfig, validate: validateField ): Promise<validateRes> => {
    let valid = true;
    let errors = [];
    let checkRegexRes = await checkRegex(validateConfig.regex, validate.value, validate.method); // Regex
    let checkMinLengthRes = await checkMinLength(validateConfig.length.min, validate.value, validate.method); // Min
    let checkMaxLengthRes = await checkMaxLength(validateConfig.length.max, validate.value, validate.method); // Max
    if(!checkRegexRes.passed) valid = false, errors.push(checkRegexRes.error);
    if(!checkMinLengthRes.passed) valid = false, errors.push(checkMinLengthRes.error);
    if(!checkMaxLengthRes.passed) valid = false, errors.push(checkMaxLengthRes.error);
    // Return
    return {
        valid: valid,
        errors: errors
    }
}

// Handle validate multiple/single fields
export const validateFields = async (validateArr: Array<validateField>) => {
    const errors = [];
    let valid = true;
    for(let i = 0; i < validateArr.length; i++) {
        let defaultValidate: validateConfig = {
            length: {
                min: 0,
                max: 100
            },
            regex: /^[a-z A-Z]+(_[a-z A-Z]+)*$/
        }
        switch(validateArr[i].method) {
            // Components
            case 'com_name': {
                defaultValidate.length.min = 0;
                defaultValidate.length.max = 40;
                defaultValidate.regex = /^[a-z A-Z]+(_[a-z A-Z]+)*$/;
                break;
            }
            case 'com_description': {
                defaultValidate.length.min = 0;
                defaultValidate.length.max = 200;
                defaultValidate.regex = /^[a-z A-Z]+(_[a-z A-Z]+)*$/;
                break;
            }
        }
        let validateRes: validateRes = await validate(defaultValidate, validateArr[i])
        if(!validateRes.valid) errors.push(validateRes.errors), valid = false;
    }
    // Return
    return {
        valid: valid,
        errors: errors
    }
} 