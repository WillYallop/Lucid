import fileUpload from 'express-fileupload';
import sizeOf from 'buffer-image-size';
import optimiseImage from './optimise_image';
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

// Handle processing files.
// Should optimise if necessery 
// Reurn the file specific data
export default async (file: fileUpload.UploadedFile) => {
    try {
        // Check files mime is valid
        const validMime = validMimes.findIndex( x => x === file.mimetype );
        if(validMime !== -1) {
            // If mime is jpeg, jpg, png, avif or webp - optimise the file
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/avif' || file.mimetype === 'image/webp') {
                const imagesData = await optimiseImage(file);
                const storeResponse = await store(imagesData.images);
                return {
                    process: true,
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
                }]);
                return {
                    process: true,
                    location: config.storage.location,
                    key: storeResponse.key,
                    types: storeResponse.types,
                    width: width,
                    height: height
                }
            }
        }
        else {
            return {
                process: false,
                location: config.storage.location,
                key: '',
                types: [],
                error: `unsupported mime type "${file.mimetype}"!`
            }
        }
    }
    catch(err) {
        throw err;
    }
}