// Components
import CoreIcon from '../../components/Core/Icon';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFont, faInfinity, faKeyboard } from '@fortawesome/free-solid-svg-icons';

interface contentTypeProps {
    contentType: mod_contentTypesConfigModel
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
        default_srt?: string
        max_repeats?: number
    }
    // Only type of repeater has this:
    fields?: Array<mod_contentTypesConfigModel>
}

const ContentTypeRow: React.FC<contentTypeProps> = ({ contentType }) => {

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

    return (
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
                <CoreIcon icon={faEdit}/>
                <CoreIcon icon={faTrashAlt} style={'warning'}/>
            </div>
        </div>
    )
}

export default ContentTypeRow;