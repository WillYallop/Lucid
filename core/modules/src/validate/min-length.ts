{
    const errorCodeKey = 'validation_'

    async function checkMinLength(min: number, value: any, fieldName: string) {
        if(min !== undefined) {
            if(value != undefined) {
                if(value.length < min) {
                    return {
                        passed: false,
                        error: { code: `${errorCodeKey}min_length`, msg: `Value: "${value}" is too small for field "${fieldName}".`, }
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
                    error: { code: `${errorCodeKey}value_undefined`, msg: `Value is not defined for field "${fieldName}".`, }
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
}