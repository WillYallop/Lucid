import * as fs from 'fs-extra';
import s3 from '../../functions/s3_client';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const cdnDir = path.resolve(`${config.build}/cdn`);

const deleteWithS3 = (key: mod_mediaModel["key"], extension: mod_validExt) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: config.storage.aws.bucket,
            Key: `${key}.${extension}`
        }
        s3.deleteObject(params, (err: any, data: any) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

const deleteWithFS = async (key: mod_mediaModel["key"], extension: mod_validExt) => {
    try {
        await fs.unlink(`${cdnDir}/${key}.${extension}`);
    } 
    catch(err) {
        throw err;
    }
}

export default async (key: mod_mediaModel["key"], extensions: mod_mediaModel["types"]["data"], location: mod_mediaModel["location"]) => {
    try {
        for await (const ext of extensions) {
            if(location === 'aws') await deleteWithS3(key, ext);
            else if(location === 'local') await deleteWithFS(key, ext);
            else {
                throw new Error(`unknow location type of "${location}"!`);
            }
        }
        return true;
    }
    catch(err) {
        throw err;
    }
}