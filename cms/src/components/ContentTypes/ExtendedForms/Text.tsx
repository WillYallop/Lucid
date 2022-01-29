// Components
import { useState } from "react";
import SwitchInput from "../../Core/Inputs/SwitchInput";
import TextInput from "../../Core/Inputs/TextInput";
import NumberInput from "../../Core/Inputs/NumberInput";

const ExtendedFormText: React.FC = () => {

    // Default value
    const [ showDefaultValueInp, setShowDefaultValueInp ] = useState(false);
    const [ defaultValue, setDefaultValue ] = useState('');
    // Minimum value
    const [ showMinValueInp, setShowMinValueInp ] = useState(false);
    const [ minLength, setMinLength ] = useState(0);
    // Maximum value
    const [ showMaxValueInp, setShowMaxValueInp ] = useState(false);
    const [ maxLength, setMaxLength ] = useState(100);

    return (
        <>  
            
            {/* Default Text Value */}
            <div className={`switchLabelRow ${ showDefaultValueInp ? 'active' : '' }`}>
                <label htmlFor="defaultValueInp">Default value</label>
                <SwitchInput
                    state={showDefaultValueInp}
                    setState={setShowDefaultValueInp}/>
            </div>
            {
                showDefaultValueInp
                ?
                <TextInput
                    value={defaultValue}
                    id={"defaultValueInp"}
                    name={"default_str"}
                    required={true}
                    errorMsg={`Make sure the field is not empty, and if the min and max length are set that it meets them.`}
                    updateValue={setDefaultValue}
                    min={ showMinValueInp && minLength ? minLength : undefined }
                    max={ showMaxValueInp && maxLength ? maxLength : undefined }/>
                : null
            }

            {/* Minimum Value Length */}
            <div className={`switchLabelRow ${ showMinValueInp ? 'active' : '' }`}>
                <label htmlFor="minumumLengthInp">Minimum length</label>
                <SwitchInput
                    state={showMinValueInp}
                    setState={setShowMinValueInp}/>
            </div>
            {
                showMinValueInp
                ?
                <NumberInput
                    value={minLength}
                    id={"minumumLengthInp"}
                    name={"min_length"}
                    required={true}
                    errorMsg={`Make sure the field is not empty!`}
                    updateValue={setMinLength}/>
                : null
            }

            {/* Maximum Value Length */}
            <div className={`switchLabelRow switchLabelRow--not-border ${ showMaxValueInp ? 'active' : '' }`}>
                <label htmlFor="maximumLengthInp">Maximum length</label>
                <SwitchInput
                    state={showMaxValueInp}
                    setState={setShowMaxValueInp}/>
            </div>
            {
                showMaxValueInp
                ?
                <NumberInput
                    value={maxLength}
                    id={"maximumLengthInp"}
                    name={"max_length"}
                    required={true}
                    errorMsg={`Make sure the field is not empty!`}
                    updateValue={setMaxLength}/>
                : null
            }

        </>
    )
}

export default ExtendedFormText;