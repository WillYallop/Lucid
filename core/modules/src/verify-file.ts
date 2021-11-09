export {};

const fs = require('fs');

function verifyFileExists(path: string) {
    if (fs.existsSync(path)) return true
    else return false
}

module.exports = verifyFileExists;