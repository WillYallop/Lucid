import CoreIcon from '../../../../../components/Core/Icon';
import LargeComponentRow from './LargeComponentRow';
// Icons
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

interface editPageComponentProps {
    page_component: mod_page_componentModel
    exit: () => void
}

const EditPageComponent: React.FC<editPageComponentProps> = ({ page_component, exit }) => {

    console.log(page_component);

    return (
        <div className="editPageCompCon">
            {/* Header */}
            <div className="headerRow">
                <button
                    className={`btnStyle3`} 
                    onClick={exit}>
                    <CoreIcon 
                        icon={faSignInAlt}
                        style={'flip-horizontal'}/>
                    <p>page preview</p>
                </button>
            </div>
            {/* Component Row */}
            <LargeComponentRow component={page_component.component}/>
            {/* Content Type Fields */}
        </div>
    )
}

export default EditPageComponent;