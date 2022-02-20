import { ReactElement } from "react";
// Components
import CoreIcon from '../../../../../../components/Core/Icon';
// Icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface contentTypeFieldRepeaterProps {
    content_type: mod_contentTypesConfigModel
    getGroups: (repeater_id: mod_contentTypesConfigModel["_id"]) => { [key: string]: Array<ReactElement> }
    addRepeaterGroup: (content_type: mod_contentTypesConfigModel) => void
}

const ContentTypeFieldRepeater: React.FC<contentTypeFieldRepeaterProps> = ({ content_type, getGroups, addRepeaterGroup }) => {

    //Page Children
    const getReapterGroups = () => {
        const groups = getGroups(content_type._id);
        let groupElements: Array<ReactElement> = [];
        let count = 1;
        for(const groupID in groups) { 
            groupElements.push((
                <div className='groupContainer' key={groupID}>
                    <div className="groupIcon">
                        { count++ }
                    </div>
                    <div className="groupContent">
                        { groups[groupID]} 
                    </div>
                </div>
            ))
        }
        return groupElements;
    }

    return (
        <>
            <div className="contentTypeFieldCon repeaterType blockCon">
                <div>
                    <p>repeater</p>
                    <p className="subTitle">max children: { content_type.config.max }</p>
                </div>
                <div>
                    <button 
                        className='btnStyleBlank'
                        onClick={() => {
                            addRepeaterGroup(content_type)
                        }}>
                        <CoreIcon icon={faPlus}/>
                    </button>
                </div>
            </div>
            { getReapterGroups() }
        </>
    )
}

export default ContentTypeFieldRepeater;