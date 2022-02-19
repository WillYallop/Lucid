import { ReactElement } from "react";

interface contentTypeFieldRepeaterProps {
    content_type: mod_contentTypesConfigModel
    get_groups: (repeater_id: mod_contentTypesConfigModel["_id"]) => { [key: string]: Array<ReactElement> }
}

const ContentTypeFieldRepeater: React.FC<contentTypeFieldRepeaterProps> = ({ content_type, get_groups }) => {

    //Page Children
    const getReapterGroups = () => {
        const groups = get_groups(content_type._id);
        let groupElements: Array<ReactElement> = [];
        for(const groupID in groups) { 
            groupElements.push((
                <div className='pageRowChildren' key={groupID}>
                    { groups[groupID]} 
                </div>
            ))
        }
        return groupElements;
    }

    return (
        <div className="blockCon">
            <p>repeater</p>
            { getReapterGroups() }
        </div>
    )
}

export default ContentTypeFieldRepeater;