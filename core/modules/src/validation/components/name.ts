{const checkMaxLength = require('../max-length')
const checkMinLength = require('../min-length')
const checkRegex = require('../regex')

const regex = /^[a-z A-Z]+(_[a-z A-Z]+)*$/;
const length = {
    max: 20,
    min: 1
}

async function validateComponentName(value: any) {
    let valid = true;
    let errors = [];

    let checkRegexRes = await checkRegex(regex, value, 'component_name'); // Regex
    let checkMinLengthRes = await checkMinLength(length.min, value, 'component_name'); // Min
    let checkMaxLengthRes = await checkMaxLength(length.max, value, 'component_name'); // Max

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

module.exports = validateComponentName;}