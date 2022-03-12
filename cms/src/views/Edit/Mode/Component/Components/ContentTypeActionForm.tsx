import { ReactElement, useEffect, useState, useContext } from 'react';
// Components
import SelectInput from '../../../../../components/Core/Inputs/SelectInput';
import TextInput from '../../../../../components/Core/Inputs/TextInput';
// Extended forms
import ExtendedFormText from '../../../../../components/ContentTypes/ExtendedForms/Text';
import ExtendedFormRepeater from '../../../../../components/ContentTypes/ExtendedForms/Repeater';
import ExtendedFormNumber from '../../../../../components/ContentTypes/ExtendedForms/Number';
// Functions
import formValidationHandler from "../../../../../functions/formValidationHandler";
import validatorConfig from '../../../../../functions/validatorConfig';
import formatLucidError from '../../../../../functions/formatLucidError';
// Context
import { LoadingContext } from "../../../../../helper/Context";
// data
import { getSingleContentTypeConfig, createSingleContentTypeConfig, updateSingleContentTypeConfig } from "../../../../../data/contentTypeConfig";

interface ContentTypeActionFormProps {
    component__id: string
    contentType__id: mod_contentTypesConfigModel["_id"]
    successCallback: (configType: mod_contentTypesConfigModel, actionType: 'update' | 'create', parent_id?: string) => void
    actionType: 'update' | 'create'
}

const ContentTypeActionForm: React.FC<ContentTypeActionFormProps> = ({ component__id, successCallback, contentType__id, actionType }) => {

    const { loadingState, setLoadingState } = useContext(LoadingContext);
    const [ type, setType ] = useState<mod_contentTypesConfigModel["type"]>('text');
    const [ name, setName ] = useState<mod_contentTypesConfigModel["name"]>('');
    const [ contentType, setContentType ] = useState({} as mod_contentTypesConfigModel);

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
        setLoadingState(true);
        getSingleContentTypeConfig({
            __args: {
                component_id: component__id,
                content_type_id: contentType__id
            },
            _id: true,
            name: true,
            type: true,
            parent: true,
            config: {
                min: true,
                max: true,
                default: true
            }
        },
        (response) => {
            const contentTypeData = response.data.data.content_type_config.get_single || {};
            setType(contentTypeData.type);
            setName(contentTypeData.name);
            setLoadingState(false);
            setTypeExtendedForm(contentTypeData.type, contentTypeData);
            setContentType(contentTypeData);
        },
        () => {
            setLoadingState(false);
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
    const createContentTypeAction = (configObj: mod_contentTypesConfigModel["config"]) => {
        setLoadingState(true);
        createSingleContentTypeConfig({
            __args: {
                component_id: component__id,
                content_type: {
                    name: name,
                    type: type,
                    parent: contentType__id,
                    config: configObj
                }
            },
            _id: true,
            name: true,
            type: true,
            parent: true,
            config: {
                max: true,
                min: true,
                default: true,
            }
        },
        (response) => {
            const newContentType: mod_contentTypesConfigModel = response.data.data.content_type_config.create_single;
            if(newContentType) {
                successCallback(newContentType, actionType);
            }
            else {
                setFormError({
                    error: true,
                    message: formatLucidError(response.data.errors[0].message).message
                });
            }
            setLoadingState(false);
        },
        () => {
            setFormError({
                error: true,
                message: 'An unexpected error occured when registering the components new content type!'
            });
            setLoadingState(false);
        })
    }
    // Update
    const updateContentTypeAction = (configObj: mod_contentTypesConfigModel["config"]) => {
        setLoadingState(true);
        updateSingleContentTypeConfig({
            __args: {
                component_id: component__id,
                content_type: {
                    _id: contentType?._id,
                    name: name,
                    type: type,
                    parent: contentType.parent,
                    config: configObj
                }
            },
            _id: true,
            name: true,
            type: true,
            parent: true,
            config: {
                max: true,
                min: true,
                default: true
            }
        },
        (response) => {
            const newContentType: mod_contentTypesConfigModel = response.data.data.content_type_config.update_single;
            if(newContentType) {
                successCallback(newContentType, actionType);
            }
            else {
                setFormError({
                    error: true,
                    message: formatLucidError(response.data.errors[0].message).message
                });
            }
            setLoadingState(false);
        },
        () => {
            setLoadingState(false);
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
                let configObj: mod_contentTypesConfigModel["config"] = {};
                for(let prop in fields) {
                    if(prop === 'max') configObj.max = fields[prop];
                    if(prop === 'min') configObj.min = fields[prop];
                    if(prop === 'default') configObj.default = fields[prop];
                }
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
                    errorMsg={"there was an unexpected error!"}
                    updateValue={updateSelectedType}
                    label="type (*)"
                    described_by="the type controls what data can be passed to the component."/>

                {/* Content Type = name */}
                <TextInput 
                    value={name}
                    id={'contentTypeNameInp'}
                    name={'name'}
                    required={true}
                    errorMsg={'name must only include the following characters: [A-Z_a-z ] and be a minimum of 2 characters and a maximum of 100!'}
                    updateValue={setName}
                    label={'name (*)'}
                    max={100}
                    min={2}
                    described_by={'this is the unique content type name, you can use the bellow to reference its data in your liquid templates.'}
                    pattern={validatorConfig.cont_name.frontend_string}>
                    { name ? <div className='noteRow'> { formatName(name) } </div> : null }
                </TextInput>

                {/* Extended form */}
                <div className="headerRow">
                    <p className="bold">configuration</p>
                </div>
                { extendedForm }

                { formError.error ? errorConEle : null }

                <div className="footer">
                    <div className="textarea">
                        {
                            actionType === 'create'
                            ? 
                            <p>once created you will be take back to the edit component page!</p>
                            : 
                            <p>once updated you will be take back to the edit component page!</p>
                        }
                    </div>
                    {
                        actionType === 'create'
                        ? 
                        <input className="btnStyle1 btnStyle1--small" type="submit" value="create"/>
                        : 
                        <input className="btnStyle1 btnStyle1--small" type="submit" value="update"/>
                    }
                </div>
            </form>
        </div>
    )
}

export default ContentTypeActionForm;