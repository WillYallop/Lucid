var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const checkMaxLength = require('../max-length');
const checkMinLength = require('../min-length');
const checkRegex = require('../regex');
const regex = /^[a-z A-Z]+(_[a-z A-Z]+)*$/;
const length = {
    max: 200,
    min: 0
};
function validateComponentDescription(value) {
    return __awaiter(this, void 0, void 0, function* () {
        let valid = true;
        let errors = [];
        if (value) {
            let checkRegexRes = yield checkRegex(regex, value, 'component_description'); // Regex
            let checkMinLengthRes = yield checkMinLength(length.min, value, 'component_description'); // Min
            let checkMaxLengthRes = yield checkMaxLength(length.max, value, 'component_description'); // Max
            if (!checkRegexRes.passed)
                valid = false, errors.push(checkRegexRes.error);
            if (!checkMinLengthRes.passed)
                valid = false, errors.push(checkMinLengthRes.error);
            if (!checkMaxLengthRes.passed)
                valid = false, errors.push(checkMaxLengthRes.error);
            // Return
            return {
                valid: valid,
                value: value,
                uriComponentEncoded: encodeURIComponent(value),
                errors: errors
            };
        }
        else
            return {
                valid: valid,
                value: value,
                uriComponentEncoded: '',
                errors: errors
            };
    });
}
module.exports = validateComponentDescription;
export {};
