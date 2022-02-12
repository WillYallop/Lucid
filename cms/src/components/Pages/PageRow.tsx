import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { pageData } from './PageList';
// Icons
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface PageRowProps {
    page: pageData
    getChildren: (page_id: pageData["_id"]) => Array<React.ReactElement>
    deleteCallback: (page_id: pageData["_id"]) => void
}

const PageRow: React.FC<PageRowProps> = ({ page, getChildren, deleteCallback }) => {

    //Page Children
    const getRepeaterChildren = () => {
        const pageChildren = getChildren(page._id);
        if(pageChildren.length) {
            return (
                <div className='pageRowChildren'>
                    { pageChildren } 
                </div>
            );
        } else return null;
    }

    return (
        <>
            <div className="blockCon pageRow">
                <div className="pageRow__textarea">
                    <p className="title">{ page.name } - <span>{ page.slug }</span></p>
                    <div className="pageRow__action-row">
                        <ul>
                            <li>
                                <NavLink to={ page.slug == '/' ? `/edit/page/homepage` : `/edit/page/${page.slug}`} className={(navData) => navData.isActive ? "active" : "" }>edit</NavLink>
                            </li>
                            <li>
                                <a href="#" target={'_blank'}>visit</a>
                            </li>
                            <li>
                                <button className="delete" onClick={() => deleteCallback(page._id)}>delete</button>
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
            { getRepeaterChildren() }
        </>

    )
}

export default PageRow;