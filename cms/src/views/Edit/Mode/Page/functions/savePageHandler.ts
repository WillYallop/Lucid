import { updateDataObjInterface } from '../index';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';


// Handles generating the query to update the page
const gen_pageQuery = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        // only field we can update the page atm is the template
        let save = false;
        let queryObject: sapa_gen_pageQueryObj = {
            mutation: {
                page: {
                    update_single: {
                        __args: {
                            _id: 'id'
                        },
                        _id: true,
                        template: true
                    }
                }
            }
        };

        // template
        if(updateConfig.template) {
            save = true;
            queryObject.mutation.page.update_single.__args.template = page.template;
        }

        return {
            save: save,
            query: save ? jsonToGraphQLQuery(queryObject, { pretty: true }) : ''
        }
    }
    catch(err) {
        throw(err);
    }
}

// Handles generating the query for all of the page components
const gen_pageComponentsQuery = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        let save = false;


        let queryObject = {
            mutation: {
                page_components: {
                    __args: {
                        _id: 'id'
                    },
                    id: true,
                    template: true,
                }
            }
        };
        // If updateConfig.componentPositions is true
        // For components that have not being added in this session create 
        // page.page_components.forEach((componet) => {

        // });

        return {
            save: save,
            query: jsonToGraphQLQuery(queryObject, { pretty: true })
        }
    }
    catch(err) {
        throw(err);
    }
}

// Handles generating the query for the content_type_field_group table
const gen_groupQuery = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
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
const gen_fieldData = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
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