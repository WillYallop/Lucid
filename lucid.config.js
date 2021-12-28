module.exports = {
    domain: process.env.DOMAIN,
    directories: {
        theme: './theme',
        templates: './templates',
        temp: './temp',
        // Dists 
        dist: './dist/app',
        assets_dist: './dist/assets',
        cms_dist: './dist/cms'
    },
    database: {
        user: process.env.DB_USER,
        name: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        address: process.env.DB_ADDRESS
    }
}