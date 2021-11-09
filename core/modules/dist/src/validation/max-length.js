var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const errorCodeKey = 'validation_';
function checkMaxLength(max, value, calledName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (max !== false) {
            if (value != undefined) {
                if (value.length > max) {
                    return {
                        passed: false,
                        error: { code: `${errorCodeKey}exceeds_max_length`, msg: `Value: "${value}" is too large for field "${calledName}".` }
                    };
                }
                else {
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
    });
}
module.exports = checkMaxLength;
export {};
