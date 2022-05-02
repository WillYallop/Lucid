import { v1 as uuidv1 } from 'uuid';
// @ts-ignore
import mime from 'mime-types';
import * as fs from 'fs-extra';
import s3 from '../../functions/s3_client';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const cdnDir = path.resolve(`${config.build}/cdn`);

const storeWithS3 = (data: Buffer, key: string, mime: mod_validMimes | string) => {
    try {
        const params = {
            Bucket: config.storage.aws.bucket,
            Key: key,
            Body: data,
            ContentType: mime,
            ACL: 'public-read'
        }
        s3.upload(params, (err: any, data: any) => {
            if (err) {
              throw(err);
            }
        });
    }
    catch(err) {
        throw err;
    }
}

const storeWidthFS = (data: Buffer, name: string) => {
    try {
       fs.writeFileSync(`${cdnDir}/${name}`, data);
    }
    catch(err) {
        throw err;
    }
}

export default async (files: Array<med_storeInp>, updateKey?: mod_mediaModel["key"]) => {
    try {
        const key = updateKey || uuidv1();
        const types: mod_mediaModel["types"]["data"] = [];

        if(config.storage.location === 'local') {
            if(!fs.existsSync(cdnDir)) { fs.mkdirSync(cdnDir); }
        }

        for await(const file of files) {
            const extension = mime.extension(file.mime);
            types.push(extension);
            if(config.storage.location === 'local') await storeWidthFS(file.data, `${key}.${extension}`);
            else if(config.storage.location === 'aws') await storeWithS3(file.data, `${key}.${extension}`, file.mime)
        }
        return {
            key: key,
            types: types
        }
    }
    catch(err) {
        throw err;
    }
}