// Components
import { useState } from "react";
import SwitchInput from "../../Core/Inputs/SwitchInput";
import NumberInput from "../../Core/Inputs/NumberInput";

const ExtendedFormNumber: React.FC = () => {

    // Default value
    const [ showDefaultValueInp, setShowDefaultValueInp ] = useState(false);
    const [ defaultValue, setDefaultValue ] = useState(0);
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
                <label htmlFor="defaultNumInp">Default number</label>
                <SwitchInput
                    state={showDefaultValueInp}
                    setState={setShowDefaultValueInp}/>
            </div>
            {
                showDefaultValueInp
                ?
                <NumberInput
                    value={defaultValue}
                    id={"defaultNumInp"}
                    name={"default_num"}
                    required={true}
                    errorMsg={`Make sure the field is not empty, and matches the min and max values if those options are active!`}
                    updateValue={setDefaultValue}
                    min={ showMinValueInp && minLength ? minLength : undefined }
                    max={ showMaxValueInp && maxLength ? maxLength : undefined }/>
                : null
            }

            {/* Minimum Value Length */}
            <div className={`switchLabelRow ${ showMinValueInp ? 'active' : '' }`}>
                <label htmlFor="minumumLengthInp">Minimum value</label>
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
                <label htmlFor="maximumLengthInp">Maximum value</label>
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

export default ExtendedFormNumber;