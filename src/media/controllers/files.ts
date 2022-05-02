import fileUpload from 'express-fileupload';
import sizeOf from 'buffer-image-size';
import optimiseImage from './optimise_image';
import deleteMedia from './delete';
import store from './store';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));

const validMimes: Array<mod_validMimes> = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/avif',
    'image/webp',
    'image/svg+xml',
    'image/gif',
    'application/pdf'
];


const uploadSingleFile = async (file: fileUpload.UploadedFile, updateKey?: mod_mediaModel["key"]) => {
    try {
        // Check files mime is valid
        const validMime = validMimes.findIndex( x => x === file.mimetype );
        if(validMime !== -1) {
            // If mime is jpeg, jpg, png, avif or webp - optimise the file
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/avif' || file.mimetype === 'image/webp') {
                const imagesData = await optimiseImage(file);
                const storeResponse = await store(imagesData.images, updateKey);
                return {
                    location: config.storage.location,
                    key: storeResponse.key,
                    types: storeResponse.types,
                    width: imagesData.width,
                    height: imagesData.height
                }
            }
            else {
                let width = undefined;
                let height = undefined;
                // if its an image type that we dont optimise, work out the width and height.
                if(file.mimetype === 'image/gif') {
                    const dimensions = sizeOf(file.data);
                    width = dimensions.width; 
                    height = dimensions.height;
                }
                // store file
                const storeResponse = await store([{
                    data: file.data,
                    mime: file.mimetype
                }], updateKey);
                return {
                    location: config.storage.location,
                    key: storeResponse.key,
                    types: storeResponse.types,
                    width: width,
                    height: height
                }
            }
        }
        else {
            throw new Error(`unsupported mime type "${file.mimetype}"!`);
        }
    }
    catch(err) {
        throw err;
    }
}

const updateSingleFile = async (file: fileUpload.UploadedFile, doc?: mod_mediaModel) => {
    try {

        if(!doc) throw new Error('no document passed to updateSingleFile');
        // delete the original media
        await deleteMedia(doc.key, doc.types.data, doc.location);
        // handle file
        const uploadFileRes = await uploadSingleFile(file, doc.key);

        return uploadFileRes;
        
    }
    catch(err) {
        throw err;
    }
}

export default async (action: 'uploadSingle' | 'updateSingle', data: med_fileHandlerDataInp) => {
    try {
        switch(action) {
            case "uploadSingle": {
                return await uploadSingleFile(data.file);
            }
            case 'updateSingle': {
                return await updateSingleFile(data.file, data.media_doc);
            }
        }
    }
    catch(err) {
        throw err;
    }
}