import { ReactElement, useEffect, useState } from 'react';
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
import formatLucidError from '../../functions/formatLucidError';

interface ComponentContentTypeActionFormProps {
    component__id: string
    successCallback: (configType: mod_contentTypesConfigModel, actionType: 'update' | 'create', repeater__id?: string) => void

    contentType?: mod_contentTypesConfigModel
    repeater__id?: string
    actionType: 'update' | 'create'
}

const ComponentContentTypeActionForm: React.FC<ComponentContentTypeActionFormProps> = ({ component__id, successCallback, contentType, actionType, repeater__id }) => {

    const getTypeExtendedForm = (type: mod_contentTypesConfigModel["type"]) => {
        switch(type) {
            case 'text': {
                return <ExtendedFormText config={contentType?.config}/>;
            }
            case 'number': {
                return <ExtendedFormNumber config={contentType?.config}/>;
            }
            case 'repeater': {
                return <ExtendedFormRepeater config={contentType?.config}/>;
            }
            default: {
                return <ExtendedFormText/>;
            }
        }
    }

    // -------------------------------------------------------
    // Extended Form
    // -------------------------------------------------------
    let defaultType: mod_contentTypesConfigModel["type"] = 'text';
    let defaultExtendedForm = <ExtendedFormText/>;
    if(actionType === 'update' && contentType) {
        defaultType = contentType.type;
        defaultExtendedForm = getTypeExtendedForm(defaultType);
    }
    const [ extendedForm, setExtendedForm ] = useState<ReactElement>(defaultExtendedForm);

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
    const [ type, setType ] = useState<mod_contentTypesConfigModel["type"]>(defaultType);
    const typeOptions: Array<mod_contentTypesConfigModel["type"]> = [
        'text',
        'number'
    ];
    if(!repeater__id) typeOptions.push('repeater');

    const updateSelectedType = (value: any) => {
        setType(value);
        setExtendedForm(getTypeExtendedForm(value))
    }

    // -------------------------------------------------------
    // Name
    // -------------------------------------------------------
    const [ name, setName ] = useState<mod_contentTypesConfigModel["name"]>(contentType?.name || '');

    // -------------------------------------------------------
    // Actions
    // -------------------------------------------------------
    // Create
    const createContentTypeAction = (configObj: string) => {
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
                        repeaterField: ${ repeater__id ? 'true' : 'false' }
                        ${ repeater__id ? 'repeaterID: "'+repeater__id+'"' : '' }
                    )
                    {
                        _id
                        name
                        type
                        config {
                            max
                            min
                            default
                        }
                        fields {
                            _id
                            name
                            type
                            config {
                                max
                                min
                                default
                            }
                        }
                    }
                }
            }`;

        console.log(query);
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: query
            }
        })
        .then((result) => {
            const newContentType: mod_contentTypesConfigModel = result.data.data.content_type_config.create_single;
            if(newContentType) {
                successCallback(newContentType, actionType, repeater__id);
            }
            else {
                setFormError({
                    error: true,
                    message: formatLucidError(result.data.errors[0].message).message
                });
            }
        })
        .catch((err) => {
            setFormError({
                error: true,
                message: 'An unexpected error occured when registering the components new content type!'
            });
        })
    }
    // Update
    const updateContentTypeAction = (configObj: string) => {
        const query = `mutation {
                content_type_config {
                    update_single
                    (
                        component_id: "${component__id}"
                        content_type: {
                            _id: "${contentType?._id}"
                            name: "${name}"
                            type: "${type}"
                            config: ${configObj}
                        }
                        repeaterField: ${ repeater__id ? 'true' : 'false' }
                        ${ repeater__id ? 'repeaterID: "'+repeater__id+'"' : '' }
                    ) 
                    {
                        _id
                        name
                        type
                        config {
                            max
                            min
                            default
                        }
                        fields {
                            _id
                            name
                            type
                            config {
                                max
                                min
                                default
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
            const newContentType: mod_contentTypesConfigModel = result.data.data.content_type_config.update_single;
            if(newContentType) {
                successCallback(newContentType, actionType, repeater__id);
            }
            else {
                setFormError({
                    error: true,
                    message: formatLucidError(result.data.errors[0].message).message
                });
            }
        })
        .catch((err) => {
            console.log(err);
            setFormError({
                error: true,
                message: 'An unexpected error occured when updating the components content type!'
            });
        })
    }

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
                        configObj += `${prop}: "${fields[prop]}" `;
                    }
                }
                configObj += `}`;
                // Perform query action
                if(actionType === 'create') createContentTypeAction(configObj);
                else updateContentTypeAction(configObj);
            }
        })
    }

    // Format name value
    const formatName = (value: string) => {
        return value.replaceAll(' ', '_').toLowerCase();
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
                    described_by={'This is the unique content type name, you can use the bellow to reference its data in your liquid templates.'}
                    pattern={validatorConfig.cont_name.frontend_string}>
                    { name ? <div className='noteRow'> { formatName(name) } </div> : null }
                </TextInput>

                {/* Extended form */}
                <div className="headerRow">
                    <p className="bold">Configuration</p>
                </div>
                { extendedForm }

                { formError.error ? errorConEle : null }

                <div className="footer">
                    <div className="textarea">
                        {
                            actionType === 'create'
                            ? 
                            <p>Once created you will be take back to the edit component page!</p>
                            : 
                            <p>Once updated you will be take back to the edit component page!</p>
                        }
                    </div>
                    {
                        actionType === 'create'
                        ? 
                        <input className="btnStyle1 btnStyle1--small" type="submit" value="Create"/>
                        : 
                        <input className="btnStyle1 btnStyle1--small" type="submit" value="Update"/>
                    }
                </div>
            </form>
        </div>
    )
}

export default ComponentContentTypeActionForm;