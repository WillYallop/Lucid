import { ReactElement, useContext } from "react";
import { ModalContext } from "../../../../../../helper/Context";
// Components
import CoreIcon from '../../../../../../components/Core/Icon';
import DeleteConfirmModal from "../../../../../../components/Modal/DeleteConfirmModal";
// Icons
import { faPlus, faTrashAlt, faGripLines } from '@fortawesome/free-solid-svg-icons';

interface contentTypeFieldRepeaterProps {
    content_type: mod_contentTypesConfigModel
    getGroups: (repeater_id: mod_contentTypesConfigModel["_id"], group_id?: string) => { [key: string]: Array<ReactElement> }
    addRepeaterGroup: (content_type: mod_contentTypesConfigModel, parent_group_id: mod_contentTypesDatabaseModel["group_id"]) => void
    data: mod_contentTypesDatabaseModel
    deleteGroup: (group_id?: mod_contentTypeFieldGroupModel["_id"]) => void
}

const ContentTypeFieldRepeater: React.FC<contentTypeFieldRepeaterProps> = ({ content_type, getGroups, addRepeaterGroup, data, deleteGroup }) => {

    const { modalState, setModalState } = useContext(ModalContext);

    const openConfirmDeleteModal = (groupID: mod_contentTypeFieldGroupModel["_id"]) => {
        setModalState({
            ...modalState,
            state: true,
            title: 'confirmation',
            body: '',
            size: 'small',
            element: <DeleteConfirmModal 
                        message={'are you sure you want to delete this repeater group?'}
                        action={() => deleteGroup(groupID)}/>
        });
    }

    // Render Repeater Groups
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
                        <button className="btnStyleBlank" onClick={() => openConfirmDeleteModal(groupID)}>
                            <CoreIcon icon={faTrashAlt} style={'warning'}/>
                        </button>
                    </div>
                    <div className="groupContent">
                        { groups[groupID] } 
                    </div>
                    <div className="subActionBar">
                        <button className="btnStyleBlank delete" onClick={() => openConfirmDeleteModal(groupID)}>delete</button>
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
            <div className="groupsOuterContainer">
                { getReapterGroups() }
            </div>
        </>
    )
}

export default ContentTypeFieldRepeater;