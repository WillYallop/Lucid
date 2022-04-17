import path from 'path';
const config = require(path.resolve('./lucid.config.js'));

const pgp = require('pg-promise')(/* options */);
export default pgp(`postgres://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.database}`);