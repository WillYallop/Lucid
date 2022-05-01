import fileUpload from 'express-fileupload';
// @ts-ignore
import { ImagePool } from '@squoosh/lib';

export default async (file: fileUpload.UploadedFile) => {
    try {
        const res: Array<med_storeInp> = [];
        const imagePool = new ImagePool();

        const image = imagePool.ingestImage(file.data);
        const decoded = await image.decoded;

        const encodeOptions = {
            mozjpeg: {
                quality: 90
            },
            oxipng: {
                quality: 90
            },
            avif: {
                quality: 90
            },
            webp: {
                quality: 90
            }
        }
        await image.encode(encodeOptions);

        const jpegRaw = (await image.encodedWith.mozjpeg).binary;
        const webpRaw = (await image.encodedWith.webp).binary;
        const pngRaw = (await image.encodedWith.oxipng).binary;
        const avifRaw = (await image.encodedWith.avif).binary;
        res.push({
            data: Buffer.from( new Uint8Array(jpegRaw) ),
            mime: 'image/jpeg'
        });
        res.push({
            data: Buffer.from( new Uint8Array(webpRaw) ),
            mime: 'image/webp'
        });
        res.push({
            data: Buffer.from( new Uint8Array(pngRaw) ),
            mime: 'image/png'
        });
        res.push({
            data: Buffer.from( new Uint8Array(avifRaw) ),
            mime: 'image/avif'
        });

        await imagePool.close();
        return {
            width: decoded.bitmap.width,
            height: decoded.bitmap.height,
            images: res
        };
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}