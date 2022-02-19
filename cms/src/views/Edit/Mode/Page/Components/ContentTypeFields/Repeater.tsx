
interface contentTypeFieldRepeaterProps {
    content_type: mod_contentTypesConfigModel
}

const ContentTypeFieldRepeater: React.FC<contentTypeFieldRepeaterProps> = ({ content_type }) => {

    return (
        <div className="blockCon">
            <p>repeater</p>
        </div>
    )
}

export default ContentTypeFieldRepeater;