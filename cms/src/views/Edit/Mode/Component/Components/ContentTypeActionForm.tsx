import { ReactElement, useEffect, useState } from 'react';
import { mod_contentTypesConfigModel } from '../../../../../components/ContentTypes/ContentTypeRow';
import axios from 'axios';
// Components
import SelectInput from '../../../../../components/Core/Inputs/SelectInput';
import TextInput from '../../../../../components/Core/Inputs/TextInput';
import UtilityLoading from '../../../../../components/Ultility/Loading';
// Extended forms
import ExtendedFormText from '../../../../../components/ContentTypes/ExtendedForms/Text';
import ExtendedFormRepeater from '../../../../../components/ContentTypes/ExtendedForms/Repeater';
import ExtendedFormNumber from '../../../../../components/ContentTypes/ExtendedForms/Number';
// Functions
import formValidationHandler from "../../../../../functions/formValidationHandler";
import getApiUrl from "../../../../../functions/getApiUrl";
import validatorConfig from '../../../../../functions/validatorConfig';
import formatLucidError from '../../../../../functions/formatLucidError';

interface ContentTypeActionFormProps {
    component__id: string
    contentType__id: mod_contentTypesConfigModel["_id"]
    successCallback: (configType: mod_contentTypesConfigModel, actionType: 'update' | 'create', parent_id?: string) => void
    actionType: 'update' | 'create'
}

const ContentTypeActionForm: React.FC<ContentTypeActionFormProps> = ({ component__id, successCallback, contentType__id, actionType }) => {

    const [ type, setType ] = useState<mod_contentTypesConfigModel["type"]>('text');
    const [ name, setName ] = useState<mod_contentTypesConfigModel["name"]>('');
    const [ contentType, setContentType ] = useState({} as mod_contentTypesConfigModel);
    const [ loadingState, setLoadingState ] = useState(true);

    // -------------------------------------------------------
    // Extended Form
    // -------------------------------------------------------
    const [ extendedForm, setExtendedForm ] = useState<ReactElement>();
    const setTypeExtendedForm = (type: mod_contentTypesConfigModel["type"], content?: mod_contentTypesConfigModel) => {
        switch(type) {
            case 'text': {
                setExtendedForm(<ExtendedFormText config={content?.config}/>);
                break;
            }
            case 'number': {
                setExtendedForm(<ExtendedFormNumber config={content?.config}/>);
                break;
            }
            case 'repeater': {
                setExtendedForm(<ExtendedFormRepeater config={content?.config}/>);
                break;
            }
            default: {
                setExtendedForm(<ExtendedFormText/>);
                break;
            }
        }
    }

    // -------------------------------------------------------
    // Types
    // ------------------------------------------------------- 
    const typeOptions: Array<mod_contentTypesConfigModel["type"]> = [
        'text',
        'number',
        'repeater'
    ];

    // -------------------------------------------------------
    // Name
    // -------------------------------------------------------
    const updateSelectedType = (value: any) => {
        setType(value);
        setTypeExtendedForm(value);
    }

    // -------------------------------------------------------
    // First load
    // -------------------------------------------------------
    const getContentType = () => {
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: `
                query {
                    content_type_config {
                        get_single (
                            component_id: "${component__id}"
                            content_type_id: "${contentType__id}"
                        )
                        {
                            _id
                            name
                            type
                            parent
                            config {
                                min
                                max
                                default
                            }
                        }
                    }
                }`
            }
        })
        .then((result) => {
            const contentTypeData = result.data.data.content_type_config.get_single || {};
            setType(contentTypeData.type);
            setName(contentTypeData.name);
            setLoadingState(false);
            setTypeExtendedForm(contentTypeData.type, contentTypeData);
            setContentType(contentTypeData);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        if(actionType === 'update') { getContentType() }
        else {
            setLoadingState(false);
            setTypeExtendedForm('text');
        }
        return () => {
            setContentType({} as mod_contentTypesConfigModel);
        }
    }, []);

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
                            parent: "${contentType__id}"
                            config: ${configObj}
                        }
                    )
                    {
                        _id
                        name
                        type
                        parent
                        config {
                            max
                            min
                            default
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
                successCallback(newContentType, actionType);
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
                            parent: "${contentType.parent}"
                            config: ${configObj}
                        }
                    ) 
                    {
                        _id
                        name
                        type
                        parent
                        config {
                            max
                            min
                            default
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
                successCallback(newContentType, actionType);
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

    // Loading
    if(loadingState) {
        return (
            <div className="body">
                <div className="loadingCon loadingCon__large">
                    <UtilityLoading mode="light"/>
                </div>
            </div>
        )
    }
    else {
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
}

export default ContentTypeActionForm;