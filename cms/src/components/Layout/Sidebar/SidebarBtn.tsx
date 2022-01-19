// Components
import CoreIcon from "../../Core/Icon";
// Icons
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface SideBarButtonProps {
    action: () => void;
    text: string
    icon: IconDefinition
}

const SidebarButton: React.FC<SideBarButtonProps> = ({ action, text, icon }) => {

    return (
        <div className="blockCon sidebarCon">
            <div className="sidebarCon__button" onClick={() => action()}>
                <CoreIcon icon={icon}/>
                <p>{ text }</p>
            </div>
        </div>
    )
}

export default SidebarButton;