// Convert string to lower case and replace spaces with underscores
export const __convertStringLowerUnderscore = (string: string) => {
    return string.toLowerCase().replaceAll(' ', '_');
}

// Generate error string
interface generateErrorStringInp {
    code: number
    origin: string
    message: string
}
export const __generateErrorString = (error: generateErrorStringInp): string => {
    return `Lucid Error! Code: ${error.code}, Origin: ${origin}, Message: ${error.message}!`;
}