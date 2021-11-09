export {};

const errorCodeKey = 'validation_'

async function checkMinLength(min, value, calledName) {
    if(min !== false) {
        if(value != undefined) {
            if(value.length < min) {
                return {
                    passed: false,
                    error: { code: `${errorCodeKey}min_length`, msg: `Value: "${value}" is too small for field "${calledName}".`, }
                };
            } else {
                return {
                    passed: true
                };
            }
        }
        else {
            return {
                passed: false,
                error: { code: `${errorCodeKey}value_undefined`, msg: `Value is not defined for field "${calledName}".`, }
            };
        }

    }
    else {
        return {
            passed: true
        };
    }
}
module.exports = checkMinLength