import { useState, useContext } from 'react';
// Components
import TextInput from '../../../../../components/Core/Inputs/TextInput';
import TextareaInput from '../../../../../components/Core/Inputs/TextareaInput';
// Functions
import formValidationHandler from "../../../../../functions/formValidationHandler";
import validatorConfig from '../../../../../functions/validatorConfig';
// Context
import { LoadingContext } from "../../../../../helper/Context";
// Data
import { updateSingleComponent } from '../../../../../data/components';

interface ComponentDataFormProps {
    component__id: string
    name: {
        value: string
        update: (value: string) => void
    }
    description: {
        value: string
        update: (value: string) => void
    }
    successCallback: () => void
}

const ComponentDataForm: React.FC<ComponentDataFormProps> = ({ component__id, name, description, successCallback }) => {

    const { loadingState, setLoadingState } = useContext(LoadingContext);

    // -------------------------------------------------------
    // Form Error
    // -------------------------------------------------------
    const [ formError, setFormError ] = useState({
        error: false,
        message: ''
    });
    const errorConEle = (
        <div className="errorCon errorCon__margin-top">
            <p>{ formError.message }</p>
        </div>  
    );

    // -------------------------------------------------------
    // Validate
    // -------------------------------------------------------
    const validateForm = (e: React.FormEvent) => {
        formValidationHandler({
            e: e,
            onValidatePass: (fields) => {
                setLoadingState(true);
                // update component
                updateSingleComponent({
                    __args: {
                        _id: component__id,
                        name: fields["comp_name"],
                        description: fields["comp_desc"]
                    },
                    _id: true,
                    name: true,
                    description: true
                },
                (response) => {
                    successCallback();
                    setLoadingState(false);
                },
                () => {
                    setFormError({
                        error: true,
                        message: 'An unexpected error occured while saving the component data!'
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

    return (
        <form id="compDataForm" onSubmit={validateForm} noValidate={true}>

            {/* Component Name */}
            <TextInput
                value={name.value}
                id={"componentNameInp"}
                name={"comp_name"}
                required={true}
                errorMsg={`Name can only include the following characters: [A-Za-z -!,?._'"@] and be a minimum of 2 and maximum of 60 characters long!`}
                updateValue={name.update}
                label="Name"
                pattern={validatorConfig.comp_name.string}/>

            {/* Component Description */}
            <TextareaInput 
                value={description.value}
                id={"componentDescInp"}
                name={"comp_desc"}
                required={true}
                errorMsg={`Description can only include the following characters: [A-Za-z \-\!,?._'@] and be a minimum of 0 and maximum of 400 characters long!`}
                updateValue={description.update}
                label="Description"
                min={0}
                max={400}
                style={'--no-margin-bottom'}/>

            { formError.error ? errorConEle : null }

        </form>
    )
}

export default ComponentDataForm;