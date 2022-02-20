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
    addRepeaterGroup: (content_type: mod_contentTypesConfigModel, parent_group_id: mod_contentTypesDatabaseModel["parent_group_id"]) => void
}

const EditPageComponent: React.FC<editPageComponentProps> = ({ page_component, exit, updateData, addRepeaterGroup }) => {

    useEffect(() => {
        return () => {}
    }, [page_component]);


    // page_component_id: mod_pageComponentsModel["_id"] // component_id referes to the page_components tables _id - not the theme/config components ID
    // config_id: mod_contentTypesConfigModel["_id"]
    // group_id?: string
    // value: any

    const getRepeaterGroups = (repeater_id: mod_contentTypesConfigModel["_id"], group_id: mod_contentTypesDatabaseModel["group_id"]) => {
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

        // get all page component data that has its parent_config_id set to the above repeater ID
        page_component.data.filter((data) => {
            if(data.parent_config_id === repeater_id && data.group_id && data.parent_group_id === group_id)  {
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

        return results;
    }

    // const getRepeaterGroupsOld = (repeater_id: mod_contentTypesConfigModel["_id"]) => {

    //     // Get all children content types that are not repeaters
    //     const results: { [key: string]: Array<ReactElement> } = {};
    //     let childrenData: Array<mod_contentTypesDatabaseModel> = [];
        
    //     page_component.content_types.filter((obj) => {
    //         if(obj.parent === repeater_id) {
    //             childrenData = childrenData.concat(page_component.data.filter( x => x.config_id  === obj._id));
    //         }
    //     });

    //     console.log(childrenData);

    //     // Group unique datas together by group_id
    //     const uniqueGroups: {
    //         [key: string]: Array<mod_contentTypesDatabaseModel>
    //     } = {};
    //     childrenData.forEach((childData) => {
    //         if(childData.group_id != undefined) {
    //             if(uniqueGroups[childData.group_id]) uniqueGroups[childData.group_id].push(childData);
    //             else uniqueGroups[childData.group_id] = [childData];
    //         }
    //     });

    //     // 
    //     for(const groupID in uniqueGroups) {
    //         let arr: Array<ReactElement> = [];
    //         uniqueGroups[groupID].forEach((contentTypeData) => {
    //             // Get the corresponding content type
    //             const contentType = page_component.content_types.find( x => x.parent === repeater_id && x._id === contentTypeData.config_id);
    //             if(contentType != undefined) {
    //                 // push element to arr
    //                 switch(contentType.type) {
    //                     case 'text': {
    //                         arr.push(<ContentTypeFieldText key={contentType._id} content_type={contentType} updateData={updateData} data={contentTypeData}/>)
    //                         break;
    //                     }
    //                     case 'number': {
    //                         arr.push(<ContentTypeFieldNumber key={contentType._id} content_type={contentType} updateData={updateData}  data={contentTypeData}/>);
    //                         break;
    //                     }
    //                     case 'repeater': {
    //                         arr.push(<ContentTypeFieldRepeater key={contentType._id} content_type={contentType} getGroups={getRepeaterGroups} addRepeaterGroup={addRepeaterGroup} />);
    //                         break;
    //                     }
    //                 }
    //             }
    //         });
    //         // Push
    //         results[groupID] = arr;
    //     }

    //     return results;
    // }


    // BUild content type field elements
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