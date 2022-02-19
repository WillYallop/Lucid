import { useEffect } from 'react';
// Components
import CoreIcon from '../../../../../components/Core/Icon';
import LargeComponentRow from './LargeComponentRow';
import ContentTypeFieldText from './ContentTypeFields/Test';
import ContentTypeFieldNumber from './ContentTypeFields/Number';
import ContentTypeFieldRepeater from './ContentTypeFields/Repeater';
// Icons
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface editPageComponentProps {
    page_component: mod_page_componentModel
    exit: () => void
    update_data: (id: mod_contentTypesConfigModel["_id"], data: mod_contentTypesConfigModel["data"]) => void
}

const EditPageComponent: React.FC<editPageComponentProps> = ({ page_component, exit, update_data }) => {

    useEffect(() => {
        return () => {}
    }, [page_component]);

    // BUild content type field elements
    const contentTypeFields: Array<React.ReactElement> = [];
    for(let i = 0; i < page_component.content_types.length; i++) {
        switch(page_component.content_types[i].type) {
            case 'text': {
                contentTypeFields.push(<ContentTypeFieldText key={page_component.content_types[i]._id} content_type={page_component.content_types[i]} update_data={update_data}/>)
                break;
            }
            case 'number': {
                contentTypeFields.push(<ContentTypeFieldNumber key={page_component.content_types[i]._id} content_type={page_component.content_types[i]} update_data={update_data}/>);
                break;
            }
            case 'repeater': {
                contentTypeFields.push(<ContentTypeFieldRepeater key={page_component.content_types[i]._id} content_type={page_component.content_types[i]} update_data={update_data}/>);
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