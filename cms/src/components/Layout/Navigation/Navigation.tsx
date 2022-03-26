import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Components
import CoreIcon from "../../Core/Icon";
import NavigationPostLinks from "./PostsLinks";
// Icons
import { faTachometerAlt, faFile, faPhotoVideo, faThLarge, faPalette, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// data
import { generateSite } from '../../../data/generator';
import { signOut } from '../../../data/auth';

interface NavigationProps {
    showNav: boolean
    toggleNav: () => void
}

const Navigation: React.FC<NavigationProps> = ({ showNav, toggleNav }) => {

    const [ siteBuilt, setSiteBuilt ] = useState(false);
    const [ publishRes, setPublishRes ] = useState<mod_generateSite>({} as mod_generateSite);

    const navigate = useNavigate();

    const publishSite = () => {
        generateSite({
            __args: {},
            build_time: true,
            pages_built: true
        },
        (response) => {
            const data: mod_generateSite = response.data.data.generator.site || {};
            setPublishRes(data);
            setSiteBuilt(true);
            alert('built');
        },
        (err) => {
            console.log(err);
        })
    }

    const signOutHandler = () => {
        signOut({
            __args: {},
            success: true
        },
        (response) => {
            if(response.data.data.authentication.sign_out.success) {
                navigate('/signin');
            }
        },
        (err) => {
            console.log(err);
        });
    }

    return (
        <div className="navSideBar">
            <div className={`navSideBarSlider ${ showNav ? 'active' : '' }`}>
                <div className="navInner">
                    <nav className="navCon">
                        <ul className="navUl">

                            {/* Dashboard */}
                            <li className="navItem">
                                <NavLink to='/' className={(navData) => navData.isActive ? "active" : "" }>
                                    <CoreIcon icon={faTachometerAlt} style={'transparent'}/> dashboard
                                </NavLink >
                            </li>
                            <span className="seperator"></span>
                            {/* Page section */}
                            <li className="navItem">
                                <NavLink to='/pages' className={(navData) => navData.isActive ? "active" : "" }>
                                    <CoreIcon icon={faFile} style={'transparent'}/> pages
                                </NavLink >
                            </li>
                            <NavigationPostLinks/>
                            <span className="seperator"></span>
                            {/* Other */}
                            <li className="navItem">
                                <NavLink to='/media' className={(navData) => navData.isActive ? "active" : "" }>
                                    <CoreIcon icon={faPhotoVideo} style={'transparent'}/> media
                                </NavLink >
                            </li>
                            <li className="navItem">
                                <NavLink to='/components' className={(navData) => navData.isActive ? "active" : "" }>
                                    <CoreIcon icon={faThLarge} style={'transparent'}/> components
                                </NavLink >
                            </li>
                            <li className="navItem">
                                <NavLink to='/style' className={(navData) => navData.isActive ? "active" : "" }>
                                    <CoreIcon icon={faPalette} style={'transparent'}/> style
                                </NavLink>
                            </li>
                            <li className="navItem">
                                <NavLink to='/settings' className={(navData) => navData.isActive ? "active" : "" }>
                                    <CoreIcon icon={faCog} style={'transparent'}/> settings
                                </NavLink >
                            </li>
                            <span className="seperator"></span>
                            <li className="navItem">
                                <a onClick={signOutHandler}>
                                    <CoreIcon icon={faSignOutAlt} style={'transparent'}/> sign out
                                </a>
                            </li>

                        </ul>
                    </nav>
                </div>
                <button className="publishSiteBtn btnStyle1" onClick={publishSite}>
                    publish site
                </button>
            </div>
            <div className={`mobileOverlay ${ showNav ? 'active' : '' }`} onClick={toggleNav}></div>
        </div>
    )
}

export default Navigation;