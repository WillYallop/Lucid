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
            <button className={`btnStyle3 ${style ? style : ''}`} onClick={() => action()}>
                <CoreIcon 
                icon={icon}
                style={style}/>
                <p>{ text }</p>
            </button>
        </div>
    )
}

export default SidebarButton;