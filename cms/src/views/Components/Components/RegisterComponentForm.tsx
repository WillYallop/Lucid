import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Context
import { 
    ModalContext,
    LoadingContext
} from "../../../helper/Context";
// Components
import TextInput from "../../../components/Core/Inputs/TextInput";
import TextareaInput from "../../../components/Core/Inputs/TextareaInput";
import SelectInput from "../../../components/Core/Inputs/SelectInput";
// Functions
import formValidationHandler from "../../../functions/formValidationHandler";
import getApiUrl from "../../../functions/getApiUrl";
import validatorConfig from '../../../functions/validatorConfig';
// data
import { getUnregisteredComponents, saveSingleComponent } from '../../../data/components';


const RegisterComponentForm: React.FC = () => {
    const navigate = useNavigate();
    const { loadingState, setLoadingState } = useContext(LoadingContext);

    // -------------------------------------------------------
    // Modal 
    // -------------------------------------------------------
    const { modalState, setModalState } = useContext(ModalContext);

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
    // Input state
    // -------------------------------------------------------
    const [ componentPathOptions, setComponentPathOptions ] = useState<Array<string>>([]);
    const [ componentPath, setComponentPath ] = useState('text-block.html');
    const [ nameValue, setNameValue ] = useState('');
    const [ descriptionValue, setDescriptionValue ] = useState('');

    // Get unregistered components
    const getUnregisteredComponentsHandler = () => {
        setLoadingState(true);
        getUnregisteredComponents({
            __args: {},
            unregistered: {
                file_name: true,
                file_path: false
            },
            totals: {
                unregistered: true,
                registered: false
            }
        },
        (response) => {
            let res = response.data.data.components.get_unregistered.unregistered;
            if(res) {
                let arr: Array<string> = [];
                res.forEach((pathObj) => {
                    arr.push(pathObj.file_name);
                });
                setComponentPathOptions(arr);
            }
            else {
                setFormError({
                    error: true,
                    message: response.data.errors[0].message
                });
            }
            setLoadingState(false);
        },
        () => {
            setFormError({
                error: true,
                message: 'An unexpected error occured while registering the components!'
            });
            setLoadingState(false);
        })
    }
    
    // -------------------------------------------------------
    // Form validate
    // -------------------------------------------------------
    const validateForm = (e: React.FormEvent) => {
        formValidationHandler({
            e: e,
            onValidatePass: (fields) => {
                setLoadingState(true);
                // Save single component
                saveSingleComponent({
                    __args: {
                        name: fields.comp_name,
                        description: fields.comp_desc,
                        file_path: fields.comp_path,
                        image: ""
                    },
                    _id: true
                },
                (response) => {
                    let newCompData = response.data.data.components.save_single;
                    if(newCompData) {
                        setModalState({
                            ...modalState,
                            state: false
                        });
                        navigate(`/edit/component/${newCompData._id}`);
                    }
                    else {
                        setFormError({
                            error: true,
                            message: response.data.errors[0].message
                        });
                    }
                    setLoadingState(false);
                },
                () => {
                    setFormError({
                        error: true,
                        message: 'An unexpected error occured when registering the component!'
                    });
                    setLoadingState(false);
                })
            },
            customValidation: [
                {
                    field_name: 'comp_desc',
                    validator: (value) => {
                        let regex = new RegExp(validatorConfig.comp_description.regex);
                        if(regex.test(value)) return '';
                        else return 'Error';
                    }
                }
            ]
        })
    }

    
    // -------------------------------------------------------
    // 
    // -------------------------------------------------------
    useEffect(() => {
        getUnregisteredComponentsHandler();
        return () => {

        }
    }, []);

    return (
        <div className="body">

            <form onSubmit={validateForm} noValidate={true}>

                {/* Component Path */}
                <SelectInput 
                    value={componentPath}
                    options={componentPathOptions}
                    id={"componentFilePathInp"}
                    name={"comp_path"}
                    required={true}
                    errorMsg={"There was an unexpected error!"}
                    updateValue={setComponentPath}
                    label="component file (*)"
                    described_by="select the component you wish to register. If it does not appear, it may have been registered before or it could be configured incorrectly!"/>

                {/* Component Name */}
                <TextInput
                    value={nameValue}
                    id={"componentNameInp"}
                    name={"comp_name"}
                    required={true}
                    errorMsg={`name can only include the following characters: [A-Za-z -!,?._'"@] and be a minimum of 2 and maximum of 60 characters long!`}
                    updateValue={setNameValue}
                    label="name (*)"
                    pattern={validatorConfig.comp_name.string}/>

                {/* Component Description */}
                <TextareaInput 
                    value={descriptionValue}
                    id={"componentDescInp"}
                    name={"comp_desc"}
                    required={true}
                    errorMsg={`description can only include the following characters: [A-Za-z \-\!,?._'@] and be a minimum of 0 and maximum of 400 characters long!`}
                    updateValue={setDescriptionValue}
                    label="description (*)"
                    min={0}
                    max={400}/>

                { formError.error ? errorConEle : null }
                    
                <div className="footer">
                    <div className="textarea">
                        <p>after registering a component you will be taken to the component editor page. Here you will be able to configure its fields and more.</p>
                    </div>
                    <input className="btnStyle1 btnStyle1--small" type="submit" value="register" />
                </div>
            </form>

        </div>
    );
}

export default RegisterComponentForm;