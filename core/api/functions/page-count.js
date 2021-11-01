// Models
const Pages = require('../models/pages');

module.exports = function getPageCount() {
    return new Promise((resolve) => {
        Pages.count()
        .then((response) => {
            resolve(response)
        })
        .catch((err) => {
            resolve(0)
        })
    })
}