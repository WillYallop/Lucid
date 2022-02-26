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
        let queryObject: sapa_gen_pageComponentsQueryObj = {
            mutation: {
                page_components: {
                    update_multiple: {
                        __args: {
                            data: []
                        },
                        _id: true,
                        page_id: true,
                        component_id: true,
                        position: true
                    }
                }
            }
        };
        // If updateConfig.componentPositions is true
        // For components that have not being added in this session create 
        page.page_components.forEach((pageComp) => {
            // Check if its a new component
            const newComponent = updateConfig.addComponents.findIndex( x => x === pageComp._id );
            // component position is the only thing that can be updated!
            if(updateConfig.componentPositions && newComponent === -1) {
                save = true;
                queryObject.mutation.page_components.update_multiple.__args.data.push({
                    _id: pageComp._id,
                    position: pageComp.position
                });
            }
            else {
                // If it a new component
                if(newComponent !== -1) {
                    save = true;
                    queryObject.mutation.page_components.update_multiple.__args.data.push({
                        _id: pageComp._id,
                        position: pageComp.position,
                        component_id: pageComp.component_id,
                        page_id: pageComp.page_id
                    });
                }
            }
        });
        return {
            save: save,
            query: save ? jsonToGraphQLQuery(queryObject, { pretty: true }) : ''
        }
    }
    catch(err) {
        throw(err);
    }
}

// Handles generating the query for the content_type_field_group table
const gen_groupQuery = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        let save = false;
        let queryObject: sapa_gen_groupQueryObj = {
            mutation: {
                content_type_field : {
                    update_multiple_groups: {
                        __args: {
                            data: []
                        },
                        _id: true
                    }
                }
            }
        };  

        // loop over group data and push to query object
        const handleGroupData = (groupData: Array<mod_contentTypeFieldGroupModel>) => {
            save = true;
            groupData.forEach((group) => {
                queryObject.mutation.content_type_field.update_multiple_groups.__args.data.push(group);
            });
        }

        // add group data for modified components.
        updateConfig.modifiedComponents.forEach((compID) => {
            // Find the coressponding page component and
            const pageComp = page.page_components.find( x => x._id === compID );
            if(pageComp != undefined) handleGroupData(pageComp.groups);
        });
        // add group data for new components.
        updateConfig.addComponents.forEach((compID) => {
            const pageComp = page.page_components.find( x => x._id === compID );
            if(pageComp != undefined) handleGroupData(pageComp.groups);
        });

        return {
            save: save,
            query: save ? jsonToGraphQLQuery(queryObject, { pretty: true }) : ''
        }
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