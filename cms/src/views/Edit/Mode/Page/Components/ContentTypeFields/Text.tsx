// Components
import TextInput from '../../../../../../components/Core/Inputs/TextInput';

interface contentTypeFieldTextProps {
    content_type: mod_contentTypesConfigModel
    updateData: (_id: mod_contentTypesConfigModel["_id"], group_id: mod_contentTypesDatabaseModel["group_id"], data: mod_contentTypesDatabaseModel["value"]) => void
    data: mod_contentTypesDatabaseModel
}

const ContentTypeFieldText: React.FC<contentTypeFieldTextProps> = ({ content_type, data, updateData }) => {


    return (
        <div className="contentTypeFieldCon blockCon">
            <TextInput
                id={`${content_type._id + (data.group_id ? data.group_id : '')}`} 
                name={content_type.name.replaceAll(' ', '_').toLowerCase()}
                label={ content_type.name }
                value={ data.value }
                required={ false }
                errorMsg={`this field is not valid! ${content_type.config.min ? 'minimum length is '+content_type.config.min+'.' : ''} ${content_type.config.max ? 'maximum length is '+content_type.config.max+'.' : ''}`}
                max={ content_type.config.max ? parseInt(content_type.config.max) : undefined }
                min={ content_type.config.min ? parseInt(content_type.config.min) : undefined }
                style={'--no-margin'}
                updateValue={(value) => { 
                    // error handling
                    const wrapper = document.getElementById(`${content_type._id + (data.group_id ? data.group_id : '')}`)?.parentElement;
                    const min = content_type.config.min ? parseInt(content_type.config.min) : undefined;
                    const max = content_type.config.max ? parseInt(content_type.config.max) : undefined;
                    if(min !== undefined) {
                        if(max !== undefined) {
                            if(value.length >= min && value.length <= max) wrapper?.classList.remove('invalid');
                            else wrapper?.classList.add('invalid');
                        }
                        else {
                            if(value.length >= min) wrapper?.classList.remove('invalid');
                            else wrapper?.classList.add('invalid');
                        }
                    }
                    if(max !== undefined) {
                        if(min !== undefined) {
                            if(value.length >= min && value.length <= max) wrapper?.classList.remove('invalid');
                            else wrapper?.classList.add('invalid');
                        }
                        else {
                            if(value.length <= max) wrapper?.classList.remove('invalid');
                            else wrapper?.classList.add('invalid');
                        }
                    }
                    updateData(content_type._id, data.group_id, value);
                }}/>
        </div>
    )
}

export default ContentTypeFieldText;