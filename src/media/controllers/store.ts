import { v1 as uuidv1 } from 'uuid';
// @ts-ignore
import mime from 'mime-types';
import * as fs from 'fs-extra';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const cdnDir = path.resolve(`${config.build}/cdn`);

const storeWithS3 = async () => {
    try {

    }
    catch(err) {
        throw err;
    }
}

const storeWidthFS = async (data: Buffer, name: string) => {
    try {
       fs.writeFileSync(`${cdnDir}/${name}`, data);
    }
    catch(err) {
        throw err;
    }
}

export default async (files: Array<med_storeInp>) => {
    try {
        const key = uuidv1();
        const types: mod_mediaModel["types"]["data"] = [];

        if(config.storage.location === 'local') {
            if(!fs.existsSync(cdnDir)) { fs.mkdirSync(cdnDir); }
        }

        for await(const file of files) {
            const extension = mime.extension(file.mime);
            types.push(extension);
            if(config.storage.location === 'local') {

            }
            await storeWidthFS(file.data, `${key}.${extension}`);
        }
        return {
            key: key,
            types: types
        }
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}