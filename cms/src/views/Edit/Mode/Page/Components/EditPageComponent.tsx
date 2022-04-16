import { ReactElement, useEffect, useContext, useState, useRef } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Components
import CoreIcon from '../../../../../components/Core/Icon';
import ContentTypeFieldText from './ContentTypeFields/Text';
import ContentTypeFieldNumber from './ContentTypeFields/Number';
import ContentTypeFieldRepeater from './ContentTypeFields/Repeater';
// Context
import { PageContext, UpdatedDataContext } from '../functions/pageContext';
// Icons
import { faSignInAlt, faTh } from '@fortawesome/free-solid-svg-icons';
// Functions
import formatLucidError from '../../../../../functions/formatLucidError';
// data
import { getSinglePageComponent } from '../../../../../data/pageComponents';


interface editPageComponentProps {
    page_component_id: mod_page_componentModel["_id"]
    generateComponent: (mode: 'live' | 'provided', pageData?: mod_pageModel, pageComponentID?: mod_componentModel["_id"]) => void
    exit: () => void
    setCanSave: (state: boolean) => void
    addNotification: (message: string, type: 'error' | 'warning' | 'success') => void
}

const EditPageComponent: React.FC<editPageComponentProps> = ({ page_component_id, exit, setCanSave, addNotification, generateComponent }) => {

    const mounted = useRef(false);

    const { page, setPage } = useContext(PageContext);
    const { updatedData, setUpdatedData } = useContext(UpdatedDataContext);
    const [ pageComponent, setPageComponent ] = useState({} as mod_page_componentModel);
    const [ pageReady, setPageReady ] = useState(false);


    // ---------------------------------------------------------------------/
    // - FUNCTIONS ---------------------------------------------------------/
    // ---------------------------------------------------------------------/


    const setCanSavePageComponent = (pageCompID: mod_pageComponentsModel["_id"]) => {
        if(updatedData != undefined) {
            // update updateData status
            // if not a new component, add to modified components object
            let findNewComp = updatedData.addComponents.findIndex( x => x === pageCompID);
            let findAlreadyModified = updatedData.modifiedComponents.findIndex( x => x === pageCompID);
            if(findNewComp === -1 && findAlreadyModified === -1) {
                updatedData.modifiedComponents.push(pageCompID);
                setUpdatedData({
                    ...updatedData
                });
            }
            // set allow save
            setCanSave(true);
        }
    }
    
    // Handle adding in missing data and groups. Needed for if a user updates a components content types, where that component is already used in a page.
    const createMissingData = (pageCompData: mod_page_componentModel) => {
        // for config types at root, if not a repeater, check if they have data
        if(pageCompData.content_types) {

            // Build component data
            const componentDataGroups: Array<mod_contentTypeFieldGroupModel> = [];
            const componentData: Array<mod_contentTypesDatabaseModel> = [];

            // Check repeater children groups for missing data
            const checkRepeaterChildren = (contentTypeID: mod_contentTypesConfigModel["_id"], buildGroup: boolean, parentGroupID?: string | null) => {
                // check for content types that dont have data
                if(!buildGroup) {
                    // Get all children content types
                    const childrenContentTypes = pageCompData.content_types.filter((ct) => {
                        if(ct.parent === contentTypeID) return ct;
                    });
                    const groups = pageCompData.groups.filter((group) => {
                        if(group.parent_config_id === contentTypeID) return group;
                    });
                    // find all instances of these content types in the data array
                    for(let i = 0; i < childrenContentTypes.length; i++) {
                        const childCT = childrenContentTypes[i];
                        const cTData = pageCompData.data.filter((data) => {
                            if(data.config_id === childCT._id) return data;
                        });
                        if(cTData.length === 0) {
                            // for each group in this repeater, add the data
                            // If this is a repeater, call this function recursivly.
                            for(let gi = 0; gi < groups.length; gi++) {
                                if(childCT.type !== 'repeater')  {
                                    componentData.push({
                                        page_component_id: pageCompData._id,
                                        config_id: childCT._id,
                                        value: childCT.config.default || '',
                                        group_id: groups[gi]._id,
                                        root: false
                                    });
                                }
                                else {
                                    componentData.push({
                                        page_component_id: pageCompData._id,
                                        config_id: childCT._id,
                                        value: null,
                                        group_id: groups[gi]._id,
                                        root: false
                                    });
                                    checkRepeaterChildren(childCT._id, true, groups[gi]._id);
                                }
                            } 
                        }
                    }
                }
                // build group and data for all of the repeaters children content types
                else {
                    const groupObj: mod_contentTypeFieldGroupModel = {
                        _id: uuidv1(),
                        page_component_id: pageCompData._id,
                        parent_group: parentGroupID,
                        parent_config_id: contentTypeID,
                        position: 1
                    }
                    componentDataGroups.push(groupObj);
                    // add data for repeaters children
                    pageCompData.content_types.forEach((contentType) => {
                        if(contentType.parent === contentTypeID && contentType.type !== 'repeater') {
                            componentData.push({
                                page_component_id: pageCompData._id,
                                config_id: contentType._id,
                                value: contentType.config.default || '',
                                group_id: groupObj._id,
                                root: false
                            });
                        } 
                        else if(contentType.parent === contentTypeID && contentType.type === 'repeater') {
                            componentData.push({
                                page_component_id: pageCompData._id,
                                config_id: contentType._id,
                                value: null,
                                group_id: groupObj._id,
                                root: false
                            });
                            checkRepeaterChildren(contentType._id, true, groupObj._id);
                        }
                    });
                }
            }

            // Create root data if missing
            for(let i = 0; i < pageCompData.content_types.length; i++) {
                const contentType = pageCompData.content_types[i];
                
                // For root content types that are not repeaters
                if(contentType.parent === 'root' && contentType.type !== 'repeater') {
                    // Check if we have data
                    const dataInd = pageCompData.data.findIndex( x => x.config_id === contentType._id);
                    if(dataInd === -1) {
                        componentData.push({
                            page_component_id: pageCompData._id,
                            config_id: contentType._id,
                            value: contentType.config.default || '',
                            group_id: null,
                            root: true
                        });
                    }
                }
                // For all repeaters
                else if(contentType.parent === 'root' && contentType.type === 'repeater') {
                    let buildEntireGroup = false;
                    // Check the repeater has data
                    // If the repeater doesnt have data, we can assume its children doesnt either
                    const dataInd = pageCompData.data.findIndex( x => x.config_id === contentType._id);
                    if(dataInd === -1) {
                        buildEntireGroup = true;
                        componentData.push({
                            page_component_id: pageCompData._id,
                            config_id: contentType._id,
                            value: null,
                            group_id: null,
                            root: true
                        });
                    }
                    checkRepeaterChildren(contentType._id, buildEntireGroup, null);
                }
                else continue;

            }

            if(componentData.length || componentDataGroups.length) setCanSavePageComponent(pageCompData["_id"]);
            pageCompData.data = pageCompData.data.concat(componentData);
            pageCompData.groups = pageCompData.groups.concat(componentDataGroups);
            setPageComponent(pageCompData);

            
            setPageReady(true);
        }
    }

    // Donwload the page component, if it doesnt have data already
    const setPageComponentHandler = () => {
        if(updatedData !== undefined && page !== undefined) {
            // Check if the page component ID exists in updatedData.pageComponentDownloaded
            const findIfDownloaded = updatedData.pageComponentDownloaded.find( x => x === page_component_id );
            if(findIfDownloaded !== undefined) {
                // Find component in the page state
                const pageComp = page?.page_components.find( x => x._id === page_component_id );
                if(pageComp != undefined) createMissingData(pageComp);
                else throw new Error('this page cannot be found!');
            }
            else {
                // Download page
                getSinglePageComponent({
                    __args: {
                        _id: page_component_id
                    },
                    _id: true,
                    component_id: true,
                    position: true,
                    component: {
                        _id: true,
                        name: true,
                        preview_url: true,
                        file_path: true,
                        file_name: true,
                        date_added: true,
                        description: true,
                        date_modified: true,
                    },
                    content_types: {
                        _id: true,
                        name: true,
                        type: true,
                        parent: true,
                        config: {
                            min: true,
                            max: true,
                            default: true,
                        }
                    },
                    groups: {
                        _id: true,
                        page_component_id: true,
                        parent_group: true,
                        parent_config_id: true,
                        position: true,
                    },
                    data: {
                        page_component_id: true,
                        config_id: true,
                        value: true,
                        group_id: true,
                        root: true,
                    }
                },
                (response) => {
                    const pageComponent: mod_page_componentModel = response.data.data.page_components.get_single || {};
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
                        createMissingData(pageComponent);
                    }
                    else {
                        addNotification(formatLucidError(response.data.errors[0].message).message,'error');
                    }
                },
                (err) => {
                    addNotification('there was an unexpected error while getting the page data.','error');
                });
            }
        }
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
                            data={data}
                            totalGroups={totalGroups}/>;
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
    const totalGroups = (config_id: mod_contentTypesConfigModel["_id"], group_id?: mod_contentTypesDatabaseModel["group_id"]) => {
        let total = 0;
        pageComponent.groups.filter((group) => {
            if(group.parent_group === group_id && group.parent_config_id === config_id) total++;
        });
        return total;
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
                    setCanSavePageComponent(pageComponent._id);
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
                                value: null,
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
    if(pageComponent !== undefined && pageComponent.content_types !== undefined) {
        for(let i = 0; i < pageComponent.content_types.length; i++) {
            const contentType = pageComponent.content_types[i];
            // Find corresponding data
            const correspondingData = pageComponent.data.find( x => x.config_id === contentType._id);
            if(contentType.parent === 'root') {
                if(correspondingData !== undefined) {
                    switch(contentType.type) {
                        case 'text': {
                            contentTypeFields.push(<ContentTypeFieldText key={contentType._id} content_type={contentType} updateData={updateContentTypeData} data={correspondingData}/>)
                            break;
                        }
                        case 'number': {
                            contentTypeFields.push(<ContentTypeFieldNumber key={contentType._id} content_type={contentType} updateData={updateContentTypeData}  data={correspondingData}/>);
                            break;
                        }
                        case 'repeater': {
                            contentTypeFields.push(
                                <ContentTypeFieldRepeater 
                                    key={contentType._id} 
                                    content_type={contentType} 
                                    getGroups={getRepeaterGroups} 
                                    deleteGroup={deleteRepeaterGroup}
                                    addRepeaterGroup={addRepeaterDataGroup} 
                                    data={correspondingData}
                                    totalGroups={totalGroups}/>
                            );
                            break;
                        }
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
            generateComponent('provided', undefined, page_component_id);
            setPageComponent({} as mod_page_componentModel);
            setPageReady(false);
        }
    }, [page_component_id]);


    if(pageReady) {
        return (
            <div className="editPageCon">
                {/* Header */}
                <div className="pagePreviewRow">
                    <button
                        className={`btnStyle3`} 
                        onClick={exit}>
                        <CoreIcon 
                            icon={faSignInAlt}
                            style={'flip-horizontal'}/>
                        page preview
                    </button>
                </div>
                <div className="editHeaderRow componentData">
                    <div className="imgCon">
                        {
                            pageComponent.component?.preview_url ?
                            <img src={pageComponent.component.preview_url}/>
                            : 
                            <FontAwesomeIcon icon={faTh}/>
                        }
                    </div>
                    <div className='textarea'>
                        <h2>{ pageComponent.component?.name }</h2>
                        { pageComponent.component?.description ? <p>{ pageComponent.component?.description }</p> : null }
                    </div>
                </div>
                <div className="editCompBody">
                    {/* Content Type Fields */}
                    { contentTypeFields }
                </div>
            </div>
        )
    }
    else {
        return (
            <></>
        )
    }

}

export default EditPageComponent;