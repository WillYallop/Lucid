import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

interface CoreIconProps {
    icon: IconDefinition
    style?: 'warning'
}

const CoreIcon: React.FC<CoreIconProps> = ({ icon, style }) => {
    return (
        <div className={`coreIcon ${ style ? style : '' }`}>
            <FontAwesomeIcon icon={icon}/>
        </div>
    )
}

export default CoreIcon;