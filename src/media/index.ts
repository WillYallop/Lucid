import express, { Request, Response } from "express";
import fileUpload from 'express-fileupload';
import fileHandler from './controllers/files';
import moment from 'moment';
import db from "../db";
import { __updateSetQueryGen } from "../graphql/shared/functions";

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
                const fileSaveRes = await fileHandler('uploadSingle', {
                    file: file
                });
                if(fileSaveRes) {
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
            }

            res.status(201).json({
                saved: saveMediaRes
            });

        }
        else {
            throw new Error('Error getting file.');
        }
    }
    catch(error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        res.status(500).json({
            error: message
        });
    }
}

// Update single media
export const updateSingleMedia = async (req: any, res: Response) => {
    try {

        if(!req.files) throw new Error('missing file form data');

        const id = req.params.id;
        const keys: Array<string> = Object.keys(req.files);
        const file: fileUpload.UploadedFile = req.files[keys[0]];

        if(!id) throw new Error('missing or invalid id url paramater');
        if(!file) throw new Error('missing or invalid file');

        // Get media doc
        const mediaDoc = await db.one('SELECT * FROM media WHERE _id=$1', id);
        if(!mediaDoc) throw new Error(`cannot find media document with _id of "${id}"!`);

        const fileUpdateRes = await fileHandler('updateSingle', {
            file: file,
            media_doc: mediaDoc
        });

        if(fileUpdateRes) {
            const updateObj = {
                location: fileUpdateRes.location,
                key: fileUpdateRes.key,
                alt: '',
                width: fileUpdateRes.width,
                height: fileUpdateRes.height,
                types: {
                    data: fileUpdateRes.types
                },
                modified: moment().format('YYYY-MM-DD HH:mm:ss'),
                title: file.name
            }
            const updatePageRes = await db.one(`UPDATE media SET ${__updateSetQueryGen(updateObj)} WHERE _id='${id}' RETURNING *`, updateObj);
            res.status(200).json({
                updated: updatePageRes
            });
        } 
        else throw new Error('there was an unexpected error updating this file');

    }
    catch(error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        res.status(500).json({
            error: message
        });
    }
}