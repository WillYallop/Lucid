
interface contentTypeFieldRepeaterProps {
    content_type: mod_contentTypesConfigModel
    update_data: (id: mod_contentTypesConfigModel["_id"], data: mod_contentTypesConfigModel["data"]) => void
}

const ContentTypeFieldRepeater: React.FC<contentTypeFieldRepeaterProps> = ({ content_type }) => {

    return (
        <div className="blockCon">
            <p>repeater</p>
        </div>
    )
}

export default ContentTypeFieldRepeater;