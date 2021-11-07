async function checkMaxLength(max, value) {
    if(max !== false) {
        if(value.length > max) {
            return {
                passed: false,
                error: { number: 2, msg: 'Value is too large.' }
            }
        } else {
            return {
                passed: true
            }
        }
    }
    else {
        return {
            passed: true
        }
    }
}
module.exports = checkMaxLength