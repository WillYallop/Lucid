// Components
import CoreIcon from '../../components/Core/Icon';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFont, faInfinity, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { ReactElement } from 'react';

interface contentTypeProps {
    contentType: mod_contentTypesConfigModel
    actionForm: (actionType: 'update' | 'create' | 'repeater', contentType__id?: string) => void
}
export interface mod_contentTypesConfigModel {
    _id: string
    name: string // this is the custom name the user gives to the content type
    type: 'text' | 'email' | `rich_media` | 'number' | `range` | 'repeater' | 'select' | 'date' | 'media' | 'boolean' | 'json'
    config: {
        max_length?: number
        min_length?: number
        max_range?: number
        min_range?: number
        default_num?: number
        default_str?: string
        max_repeats?: number
    }
    // Only type of repeater has this:
    fields?: Array<mod_contentTypesConfigModel>
}

const ContentTypeRow: React.FC<contentTypeProps> = ({ contentType, actionForm }) => {

    let ContentTypeIcon;
    switch(contentType.type) {
        case 'text': {
            ContentTypeIcon = <FontAwesomeIcon icon={faFont}/>;
            break;
        }
        case 'repeater': {
            ContentTypeIcon = <FontAwesomeIcon icon={faInfinity}/>;
            break;
        }
        case 'number': {
            ContentTypeIcon = <FontAwesomeIcon icon={faKeyboard}/>;
            break;
        }
    }

    let repeaterBodyItems: Array<ReactElement> = []; 
    if(contentType.type === 'repeater' && contentType.fields) {
        for(let i = 0; i < contentType.fields.length; i++) {
            repeaterBodyItems.push(
                <ContentTypeRow 
                    key={contentType.fields[i]._id} 
                    contentType={ contentType.fields[i]} 
                    actionForm={actionForm}/>
            )
        }
        repeaterBodyItems.push(
            <button 
                key={contentType._id+'-addContentTypeBtn'} 
                className={`btnStyle1 ${ contentType.fields.length ? 'btnStyle1--margin-top' : '' }`}
                onClick={() => actionForm('repeater', contentType._id)}>
                Add Content Type
            </button>);
    }

    return (
        <>
            <div className='contentTypeRow blockCon__row-style layout__flex layout__space-between layout__align-center'>
                <div className="main layout__flex layout__align-center">
                    <div className="icon layout__flex layout__justify-center layout__align-center">
                        { ContentTypeIcon }
                    </div>
                    <div className="textarea">
                        <p className='bold capitalise'>{ contentType.name.replaceAll('_', ' ') }</p>
                        <p>{ contentType.type }</p>
                    </div>
                </div>
                <div className="iconCol layout__flex">
                    <button className='btnStyleBlank' onClick={() => actionForm('update', contentType._id)}>
                        <CoreIcon icon={faEdit}/>
                    </button>
                    <CoreIcon icon={faTrashAlt} style={'warning'}/>
                </div>
            </div>
            { 
                repeaterBodyItems.length 
                ? 
                    <div className='contentTypeRowBody'>
                        { repeaterBodyItems } 
                    </div>
                : null 
            }
        </>
    )

}

export default ContentTypeRow;