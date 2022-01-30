// Components
import CoreIcon from "../../Core/Icon";
// Icons
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface SideBarButtonProps {
    action: () => void;
    text: string
    icon: IconDefinition
    style?: 'warning'
}

const SidebarButton: React.FC<SideBarButtonProps> = ({ action, text, icon, style }) => {

    return (
        <div className="blockCon sidebarCon">
            <div className={`sidebarCon__button ${style ? style : ''}`} onClick={() => action()}>
                <CoreIcon 
                icon={icon}
                style={style}/>
                <p>{ text }</p>
            </div>
        </div>
    )
}

export default SidebarButton;