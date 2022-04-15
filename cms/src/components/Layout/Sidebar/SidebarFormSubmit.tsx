// Components
import CoreIcon from "../../Core/Icon";
// Icons
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface SidebarFormSubmitProps {
    formID: string
    text: string
    icon: IconDefinition
    style?: 'warning'
}

const SidebarFormSubmit: React.FC<SidebarFormSubmitProps> = ({ formID, text, icon, style }) => {

    return (
        <div className="blockCon sidebarCon">
            <input className="layout__hide" id={`submitFormID-${formID}`} type="submit" form={formID}/>
            <div className={`sidebarCon__button ${style ? style : ''}`} 
                onClick={() => {
                    document.getElementById(`submitFormID-${formID}`)?.click();
                }}>
                <CoreIcon 
                    icon={icon}
                    style={style}/>
                <p>{ text }</p>
            </div>
        </div>
    )
}

export default SidebarFormSubmit;