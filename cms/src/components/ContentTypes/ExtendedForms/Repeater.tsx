// Components
import { useState } from "react";
import SwitchInput from "../../Core/Inputs/SwitchInput";
import NumberInput from "../../Core/Inputs/NumberInput";
import { mod_contentTypesConfigModel } from '../ContentTypeRow';

interface ExtendedFormRepeaterProps {
    config?: mod_contentTypesConfigModel["config"]
}

const ExtendedFormRepeater: React.FC<ExtendedFormRepeaterProps> = ({ config }) => {

    const showState = {
        maxRepeats: config?.max_repeats != undefined ? true : false
    }
    const starterValues = {
        maxRepeats: config?.max_repeats != undefined ? config.max_repeats : 20
    }

    // Default value
    const [ showMaxRepeatsInp, setShowMaxRepeatsInp ] = useState(showState.maxRepeats);
    const [ maxRepeats, setMaxRepeats ] = useState(starterValues.maxRepeats);

    return (
        <>  
            
            {/* Max repeats */}
            <div className={`switchLabelRow switchLabelRow--not-border ${ showMaxRepeatsInp ? 'active' : '' }`}>
                <label htmlFor="maxRepeatsInp">Maximum repeats</label>
                <SwitchInput
                    state={showMaxRepeatsInp}
                    setState={setShowMaxRepeatsInp}/>
            </div>
            {
                showMaxRepeatsInp
                ?
                <NumberInput
                    value={maxRepeats}
                    id={"maxRepeatsInp"}
                    name={"max_repeats"}
                    required={true}
                    errorMsg={`Make sure the field is not empty!`}
                    updateValue={setMaxRepeats}/>
                : null
            }

        </>
    )
}

export default ExtendedFormRepeater;