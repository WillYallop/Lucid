
interface contentTypeFieldNumberProps {
    content_type: mod_contentTypesConfigModel
    update_data: (_id: mod_contentTypesConfigModel["_id"], group_id: mod_contentTypesDatabaseModel["group_id"], data: mod_contentTypesDatabaseModel["value"]) => void
    data: mod_contentTypesDatabaseModel
}

const ContentTypeFieldNumber: React.FC<contentTypeFieldNumberProps> = ({ content_type }) => {

    return (
        <div className="blockCon">
            <p>number</p>
        </div>
    )
}

export default ContentTypeFieldNumber;