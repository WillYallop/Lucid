import { NavLink } from "react-router-dom";
// Components
import CoreIcon from "../../Core/Icon";
import NavigationPostLinks from "./PostsLinks";
// Icons
import { faTachometerAlt, faFile, faPhotoVideo, faThLarge, faPalette, faCog } from '@fortawesome/free-solid-svg-icons';

interface NavigationProps {
    showNav: boolean
    toggleNav: () => void
}

const Navigation: React.FC<NavigationProps> = ({ showNav, toggleNav }) => {

    return (
        <div className="navSideBar">
            <div className={`navSideBarSlider ${ showNav ? 'active' : '' }`}>
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
            <div className={`mobileOverlay ${ showNav ? 'active' : '' }`} onClick={toggleNav}></div>
        </div>
    )
}

export default Navigation;