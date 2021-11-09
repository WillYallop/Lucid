"use strict";
{
    const fs = require('fs');
    function verifyFileExists(path) {
        if (fs.existsSync(path))
            return true;
        else
            return false;
    }
    module.exports = verifyFileExists;
}
