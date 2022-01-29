import { ReactElement, useState } from 'react';
import { mod_contentTypesConfigModel } from '../ContentTypes/ContentTypeRow';
import axios from 'axios';
// Components
import SelectInput from '../Core/Inputs/SelectInput';
import TextInput from '../Core/Inputs/TextInput';
// Extended forms
import ExtendedFormText from '../ContentTypes/ExtendedForms/Text';
import ExtendedFormRepeater from '../ContentTypes/ExtendedForms/Repeater';
import ExtendedFormNumber from '../ContentTypes/ExtendedForms/Number';
// Functions
import formValidationHandler from "../../functions/formValidationHandler";
import getApiUrl from "../../functions/getApiUrl";
import validatorConfig from '../../functions/validatorConfig';

interface AddComponentContentTypeProps {
    component__id: string
    successCallback: (configType: mod_contentTypesConfigModel) => void
}

const AddComponentContentType: React.FC<AddComponentContentTypeProps> = ({ component__id, successCallback }) => {

    // -------------------------------------------------------
    // Extended Form
    // -------------------------------------------------------
    const [ extendedForm, setExtendedForm ] = useState<ReactElement>(<ExtendedFormText/>);

    // -------------------------------------------------------
    // Form Error
    // -------------------------------------------------------
    const [ formError, setFormError ] = useState({
        error: false,
        message: ''
    });
    const errorConEle = (
        <div className="errorCon">
            <p>{ formError.message }</p>
        </div>  
    );

    // -------------------------------------------------------
    // Types
    // -------------------------------------------------------
    const [ type, setType ] = useState<mod_contentTypesConfigModel["type"]>('text');
    const typeOptions: Array<mod_contentTypesConfigModel["type"]> = [
        'text',
        'number',
        'repeater'
    ];
    const updateSelectedType = (value: any) => {
        setType(value);
        switch(value) {
            case 'text': {
                setExtendedForm(<ExtendedFormText/>);
                break;
            }
            case 'number': {
                setExtendedForm(<ExtendedFormNumber/>);
                break;
            }
            case 'repeater': {
                setExtendedForm(<ExtendedFormRepeater/>);
                break;
            }
        }
    }

    // -------------------------------------------------------
    // Name
    // -------------------------------------------------------
    const [ name, setName ] = useState<mod_contentTypesConfigModel["name"]>('');

    // -------------------------------------------------------
    // Form validate
    // -------------------------------------------------------
    const validateForm = (e: React.FormEvent) => {
        formValidationHandler({
            e: e,
            onValidatePass: (fields) => {
                // Generate the content type config object
                let configObj = `{`;
                for(let prop in fields) {
                    if(prop != 'name' && prop != 'type') {
                        if(prop === 'default_str') configObj += `${prop}: "${fields[prop]}"`;
                        else configObj += `${prop}: ${parseInt(fields[prop])}`;
                    }
                }
                configObj += `}`
                // Query
                const query = `
                    mutation {
                        content_type_config {
                            create_single 
                            (
                                component_id: "${component__id}"
                                content_type: {
                                    name: "${name}"
                                    type: "${type}"
                                    config: ${configObj}
                                }
                            )
                            {
                                _id
                                name
                                type
                                config {
                                  max_range
                                  min_range
                                  max_length
                                  min_length
                                  max_repeats
                                }
                                fields {
                                  _id
                                  name
                                  type
                                  config {
                                    max_range
                                    min_range
                                    max_length
                                    min_length
                                    max_repeats
                                    default_str
                                    default_num
                                  }
                                }
                            }
                        }
                    }
                `;
                axios({
                    url: getApiUrl(),
                    method: 'post',
                    data: {
                        query: query
                    }
                })
                .then((result) => {
                    console.log(result);
                    const newContentType: mod_contentTypesConfigModel = result.data.data.content_type_config.create_single;
                    if(newContentType) {
                        successCallback(newContentType);
                    }
                    else {
                        setFormError({
                            error: true,
                            message: result.data.errors[0].message
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setFormError({
                        error: true,
                        message: 'An unexpected error occured when registering the components new content type!'
                    });
                })
            }
        })
    }

    return (
        <div className="body">
            <form onSubmit={validateForm} noValidate={true}>

                {/* Content Type - type */}
                <SelectInput 
                    value={type}
                    options={typeOptions}
                    id={"contentTypeTypeSel"}
                    name={"type"}
                    required={true}
                    errorMsg={"There was an unexpected error!"}
                    updateValue={updateSelectedType}
                    label="Type"
                    described_by="The type controls what data can be passed to the component."/>

                {/* Content Type = name */}
                <TextInput 
                    value={name}
                    id={'contentTypeNameInp'}
                    name={'name'}
                    required={true}
                    errorMsg={'Name must only include the following characters: [A-Z_a-z ] and be a minimum of 2 characters and a maximum of 100!'}
                    updateValue={setName}
                    label={'Name'}
                    max={100}
                    min={2}
                    described_by={'This is the unique content type name, note this value is used in your liquid template as the varaible to reference its data. It will be formated like this: Example Name => example_name'}
                    pattern={validatorConfig.cont_name.frontend_string}/>

                {/* Extended form */}
                <div className="headerRow">
                    <p className="bold">Configuration</p>
                </div>
                { extendedForm }

                { formError.error ? errorConEle : null }

                <div className="footer">
                    <div className="textarea">
                        <p>Once created you will be take back to the edit component page!</p>
                    </div>
                    <input className="btnStyle1 btnStyle1--small" type="submit" value="Create" />
                </div>
            </form>
        </div>
    )
}

export default AddComponentContentType;