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
function checkMinLength(min, value, calledName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (min !== false) {
            if (value != undefined) {
                if (value.length < min) {
                    return {
                        passed: false,
                        error: { code: `${errorCodeKey}min_length`, msg: `Value: "${value}" is too small for field "${calledName}".`, }
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
module.exports = checkMinLength;
export {};
