{const checkMaxLength = require('../max-length')
const checkMinLength = require('../min-length')
const checkRegex = require('../regex')

const regex = /^[a-z A-Z]+(_[a-z A-Z]+)*$/;
const length = {
    max: 200,
    min: 0
}

async function validateComponentDescription(value: any) {
    let valid = true;
    let errors: any = [];

    if(value) {
        let checkRegexRes = await checkRegex(regex, value, 'component_description'); // Regex
        let checkMinLengthRes = await checkMinLength(length.min, value, 'component_description'); // Min
        let checkMaxLengthRes = await checkMaxLength(length.max, value, 'component_description'); // Max
    
        if(!checkRegexRes.passed) valid = false, errors.push(checkRegexRes.error);
        if(!checkMinLengthRes.passed) valid = false, errors.push(checkMinLengthRes.error);
        if(!checkMaxLengthRes.passed) valid = false, errors.push(checkMaxLengthRes.error);
    
        // Return
        return {
            valid: valid,
            value: value,
            uriComponentEncoded: encodeURIComponent(value),
            errors: errors
        }
    }
    else return {
        valid: valid,
        value: value,
        uriComponentEncoded: '',
        errors: errors
    }
}


module.exports = validateComponentDescription;}