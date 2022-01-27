import { useState } from "react";
// Components
import TextInput from "../Core/Inputs/TextInput";
import TextareaInput from "../Core/Inputs/TextareaInput";
import SelectInput from "../Core/Inputs/SelectInput";


const RegisterComponentForm: React.FC = () => {
    // -------------------------------------------------------
    // Input state
    // -------------------------------------------------------
    const [ componentPathOptions, setComponentPathOptions ] = useState([
        'text-block.html',
        'header.html'
    ]);
    const [ componentPath, setComponentPath ] = useState('text-block.html');
    const [ nameValue, setNameValue ] = useState('');
    const [ descriptionValue, setDescriptionValue ] = useState('');
    
    // -------------------------------------------------------
    // Form validate
    // -------------------------------------------------------
    const validateForm = (e: React.FormEvent) => {

        e.preventDefault();
        
        const form = e.target as HTMLFormElement;
        const field = Array.from(form.elements) as Array<HTMLFormElement>;

        // Reset fields
        field.forEach((i) => {
            i.setCustomValidity('');
            i.parentElement?.classList.remove('invalid');
        });

        if(!form.checkValidity()) {
            //Check fields for fail
            field.forEach((i) => {
                if(!i.checkValidity()) i.parentElement?.classList.add('invalid');
            });
        }

    }


    return (
        <div className="body">

            <form onSubmit={validateForm} noValidate={true}>

                {/* Component Path */}
                <SelectInput 
                    value={componentPath}
                    options={componentPathOptions}
                    id={"componentFilePathInp"}
                    name={"Component File Path"}
                    required={true}
                    errorMsg={"There was an unexpected error!"}
                    updateValue={setComponentPath}
                    label="Component File"
                    described_by="Select the component you wish to register. If it does not appear, it may have been registered before or it could be configured incorrectly!"/>

                {/* Component Name */}
                <TextInput
                    value={nameValue}
                    id={"componentNameInp"}
                    name={"Component Name"}
                    required={true}
                    errorMsg={"This component name is invalid!"}
                    updateValue={setNameValue}
                    label="Name"
                    max={10}
                    min={2}/>

                {/* Component Description */}
                <TextareaInput 
                    value={descriptionValue}
                    id={"componentDescInp"}
                    name={"Component Description"}
                    required={true}
                    errorMsg={"This description is invalid!"}
                    updateValue={setDescriptionValue}
                    label="Description"
                    max={200}
                    min={10}/>
                    
                <div className="footer">
                    <div className="textarea">
                        <p>After registering a component you will be take to the component editor page. Here you will be able to configure its fields and more.</p>
                    </div>
                    <input className="btnStyle1 btnStyle1--small" type="submit" value="Register" />
                </div>
            </form>

        </div>
    );
}

export default RegisterComponentForm;