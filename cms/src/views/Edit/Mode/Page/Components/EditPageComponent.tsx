import { ReactElement, useEffect, useContext, useState, useRef } from 'react';
import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';
// Components
import CoreIcon from '../../../../../components/Core/Icon';
import LargeComponentRow from './LargeComponentRow';
import ContentTypeFieldText from './ContentTypeFields/Text';
import ContentTypeFieldNumber from './ContentTypeFields/Number';
import ContentTypeFieldRepeater from './ContentTypeFields/Repeater';
// Context
import { PageContext, UpdatedDataContext } from '../functions/PageContext';
// Icons
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
// Functions
import formatLucidError from '../../../../../functions/formatLucidError';
import getApiUrl from '../../../../../functions/getApiUrl';

interface editPageComponentProps {
    page_component_id: mod_page_componentModel["_id"]
    exit: () => void
    setCanSave: (state: boolean) => void
    addNotification: (message: string, type: 'error' | 'warning' | 'success') => void
}

const EditPageComponent: React.FC<editPageComponentProps> = ({ page_component_id, exit, setCanSave, addNotification }) => {

    const mounted = useRef(false);

    const { page, setPage } = useContext(PageContext);
    const { updatedData, setUpdatedData } = useContext(UpdatedDataContext);
    const [ pageComponent, setPageComponent ] = useState({} as mod_page_componentModel);
    const [ pageReady, setPageReady ] = useState(false);


    // ---------------------------------------------------------------------/
    // - FUNCTIONS ---------------------------------------------------------/
    // ---------------------------------------------------------------------/

    // Donwload the page component, if it doesnt have data already
    const setPageComponentHandler = () => {
        if(updatedData !== undefined && page !== undefined) {
            // Check if the page component ID exists in updatedData.pageComponentDownloaded
            const findIfDownloaded = updatedData.pageComponentDownloaded.find( x => x === page_component_id );
            if(findIfDownloaded != undefined) {
                // Find component in the page state
                const pageComp = page?.page_components.find( x => x._id === page_component_id );
                if(pageComp != undefined) setPageComponent(pageComp);
                else throw new Error('this page cannot be found!');
            }
            else {
                // Download page
                axios({
                    url: getApiUrl(),
                    method: 'post',
                    data: {
                    query: `query {
                        page_components {
                            get_single(_id: "${page_component_id}") {
                                _id
                                component_id
                                position
                                component {
                                    name
                                    preview_url
                                    file_path
                                    file_name
                                    date_added
                                    description
                                    date_modified
                                }
                                content_types {
                                    _id
                                    name
                                    type
                                    parent
                                    config {
                                        min
                                        max
                                        default
                                    }
                                }
                                groups {
                                    _id
                                    page_component_id
                                    parent_group
                                    parent_config_id
                                    position
                                }
                                data {
                                    page_component_id
                                    config_id
                                    value
                                    group_id
                                    root
                                }
                            }
                        }
                    }`
                    }
                })
                .then((result) => {
                    const pageComponent: mod_page_componentModel = result.data.data.page_components.get_single || {};
                    if(pageComponent) {
                        if(!mounted.current) return null;
                        // update page

                        let findPageComponentIndex = page?.page_components.findIndex( x => x._id === page_component_id );
                        if(findPageComponentIndex !== -1) {
                            page.page_components[findPageComponentIndex] = pageComponent;
                            setPage({
                                ...page
                            });
                            updatedData.pageComponentDownloaded.push(page_component_id);
                        }
                        // update selected
                        setPageComponent(pageComponent);

                    }
                    else {
                        addNotification(formatLucidError(result.data.errors[0].message).message,'error');
                    }
                })
                .catch((err) => {
                    addNotification('there was an unexpected error while getting the page data.','error');
                })
            }
        }
        setPageReady(true);
    }
    // Get repeater groups
    const getRepeaterGroups = (config_id: mod_contentTypesConfigModel["_id"], group_id?: mod_contentTypesDatabaseModel["group_id"]) => {
        const results: { [key: string]: Array<ReactElement> } = {};
        const groupDatas = pageComponent.groups.filter( x => x.parent_group === group_id && x.parent_config_id === config_id);
        const addCorrespondingContentTypeEle = (data: mod_contentTypesDatabaseModel) => {
            // Get the corresponding content type
            const contentType = pageComponent.content_types.find( x => x._id === data.config_id);
            if(contentType != undefined) {
                // push element to arr
                switch(contentType.type) {
                    case 'text': {
                        return <ContentTypeFieldText key={contentType._id} content_type={contentType} updateData={updateContentTypeData} data={data}/>
                    }
                    case 'number': {
                        return <ContentTypeFieldNumber key={contentType._id} content_type={contentType} updateData={updateContentTypeData}  data={data}/>
                    }
                    case 'repeater': {
                        return <ContentTypeFieldRepeater 
                            key={contentType._id} 
                            content_type={contentType}
                            getGroups={getRepeaterGroups} 
                            deleteGroup={deleteRepeaterGroup}
                            addRepeaterGroup={addRepeaterDataGroup} 
                            data={data}/>;
                    }
                }
            }
        }
        groupDatas.forEach((groupData) => {
            // get all page component data that has its parent_config_id set to the above repeater ID
            pageComponent.data.filter((data) => {
                if(groupData._id === data.group_id)  {
                    // based on the group_id, add it to an object in the results object array with the group_id as the key
                    if(results[data.group_id] != undefined) {
                        const rowEle = addCorrespondingContentTypeEle(data);
                        if(rowEle) results[data.group_id].push(rowEle);
                    }
                    else {
                        const rowEle = addCorrespondingContentTypeEle(data);
                        if(rowEle) results[data.group_id] = [rowEle];
                    }
                }
            });
        });
        return results;
    }
    // Update content type for selected page comp
    const updateContentTypeData = (_id: mod_contentTypesConfigModel["_id"], group_id: mod_contentTypesDatabaseModel["group_id"], data: mod_contentTypesDatabaseModel["value"]) => {
        if(page != undefined && updatedData != undefined) {
            // Find the corresponding page component in the page object
            const findPageComponent = page.page_components.find( x => x._id === pageComponent._id );
            if(findPageComponent !== undefined) {
                // find corresponding content type data fields
                const dataObj = findPageComponent.data.find( x => x.config_id === _id && x.group_id === group_id);
                if(dataObj !== undefined) {
                    dataObj.value = data;
                    setPageComponent({
                        ...findPageComponent
                    });
                    // update updateData status
                    // if not a new component, add to modified components object
                    let findNewComp = updatedData.addComponents.findIndex( x => x === pageComponent._id);
                    let findAlreadyModified = updatedData.modifiedComponents.findIndex( x => x === pageComponent._id );
                    if(findNewComp === -1 && findAlreadyModified === -1) {
                        updatedData.modifiedComponents.push(pageComponent._id);
                        setUpdatedData({
                            ...updatedData
                        });
                    }
                    // set allow save
                    setCanSave(true);
                }
            }
        }
    }
    // add new group for given repeater
    const addRepeaterDataGroup = (content_type: mod_contentTypesConfigModel, repeaterGroupID: mod_contentTypesDatabaseModel["group_id"]) => {
        if(content_type.type === 'repeater' && page != undefined) {
            const createGroup = () => {
                // Make recurisve to handle repeater children in the block
                // get all of the repeaters children, and create a new set of data for it!
                const componentData: Array<mod_contentTypesDatabaseModel> = [];
                const componentDataGroups: Array<mod_contentTypeFieldGroupModel> = [];

                const addRepeaterChildrenGroups = (_id: mod_contentTypesConfigModel["_id"], group_id?: mod_contentTypesDatabaseModel["group_id"]) => {
                    // Create a new group obj
                    const groupObj: mod_contentTypeFieldGroupModel = {
                        _id: uuidv1(),
                        page_component_id: pageComponent._id,
                        parent_group: group_id,
                        parent_config_id: _id,
                        position: 1
                    }
                    componentDataGroups.push(groupObj);

                    // add data for repeaters children
                    pageComponent.content_types?.forEach((contentType) => {
                        if(contentType.parent === _id && contentType.type !== 'repeater') {
                            componentData.push({
                                page_component_id: pageComponent._id,
                                config_id: contentType._id,
                                value: contentType.config.default || '',
                                group_id: groupObj._id,
                                root: false
                            });
                        } 
                        else if(contentType.parent === _id && contentType.type === 'repeater') {
                            componentData.push({
                                page_component_id: pageComponent._id,
                                config_id: contentType._id,
                                value: undefined,
                                group_id: groupObj._id,
                                root: false
                            });
                            addRepeaterChildrenGroups(contentType._id, groupObj._id);
                        }
                    });
                }
                addRepeaterChildrenGroups(content_type._id, repeaterGroupID)

                // add new data to the selectedComponent and the page state
                const findPageComponent = page.page_components.find( x => x._id === pageComponent._id );
                if(findPageComponent !== undefined) {
                    findPageComponent.groups = pageComponent.groups.concat(componentDataGroups);
                    findPageComponent.data = pageComponent.data.concat(componentData);
                    setCanSave(true);
                    setPageComponent({
                        ...findPageComponent
                    });
                }
            }
            // If the config max is defined, check the current amount of groups!
            if(content_type.config.max != null) {
                // Filter all data that belongs to this content type
                const contentTypeDataGroups = pageComponent.groups.filter( x => x.parent_group === repeaterGroupID);
                if(contentTypeDataGroups.length < parseInt(content_type.config.max)) createGroup();
                else addNotification(`you have reached the maxium number of groups (${content_type.config.max}) for this field!`, 'warning');
            }
            else createGroup();
        }
    }
    const deleteRepeaterGroup = (group_id?: mod_contentTypeFieldGroupModel["_id"]) => {
        if(group_id !== undefined && updatedData != undefined && page != undefined) {
            // Delete the group ID
            // Delete all page data with that group ID
            // Delte any groups that have the group ID as its parent_group - and so on
            const foundPageComponent = page.page_components.find( x => x._id === pageComponent._id );
            if(foundPageComponent !== undefined) {
                // If page component is not a in updatedData.addComponents,
                // add this group id to the updatedData.deleteGroups array (only the top level has to be added as the reference will delete its children)
                const isNewComponent = updatedData.addComponents.find( x => x === foundPageComponent?._id ); 
                if(isNewComponent === undefined) {
                    updatedData.deleteGroups.push(group_id);
                    setUpdatedData({ ...updatedData });
                }

                const removeDataGroupIDs: Array<string> = [];
                foundPageComponent.groups = foundPageComponent.groups.filter((group) => {
                    if(group._id === group_id) removeDataGroupIDs.push(group_id);
                    else if(group.parent_group === group_id) removeDataGroupIDs.push(group._id);
                    else return group;
                });
                foundPageComponent.data = foundPageComponent.data.filter((data) => {
                    if(data.group_id !== undefined) {
                        const findGroupID = removeDataGroupIDs.find( x => x === data.group_id ); 
                        if(!findGroupID) return data;
                    }
                    else return data;
                });
                setPageComponent({
                    ...foundPageComponent
                });
                setCanSave(true);
            }
        }
    }


    const contentTypeFields: Array<React.ReactElement> = [];
    if(pageComponent !== undefined && pageComponent.content_types != undefined) {
        for(let i = 0; i < pageComponent.content_types.length; i++) {
            const contentType = pageComponent.content_types[i];
            // Find corresponding data
            const correspondingData = pageComponent.data.find( x => x.config_id === contentType._id);
            if(contentType.parent === 'root') {
                switch(contentType.type) {
                    case 'text': {
                        if(correspondingData != undefined) {
                            contentTypeFields.push(<ContentTypeFieldText key={contentType._id} content_type={contentType} updateData={updateContentTypeData} data={correspondingData}/>)
                        }
                        break;
                    }
                    case 'number': {
                        if(correspondingData != undefined) {
                            contentTypeFields.push(<ContentTypeFieldNumber key={contentType._id} content_type={contentType} updateData={updateContentTypeData}  data={correspondingData}/>);
                        }
                        break;
                    }
                    case 'repeater': {
                        if(correspondingData != undefined) {
                            contentTypeFields.push(
                                <ContentTypeFieldRepeater 
                                    key={contentType._id} 
                                    content_type={contentType} 
                                    getGroups={getRepeaterGroups} 
                                    deleteGroup={deleteRepeaterGroup}
                                    addRepeaterGroup={addRepeaterDataGroup} 
                                    data={correspondingData}/>
                            );
                        }
                        break;
                    }
                }
            }
        }
    }


    // ---------------------------------------------------------------------/
    // - ON LOAD -----------------------------------------------------------/
    // ---------------------------------------------------------------------/
    useEffect(() => {
        mounted.current = true;
        setPageComponentHandler();
        return () => {
            mounted.current = false;
            setPageComponent({} as mod_page_componentModel);
            setPageReady(false);
        }
    }, [page_component_id]);


    if(pageReady) {
        return (
            <div className="editPageCompCon">
                {/* Header */}
                <div className="headerRow">
                    <button
                        className={`btnStyle3`} 
                        onClick={exit}>
                        <CoreIcon 
                            icon={faSignInAlt}
                            style={'flip-horizontal'}/>
                        <p>page preview</p>
                    </button>
                </div>
    
                {/* Component Row */}
                <LargeComponentRow component={pageComponent.component}/>
    
                {/* Content Type Fields */}
                <h2>component fields</h2>
                { contentTypeFields }
            </div>
        )
    }
    else {
        return (
            <h1>Loading</h1>
        )
    }

}

export default EditPageComponent;