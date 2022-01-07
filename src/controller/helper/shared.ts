

// Handles merging and turning the verify.fields array into single errors array. 
export const __verifyFieldsToErrorArray = (errors: Array<core_errorMsg>, verifyFields: Array<vali_validateFieldResponse>): Array<core_errorMsg> => {
    let errorArray = errors;
    verifyFields.forEach((field) => {
        errorArray = errorArray.concat(field.errors);
    });
    return errorArray;
}

// Convert string to lower case and replace spaces with underscores
export const __convertStringLowerUnderscore = (string: string) => {
    return string.toLowerCase().replaceAll(' ', '_');
}