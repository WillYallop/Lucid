// Components
import { useState } from "react";
import SwitchInput from "../../Core/Inputs/SwitchInput";
import NumberInput from "../../Core/Inputs/NumberInput";

interface ExtendedFormNumberProps {
    config?: mod_contentTypesConfigModel["config"]
}

const ExtendedFormNumber: React.FC<ExtendedFormNumberProps> = ({ config }) => {

    const showState = {
        default: config?.default != undefined ? true : false,
        min: config?.min != undefined ? true : false,
        max: config?.max != undefined ? true : false
    }
    const starterValues = {
        default: config?.default != undefined ? parseInt(config.default) : 0,
        min:  config?.min != undefined ? parseInt(config.min) : 0,
        max: config?.max != undefined ? parseInt(config.max) : 100
    }

    // Default value
    const [ showDefaultValueInp, setShowDefaultValueInp ] = useState(showState.default);
    const [ defaultValue, setDefaultValue ] = useState(starterValues.default);
    // Minimum value
    const [ showMinValueInp, setShowMinValueInp ] = useState(showState.min);
    const [ minLength, setMinLength ] = useState(starterValues.min);
    // Maximum value
    const [ showMaxValueInp, setShowMaxValueInp ] = useState(showState.max);
    const [ maxLength, setMaxLength ] = useState(starterValues.max);

    return (
        <>  
            
            {/* Default Text Value */}
            <div className={`switchLabelRow ${ showDefaultValueInp ? 'active' : '' }`}>
                <label htmlFor="defaultNumInp">default number</label>
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
                    name={"default"}
                    required={true}
                    errorMsg={`Make sure the field is not empty, and matches the min and max values if those options are active!`}
                    updateValue={setDefaultValue}
                    min={ showMinValueInp && minLength ? minLength : undefined }
                    max={ showMaxValueInp && maxLength ? maxLength : undefined }/>
                : null
            }

            {/* Minimum Value Length */}
            <div className={`switchLabelRow ${ showMinValueInp ? 'active' : '' }`}>
                <label htmlFor="minumumLengthInp">minimum value</label>
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
                    name={"min"}
                    required={true}
                    errorMsg={`Make sure the field is not empty!`}
                    updateValue={setMinLength}/>
                : null
            }

            {/* Maximum Value Length */}
            <div className={`switchLabelRow switchLabelRow--not-border ${ showMaxValueInp ? 'active' : '' }`}>
                <label htmlFor="maximumLengthInp">maximum value</label>
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
                    name={"max"}
                    required={true}
                    errorMsg={`Make sure the field is not empty!`}
                    updateValue={setMaxLength}/>
                : null
            }

        </>
    )
}

export default ExtendedFormNumber;