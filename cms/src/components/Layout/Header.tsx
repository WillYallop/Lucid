import { Link } from "react-router-dom";
// Components
import CoreIcon from "../Core/Icon";
// Assets
import logo from '../../assets/logo.svg';
// Icons
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
    toggleNav?: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleNav }) => {

    return (
        <header className="headerCon">
            <Link className="logoLink" to='/'>
                <img src={logo} alt='Lucid Logo'/>
            </Link>

            <button className="toggleNavBtn" onClick={toggleNav}>
                <CoreIcon icon={faBars}/>
            </button>
        </header>
    )
}

export default Header;