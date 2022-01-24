import { useState } from "react";
// Components
import TextInput from "../Core/Inputs/TextInput";


const RegisterComponentForm: React.FC = () => {
    // -------------------------------------------------------
    // Input state
    // -------------------------------------------------------
    const [ nameValue, setNameValue ] = useState('');
    
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
        <div>

            <form onSubmit={validateForm} noValidate={true}>

                {/* Component name */}
                <TextInput
                    value={nameValue}
                    id={"componentNameInp"}
                    name={"Component Name"}
                    required={false}
                    errorMsg={"Error message!"}
                    updateValue={setNameValue}/>

                    
                <input type="submit" value="Register" />
            </form>

        </div>
    );
}

export default RegisterComponentForm;