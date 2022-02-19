import { useEffect } from 'react';
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
    update_data: (_id: mod_contentTypesConfigModel["_id"], group_id: mod_contentTypesDatabaseModel["group_id"], data: mod_contentTypesDatabaseModel["value"]) => void
}

const EditPageComponent: React.FC<editPageComponentProps> = ({ page_component, exit, update_data }) => {

    useEffect(() => {
        return () => {}
    }, [page_component]);


    // BUild content type field elements
    const contentTypeFields: Array<React.ReactElement> = [];
    for(let i = 0; i < page_component.content_types.length; i++) {
        const contentType = page_component.content_types[i];
        // Find corresponding data
        const correspondingData = page_component.data.find( x => x.config_id ===  contentType._id);
        switch(contentType.type) {
            case 'text': {
                if(correspondingData)
                contentTypeFields.push(<ContentTypeFieldText key={contentType._id} content_type={contentType} update_data={update_data} data={correspondingData}/>)
                break;
            }
            case 'number': {
                if(correspondingData)
                contentTypeFields.push(<ContentTypeFieldNumber key={contentType._id} content_type={contentType} update_data={update_data}  data={correspondingData}/>);
                break;
            }
            case 'repeater': {
                contentTypeFields.push(<ContentTypeFieldRepeater key={contentType._id} content_type={contentType}/>);
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