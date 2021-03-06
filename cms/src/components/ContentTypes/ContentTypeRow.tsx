// Components
import CoreIcon from '../../components/Core/Icon';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFont, faInfinity, faKeyboard, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ReactElement } from 'react';

interface contentTypeProps {
    contentType: mod_contentTypesConfigModel
    actionForm: (actionType: 'update' | 'create', contentType__id: mod_contentTypesConfigModel["_id"]) => void
    deleteCallback: (contentType__id: mod_contentTypesConfigModel["_id"]) => void
    getChildren: (contentType__id: mod_contentTypesConfigModel["_id"]) => Array<ReactElement>
}

const ContentTypeRow: React.FC<contentTypeProps> = ({ contentType, actionForm, deleteCallback, getChildren }) => {


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

    // Add repeater sub content type fields
    const getRepeaterChildren = () => {
        if(contentType.type === 'repeater') {
            const repeaterChildren = getChildren(contentType._id);
            return (
                <div className='contentTypeRowBody'>
                    { repeaterChildren } 
                </div>
            );
        }
        else return null;
    }

    return (
        <>  
            <div className='contentTypeRow blockCon__row-style layout__flex layout__space-between layout__align-center'>
                <div className="main layout__flex layout__align-center">
                    <div className="icon layout__flex layout__justify-center layout__align-center">
                        { ContentTypeIcon }
                    </div>
                    <div className="textarea">
                        <p className='bold'>{ contentType.name } - <span>{ contentType.name.toLowerCase().replaceAll(' ', '_') }</span></p>
                        <p>{ contentType.type }</p>
                    </div>
                </div>
                <div className="iconCol layout__flex">
                    {/* Edit this row */}
                    <button className='btnStyleBlank' onClick={() => actionForm('update', contentType._id)}>
                        <CoreIcon icon={faEdit} style={'transparent'}/>
                    </button>
                    {/* Delete this row */}
                    <button className='btnStyleBlank' onClick={() => deleteCallback(contentType._id)}>
                        <CoreIcon icon={faTrashAlt} style={'transparent--warning'}/>
                    </button>
                    {
                        contentType.type === 'repeater'
                        ?
                        <button className='btnStyleBlank space' onClick={() => actionForm('create', contentType._id)}>
                            <CoreIcon icon={faPlus}/>
                        </button>
                        :
                        null
                    }
                </div>
            </div>

            { getRepeaterChildren() }

        </>
    )

}

export default ContentTypeRow;