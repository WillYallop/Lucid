async function checkRegex(regex, value) {
    if(regex !== false) {
        let test = regex.test(value);
        if(!test) return {
            passed: false,
            error: { number: 0, msg: 'Failed on regex!' }
        };
        else return {
            passed: true
        };
    }
    else {
        return {
            passed: true
        };
    }
}
module.exports = checkRegex