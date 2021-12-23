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
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    }
}