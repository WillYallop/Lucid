import { ReactElement, useEffect } from 'react';
// Components
import CoreIcon from '../../../../../components/Core/Icon';
import LargeComponentRow from './LargeComponentRow';
import ContentTypeFieldText from './ContentTypeFields/Text';
import ContentTypeFieldNumber from './ContentTypeFields/Number';
import ContentTypeFieldRepeater from './ContentTypeFields/Repeater';
// Icons
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface editPageComponentProps {
    page_component: mod_page_componentModel
    exit: () => void
    updateData: (_id: mod_contentTypesConfigModel["_id"], group_id: mod_contentTypesDatabaseModel["group_id"], data: mod_contentTypesDatabaseModel["value"]) => void
    addRepeaterGroup: (content_type: mod_contentTypesConfigModel, parent_group_id: mod_contentTypesDatabaseModel["group_id"]) => void
}

const EditPageComponent: React.FC<editPageComponentProps> = ({ page_component, exit, updateData, addRepeaterGroup }) => {

    useEffect(() => {
        // console.log(page_component)
        return () => {}
    }, [page_component]);


    const getRepeaterGroups = (config_id: mod_contentTypesConfigModel["_id"], group_id?: mod_contentTypesDatabaseModel["group_id"]) => {
        const results: { [key: string]: Array<ReactElement> } = {};
        const groupDatas = page_component.groups.filter( x => x.parent_group === group_id && x.parent_config_id === config_id);
        
        const addCorrespondingContentTypeEle = (data: mod_contentTypesDatabaseModel) => {
            // Get the corresponding content type
            const contentType = page_component.content_types.find( x => x._id === data.config_id);
            if(contentType != undefined) {
                // push element to arr
                switch(contentType.type) {
                    case 'text': {
                        return <ContentTypeFieldText key={contentType._id} content_type={contentType} updateData={updateData} data={data}/>
                    }
                    case 'number': {
                        return <ContentTypeFieldNumber key={contentType._id} content_type={contentType} updateData={updateData}  data={data}/>
                    }
                    case 'repeater': {
                        return <ContentTypeFieldRepeater key={contentType._id} content_type={contentType} getGroups={getRepeaterGroups} addRepeaterGroup={addRepeaterGroup} data={data}/>;
                    }
                }
            }
        }

        groupDatas.forEach((groupData) => {
            // get all page component data that has its parent_config_id set to the above repeater ID
            page_component.data.filter((data) => {
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

    const getRepeaterGroupsOld = (repeater_id: mod_contentTypesConfigModel["_id"], group_id?: string) => {

        const results: { [key: string]: Array<ReactElement> } = {};
        const addCorrespondingContentTypeEle = (data: mod_contentTypesDatabaseModel) => {
            // Get the corresponding content type
            const contentType = page_component.content_types.find( x => x._id === data.config_id);
            if(contentType != undefined) {
                // push element to arr
                switch(contentType.type) {
                    case 'text': {
                        return <ContentTypeFieldText key={contentType._id} content_type={contentType} updateData={updateData} data={data}/>
                    }
                    case 'number': {
                        return <ContentTypeFieldNumber key={contentType._id} content_type={contentType} updateData={updateData}  data={data}/>
                    }
                    case 'repeater': {
                        return <ContentTypeFieldRepeater key={contentType._id} content_type={contentType} getGroups={getRepeaterGroups} addRepeaterGroup={addRepeaterGroup} data={data}/>;
                    }
                }
            }
        }

        // Find the corresponding group obj that has the parent group of _id: group_id and parent_config_id of repeater_id
        const groupData = page_component.groups.find( x => x.parent_group === group_id && x.parent_config_id === repeater_id );


        if(groupData != undefined) {
            // get all page component data that has its parent_config_id set to the above repeater ID
            page_component.data.filter((data) => {
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
        }

        return results;
    }


    // Build content type field elements
    const contentTypeFields: Array<React.ReactElement> = [];
    for(let i = 0; i < page_component.content_types.length; i++) {
        const contentType = page_component.content_types[i];
        // Find corresponding data
        const correspondingData = page_component.data.find( x => x.config_id === contentType._id);
        if(contentType.parent === 'root') {
            switch(contentType.type) {
                case 'text': {
                    if(correspondingData)
                    contentTypeFields.push(<ContentTypeFieldText key={contentType._id} content_type={contentType} updateData={updateData} data={correspondingData}/>)
                    break;
                }
                case 'number': {
                    if(correspondingData)
                    contentTypeFields.push(<ContentTypeFieldNumber key={contentType._id} content_type={contentType} updateData={updateData}  data={correspondingData}/>);
                    break;
                }
                case 'repeater': {
                    if(correspondingData)
                    contentTypeFields.push(<ContentTypeFieldRepeater key={contentType._id} content_type={contentType} getGroups={getRepeaterGroups} addRepeaterGroup={addRepeaterGroup} data={correspondingData}/>);
                    break;
                }
            }
        }
    }

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
            <LargeComponentRow component={page_component.component}/>

            {/* Content Type Fields */}
            <h2>component fields</h2>
            
            { contentTypeFields }

        </div>
    )
}

export default EditPageComponent;