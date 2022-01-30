// Components
import { useState } from "react";
import SwitchInput from "../../Core/Inputs/SwitchInput";
import TextInput from "../../Core/Inputs/TextInput";
import NumberInput from "../../Core/Inputs/NumberInput";
import { mod_contentTypesConfigModel } from '../ContentTypeRow';

interface ExtendedFormTextProps {
    config?: mod_contentTypesConfigModel["config"]
}

const ExtendedFormText: React.FC<ExtendedFormTextProps> = ({ config }) => {

    const showState = {
        default: config?.default_str != undefined ? true : false,
        min: config?.min_length != undefined ? true : false,
        max: config?.max_length != undefined ? true : false
    }
    const starterValues = {
        default: config?.default_str != undefined ? config.default_str : '',
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