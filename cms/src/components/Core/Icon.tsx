import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

interface CoreIconProps {
    icon: IconDefinition
}

const CoreIcon: React.FC<CoreIconProps> = ({ icon }) => {
    return (
        <div className="coreIcon">
            <FontAwesomeIcon icon={icon}/>
        </div>
    )
}

export default CoreIcon;