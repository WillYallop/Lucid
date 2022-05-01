import express, { Request, Response } from "express";
import fileUpload from 'express-fileupload';
import fileHandler from './controllers/files';
import moment from 'moment';
import db from "../db";


// Save single/multiple media
export const uploadMedia = async (req: any, res: Response) => {
    try {
        if(req.files) {

            const saveMediaRes: Array<mod_mediaModel> = [];
            const saveMediaDoc = async (doc: med_saveMediaDoc) => {
                const saveDocRes = await db.one('INSERT INTO media(location, key, alt, width, height, types, uploaded, modified, title) VALUES(${location}, ${key}, ${alt}, ${width}, ${height}, ${types}, ${uploaded}, ${modified}, ${title}) RETURNING *', doc);
                saveMediaRes.push(saveDocRes);
            }

            const fileKeys: Array<string> = Object.keys(req.files);
            for await(const key of fileKeys) {
                const file: fileUpload.UploadedFile = req.files[key];
                const fileSaveRes = await fileHandler(file);
                if(fileSaveRes.process) {
                    await saveMediaDoc({
                        location: fileSaveRes.location,
                        key: fileSaveRes.key,
                        alt: '',
                        width: fileSaveRes.width,
                        height: fileSaveRes.height,
                        types: {
                            data: fileSaveRes.types
                        },
                        uploaded: moment().format('YYYY-MM-DD HH:mm:ss'),
                        modified: moment().format('YYYY-MM-DD HH:mm:ss'),
                        title: file.name
                    });
                }
                else {
                    res.status(400).json({
                        err: fileSaveRes.error
                    });
                }
            }

            res.status(201).json({
                saved: saveMediaRes
            });

        }
        else {
            throw new Error('Error getting image.');
        }
    }
    catch(err) {
        res.status(500).json({
            error: err
        });
    }
}

// Update single media
export const updateSingleMedia = () => {
    try {

    }
    catch(err) {
        throw(err);
    }
}