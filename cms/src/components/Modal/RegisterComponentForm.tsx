import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Context
import { 
    ModalContext
} from "../../helper/Context";
// Components
import TextInput from "../Core/Inputs/TextInput";
import TextareaInput from "../Core/Inputs/TextareaInput";
import SelectInput from "../Core/Inputs/SelectInput";
// Functions
import formValidationHandler from "../../functions/formValidationHandler";
import getApiUrl from "../../functions/getApiUrl";
import validatorConfig from '../../functions/validatorConfig';


const RegisterComponentForm: React.FC = () => {
    const navigate = useNavigate();

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
    const getUnregisteredComponents = () => {
        // Save single component
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: `
                    query {
                        components {
                            get_unregistered {
                                unregistered {
                                    file_path
                                }
                            }
                        }
                    }`
            }
        })
        .then((result) => {
            let response = result.data.data.components.get_unregistered.unregistered;
            if(response) {
                let arr: Array<string> = [];
                response.forEach((pathObj:any) => {
                    arr.push(pathObj.file_path);
                });
                setComponentPathOptions(arr);
            }
            else {
                setFormError({
                    error: true,
                    message: result.data.errors[0].message
                });
            }

        })
        .catch(() => {
            setFormError({
                error: true,
                message: 'An unexpected error occured while getting the unregistered components!'
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
                // Save single component
                axios({
                    url: getApiUrl(),
                    method: 'post',
                    data: {
                      query: `
                        mutation {
                            components {
                                save_single
                                (
                                    name: "${fields.comp_name}"
                                    description: "${fields.comp_desc}"
                                    file_path: "${fields.comp_path}"
                                    image: ""
                                )
                                {
                                    _id
                                }
                            }
                        }`
                    }
                })
                .then((result) => {
                    let newCompData = result.data.data.components.save_single;
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
                            message: result.data.errors[0].message
                        });
                    }
                })
                .catch((err) => {
                    setFormError({
                        error: true,
                        message: 'An unexpected error occured when registering the component!'
                    });
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
        getUnregisteredComponents();
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
                    label="Component File"
                    described_by="Select the component you wish to register. If it does not appear, it may have been registered before or it could be configured incorrectly!"/>

                {/* Component Name */}
                <TextInput
                    value={nameValue}
                    id={"componentNameInp"}
                    name={"comp_name"}
                    required={true}
                    errorMsg={`Name can only include the following characters: [A-Za-z -!,?._'"@] and be a minimum of 2 and maximum of 60 characters long!`}
                    updateValue={setNameValue}
                    label="Name"
                    pattern={validatorConfig.comp_name.string}/>

                {/* Component Description */}
                <TextareaInput 
                    value={descriptionValue}
                    id={"componentDescInp"}
                    name={"comp_desc"}
                    required={true}
                    errorMsg={`Description can only include the following characters: [A-Za-z \-\!,?._'@] and be a minimum of 0 and maximum of 400 characters long!`}
                    updateValue={setDescriptionValue}
                    label="Description"
                    min={0}
                    max={400}/>

                { formError.error ? errorConEle : null }
                    
                <div className="footer">
                    <div className="textarea">
                        <p>After registering a component you will be taken to the component editor page. Here you will be able to configure its fields and more.</p>
                    </div>
                    <input className="btnStyle1 btnStyle1--small" type="submit" value="Register" />
                </div>
            </form>

        </div>
    );
}

export default RegisterComponentForm;