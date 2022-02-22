import { ReactElement } from "react";
// Components
import CoreIcon from '../../../../../../components/Core/Icon';
// Icons
import { faPlus, faTrashAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface contentTypeFieldRepeaterProps {
    content_type: mod_contentTypesConfigModel
    getGroups: (repeater_id: mod_contentTypesConfigModel["_id"], group_id?: string) => { [key: string]: Array<ReactElement> }
    addRepeaterGroup: (content_type: mod_contentTypesConfigModel, parent_group_id: mod_contentTypesDatabaseModel["group_id"]) => void
    data: mod_contentTypesDatabaseModel
    deleteGroup: (group_id?: mod_contentTypeFieldGroupModel["_id"]) => void
}

const ContentTypeFieldRepeater: React.FC<contentTypeFieldRepeaterProps> = ({ content_type, getGroups, addRepeaterGroup, data, deleteGroup }) => {

    //Page Children
    const getReapterGroups = () => {
        const groups = getGroups(content_type._id, data.group_id);
        let groupElements: Array<ReactElement> = [];
        let count = 1;
        for(const groupID in groups) { 
            groupElements.push((
                <div className='groupContainer' key={groupID}>
                    <div className="groupIcon">
                        { count }
                    </div>
                    <div className="topLevelActionBar">
                        <button className="btnStyleBlank" onClick={() => deleteGroup(groupID)}>
                            <CoreIcon icon={faTrashAlt} style={'warning'}/>
                        </button>
                        <button className="btnStyleBlank">
                            <CoreIcon icon={faChevronUp}/>
                        </button>
                        <button className="btnStyleBlank">
                            <CoreIcon icon={faChevronDown}/>
                        </button>
                    </div>
                    <div className="groupContent">
                        { groups[groupID] } 
                    </div>
                    <div className="subActionBar">
                        <button className="btnStyleBlank delete" onClick={() => deleteGroup(groupID)}>delete</button>
                        <button className="btnStyleBlank move-up">up</button>
                        <button className="btnStyleBlank move-down">down</button>
                    </div>
                </div>
            ));
            count++;
        }
        return groupElements;
    }

    return (
        <>
            <div className="contentTypeFieldCon repeaterType blockCon">
                <div>
                    <p>{content_type.name} - repeater</p>
                    <p className="subTitle">max groups: { content_type.config.max }</p>
                </div>
                <div>
                    <button 
                        className='btnStyleBlank'
                        onClick={() => {
                            addRepeaterGroup(content_type, data.group_id)
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