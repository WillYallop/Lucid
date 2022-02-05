import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { pageData } from './PageList';
// Icons
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface PageRowProps {
    page: pageData
}

const PageRow: React.FC<PageRowProps> = ({ page }) => {

    return (
        <div className="blockCon pageRow">
            <div className="pageRow__textarea">
                <p className="title">{ page.name } - <span>{ page.slug }</span></p>
                <div className="pageRow__action-row">
                    <ul>
                        <li>
                            <NavLink to={`/edit/page/${page._id}`} className={(navData) => navData.isActive ? "active" : "" }>edit</NavLink>
                        </li>
                        <li>
                            <button>quick edit</button>
                        </li>
                        <li>
                            <a href="#" target={'_blank'}>visit</a>
                        </li>
                        <li>
                            <button className="delete">delete</button>
                        </li>
                    </ul>
                </div>
            </div>
            {
                page.is_homepage 
                ?
                    <div className="pageRow__status-icon">
                        <FontAwesomeIcon icon={faHome}/>
                    </div>
                : null
            }
        </div>
    )
}

export default PageRow;