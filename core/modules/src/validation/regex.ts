{const errorCodeKey = 'validation_'

async function checkRegex(regex: any, value: any, calledName: any) {
    if(regex !== false) {
        if(value != undefined) {
            let test = regex.test(value);
            if(!test) return {
                passed: false,
                error: { code: `${errorCodeKey}regex_failed`, msg: `Failed on regex for field ${calledName}!` }
            };
            else return {
                passed: true
            };
        } else return {
            passed: false,
            error: { code: `${errorCodeKey}regex_value_undefined`, msg: `Failed on regex for field "${calledName}"!` }
        }
    }
    else {
        return {
            passed: true
        };
    }
}
module.exports = checkRegex}