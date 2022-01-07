// Key: vali_

// Interfaces
interface vali_validateFieldResponse {
    valid: boolean
    value: string,
    method: string,
    errors: Array<core_errorMsg>
}

type vali_validateFieldMethods = 'comp_name' | 'comp_description' | 'comp_verifyFileExists' | 'uuidVerify' | 'post_name' | 'temp_verifyFileExists' | 'file_isLiquidExtension' | 'cont_name' | 'menu_name' | 'menu_linkText';
interface vali_validateFieldObj {
    value: string,
    method: vali_validateFieldMethods
}
interface vali_validateResponse {
    valid: boolean,
    fields: Array<vali_validateFieldResponse>
}