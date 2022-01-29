// Components
import { useState } from "react";
import SwitchInput from "../../Core/Inputs/SwitchInput";
import NumberInput from "../../Core/Inputs/NumberInput";

const ExtendedFormRepeater: React.FC = () => {

    // Default value
    const [ showMaxRepeatsInp, setShowMaxRepeatsInp ] = useState(false);
    const [ maxRepeats, setMaxRepeats ] = useState(20);

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