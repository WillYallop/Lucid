{
    const errorCodeKey = 'validation_'

    async function checkRegex(regex: RegExp, value: any, fieldName: string) {
        if(regex !== undefined) {
            if(value != undefined) {
                let test = regex.test(value);
                if(!test) return {
                    passed: false,
                    error: { code: `${errorCodeKey}regex_failed`, msg: `Failed on regex for field ${fieldName}!` }
                };
                else return {
                    passed: true
                };
            } else return {
                passed: false,
                error: { code: `${errorCodeKey}regex_value_undefined`, msg: `Failed on regex for field "${fieldName}"!` }
            }
        }
        else {
            return {
                passed: true
            };
        }
    }
    module.exports = checkRegex
}