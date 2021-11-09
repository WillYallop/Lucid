{const errorCodeKey = 'validation_'

async function checkMaxLength(max: any, value: any, calledName: any) {
    if(max !== false) {
        if(value != undefined) { 
            if(value.length > max) {
                return {
                    passed: false,
                    error: { code: `${errorCodeKey}exceeds_max_length`, msg: `Value: "${value}" is too large for field "${calledName}".` }
                }
            } else {
                return {
                    passed: true
                }
            }
        } else {
            return {
                passed: false,
                error: { code: `${errorCodeKey}value_undefined`, msg: `Value is not defined for field "${calledName}".`, }
            };
        }
    }
    else {
        return {
            passed: true
        }
    }
}
module.exports = checkMaxLength}