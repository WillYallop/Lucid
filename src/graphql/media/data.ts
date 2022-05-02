import validate from "../../validator";
import { __generateErrorString } from "../../functions/shared";
import db from "../../db";
import { __updateSetQueryGen } from "../shared/functions";
import moment from 'moment';

export const updateSingleMedia = async (_id: mod_mediaModel["_id"], data: med_updateSingleMediaData) => {
    try {
        if(!_id) throw __generateErrorString({
            code: 400,
            message: 'no media _id provided!',
            origin: 'updateSingleMedia'
        });

        if(data.title === undefined && data.alt === undefined) throw __generateErrorString({
            code: 400,
            message: 'media title and/or alt is missing. you must pass at least one!',
            origin: 'updateSingleMedia'
        });

        const validateObj: Array<vali_validateFieldObj> = [];
        const mediaUpdateObj: med_updateSingleMediUpdateObj = {
            modified: moment().format('YYYY-MM-DD HH:mm:ss')
        };

        if(data.title !== undefined) {
            validateObj.push({
                method: 'media_title',
                value: data.title
            });
            mediaUpdateObj.title = data.title;
        }
        if(data.alt !== undefined) {
            validateObj.push({
                method: 'media_alt',
                value: data.alt
            });
            mediaUpdateObj.alt = data.alt;
        }

        await validate(validateObj);

        let updateMediaDocRes = await db.one(`UPDATE media SET ${__updateSetQueryGen(mediaUpdateObj)} WHERE _id='${_id}' RETURNING *`, mediaUpdateObj);
        updateMediaDocRes.types = updateMediaDocRes.types.data;
        return updateMediaDocRes;
    }
    catch(err) {
        throw err;
    }
}