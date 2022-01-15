import {
    Link
} from "react-router-dom";

// Assets
import logo from '../../assets/logo.svg';

const Header: React.FC = () => {

    return (
        <header className="headerCon">
            <Link className="logoLink" to='/'>
                <img src={logo} alt='Lucid Logo'/>
            </Link>
        </header>
    )
}

export default Header;