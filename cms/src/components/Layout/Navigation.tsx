import {
    Link
} from "react-router-dom";

// Components
import CoreIcon from "../Core/Icon";
// Icons
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'

const Navigation: React.FC = () => {

    return (
        <div className="navSideBarCon">
            <nav className="">
                <CoreIcon icon={faTachometerAlt}/>
            </nav>
        </div>
    )
}

export default Navigation;