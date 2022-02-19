
interface contentTypeFieldNumberProps {
    content_type: mod_contentTypesConfigModel
    update_data: (id: mod_contentTypesConfigModel["_id"], data: mod_contentTypesConfigModel["data"]) => void
}

const ContentTypeFieldNumber: React.FC<contentTypeFieldNumberProps> = ({ content_type }) => {

    return (
        <div className="blockCon">
            <p>number</p>
        </div>
    )
}

export default ContentTypeFieldNumber;