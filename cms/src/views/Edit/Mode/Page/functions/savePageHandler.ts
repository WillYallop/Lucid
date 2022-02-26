import { updateDataObjInterface } from '../index';

interface queryGenRes {
    save: boolean
    query: string
}

// Handles generating the query to update the page
const gen_pageQuery = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<queryGenRes> => {
    try {
        // only field we can update the page atm is the template
        let response = {
            save: false,
            query: `mutation {
                page {
                    update_single
                    (
                        _id: "${page._id}"
                        ${ updateConfig.template ? 'template: "'+page.template+'"' : '' }
                    )
                    {
                        _id
                        template
                    }
                }
            }`
        };
        
        // Set response.save
        if(updateConfig.template) response.save = true;
        
        return response
    }
    catch(err) {
        throw(err);
    }
}

// Handles generating the query for all of the page components
const gen_pageComponentsQuery = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<queryGenRes> => {
    try {
        let response = {
            save: false,
            query: ''
        };

        return response
    }
    catch(err) {
        throw(err);
    }
}

// Handles generating the query for the content_type_field_group table
const gen_groupQuery = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<queryGenRes> => {
    try {
        let response = {
            save: false,
            query: ''
        };

        return response
    }
    catch(err) {
        throw(err);
    }
}

// Handles generating the query for the content type, component field data
const gen_fieldData = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<queryGenRes> => {
    try {
        let response = {
            save: false,
            query: ''
        };
        
        return response
    }
    catch(err) {
        throw(err);
    }
}




export {
    gen_pageQuery,
    gen_pageComponentsQuery,
    gen_groupQuery,
    gen_fieldData
}