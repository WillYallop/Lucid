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
        default: config?.default != undefined ? true : false,
        min: config?.min != undefined ? true : false,
        max: config?.max != undefined ? true : false
    }
    const starterValues = {
        default: config?.default != undefined ? config.default : '',
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
                <label htmlFor="defaultValueInp">default value</label>
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
                    name={"default"}
                    required={true}
                    errorMsg={`make sure the field is not empty, and if the min and max length are set that it meets them.`}
                    updateValue={setDefaultValue}
                    min={ showMinValueInp && minLength ? minLength : undefined }
                    max={ showMaxValueInp && maxLength ? maxLength : undefined }/>
                : null
            }

            {/* Minimum Value Length */}
            <div className={`switchLabelRow ${ showMinValueInp ? 'active' : '' }`}>
                <label htmlFor="minumumLengthInp">minimum length</label>
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
                    errorMsg={`make sure the field is not empty!`}
                    updateValue={setMinLength}/>
                : null
            }

            {/* Maximum Value Length */}
            <div className={`switchLabelRow switchLabelRow--not-border ${ showMaxValueInp ? 'active' : '' }`}>
                <label htmlFor="maximumLengthInp">maximum length</label>
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
                    errorMsg={`make sure the field is not empty!`}
                    updateValue={setMaxLength}/>
                : null
            }

        </>
    )
}

export default ExtendedFormText;