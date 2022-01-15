import { NavLink } from "react-router-dom";
// Components
import CoreIcon from "../../Core/Icon";
import NavigationPostLinks from "./PostsLinks";
// Icons
import { faTachometerAlt, faFile, faPhotoVideo, faThLarge, faPalette, faCog } from '@fortawesome/free-solid-svg-icons';


const Navigation: React.FC = () => {

    return (
        <div className="navSideBarCon">
            <nav className="navCon">
                <ul className="navUl">

                    {/* Dashboard */}
                    <li className="navItem">
                        <NavLink to='/' className={(navData) => navData.isActive ? "active" : "" }>
                            <CoreIcon icon={faTachometerAlt}/> Dashboard
                        </NavLink >
                    </li>
                    <span className="seperator"></span>
                    {/* Page section */}
                    <li className="navItem">
                        <NavLink to='/pages' className={(navData) => navData.isActive ? "active" : "" }>
                            <CoreIcon icon={faFile}/> Pages
                        </NavLink >
                    </li>
                    <NavigationPostLinks/>
                    <span className="seperator"></span>
                    {/* Media */}
                    <li className="navItem">
                        <NavLink to='/media' className={(navData) => navData.isActive ? "active" : "" }>
                            <CoreIcon icon={faPhotoVideo}/> Media
                        </NavLink >
                    </li>
                    <span className="seperator"></span>
                    {/* Alt Section */}
                    <li className="navItem">
                        <NavLink to='/components' className={(navData) => navData.isActive ? "active" : "" }>
                            <CoreIcon icon={faThLarge}/> Components
                        </NavLink >
                    </li>
                    <li className="navItem">
                        <NavLink to='/style' className={(navData) => navData.isActive ? "active" : "" }>
                            <CoreIcon icon={faPalette}/> Style
                        </NavLink >
                    </li>
                    <li className="navItem">
                        <NavLink to='/settings' className={(navData) => navData.isActive ? "active" : "" }>
                            <CoreIcon icon={faCog}/> Settings
                        </NavLink >
                    </li>
                    <span className="seperator"></span>

                </ul>
            </nav>
        </div>
    )
}

export default Navigation;