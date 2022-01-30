// Components
import { useState } from "react";
import SwitchInput from "../../Core/Inputs/SwitchInput";
import NumberInput from "../../Core/Inputs/NumberInput";
import { mod_contentTypesConfigModel } from '../ContentTypeRow';

interface ExtendedFormNumberProps {
    config?: mod_contentTypesConfigModel["config"]
}

const ExtendedFormNumber: React.FC<ExtendedFormNumberProps> = ({ config }) => {

    const showState = {
        default: config?.default_num != undefined ? true : false,
        min: config?.min_length != undefined ? true : false,
        max: config?.max_length != undefined ? true : false
    }
    const starterValues = {
        default: config?.default_num != undefined ? config.default_num : 0,
        min:  config?.min_length != undefined ? config.min_length : 0,
        max: config?.max_length != undefined ? config.max_length : 100
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