async function checkMinLength(min, value) {
    if(min !== false) {
        if(value.length <= min) {
            return {
                passed: false,
                error: { number: 1, msg: 'Value is too small.' }
            };
        } else {
            return {
                passed: true
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