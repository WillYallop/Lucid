import AWS from 'aws-sdk';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const cdnDir = path.resolve(`${config.build}/cdn`);

const s3 = new AWS.S3({
    accessKeyId: config.storage.aws.access_key_id,
    secretAccessKey:  config.storage.aws.secret_access_key
});

export default s3;