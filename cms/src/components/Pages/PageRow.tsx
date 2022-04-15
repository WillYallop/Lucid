import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Icons
import { faHome } from '@fortawesome/free-solid-svg-icons';
// data
import { getPageLiveURL } from '../../data/page';


interface PageRowProps {
    page: mod_pageModel
    getChildren: (page_id: mod_pageModel["_id"]) => Array<React.ReactElement>
    deleteCallback: (page_id: mod_pageModel["_id"]) => void
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

    const navigateToPage = () => {
        if(!page.path) {
            getPageLiveURL({
                __args: {
                    _id: page._id
                },
                url: true
            },
            (response) => {
                const { url } = response.data.data.page.get_live_url || '';
                window.open(url, '_blank');
                page.path = url;
            },
            (err) => {
                console.log(err);
            })
        } else window.open(page.path, '_blank');
    }


    return (
        <>
            <div className="blockCon pageRow">
                <div className="pageRow__textarea">
                    <p className="title">{ page.name }<span> - { page.slug }</span></p>
                    <div className="pageRow__action-row">
                        <ul>
                            <li>
                                <NavLink to={ page.slug == '/' ? `/edit/page/homepage` : `/edit/page/${page.slug}`} className={(navData) => navData.isActive ? "active" : "" }>edit</NavLink>
                            </li>
                            <li>
                                <a onClick={navigateToPage}>visit page</a>
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