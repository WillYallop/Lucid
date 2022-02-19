import { useState, ReactElement, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Components
import CoreIcon from '../../../../../components/Core/Icon';
import SearchInput from "../../../../../components/Core/Inputs/SearchInput";
// Context
import { PageNotificationContext } from "../../../../../helper/Context";
// Icons
import { faSignInAlt, faSave } from '@fortawesome/free-solid-svg-icons';
// Functions 
import getApiUrl from "../../../../../functions/getApiUrl";
import formatLucidError from "../../../../../functions/formatLucidError";

interface pageSerach {
    slug: string
    name: string
    _id: string
}

interface editPageHeaderProps {
    pageName: string
    canSave: boolean
    saveCallback: () => void
}

const EditPageHeader: React.FC<editPageHeaderProps> = ({ pageName, canSave, saveCallback }) => {
    const mounted = useRef(false);
    const navigate = useNavigate();

    const { notifications, setNotifications } = useContext(PageNotificationContext);
    const [ notificationTimeout, setNotificationTimeout ] = useState<ReturnType<typeof setTimeout>>();
    const [ pageSearchQuery, setPageSearchQuery ] = useState('');
    const [ pageSearchResults, setPageSearchResults ] = useState<Array<pageSerach>>([]);

    const addNotification = (message: string, type: 'error' | 'warning' | 'success') => {
        setNotifications([{
            message: message,
            type: type
        }]);
        if(notificationTimeout != undefined) clearTimeout(notificationTimeout);
        setNotificationTimeout(setTimeout(() => {
            notifications?.pop();
            setNotifications(notifications);
        }, 5000));
    }

    const pageSearchAction = (value: string) => {
        // Search query and and set page search results
        const query = `query {
            page {
                search_name (
                    query: "${value}"
                    full_slug: false
                    allow_home: true
                    type: "all"
                )
                {
                    slug
                    name
                    _id
                }
            }
        }`;
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: query
            }
        })
        .then((res) => {
            if(res.data.data.page.search_name) {
                if(!mounted.current) return null;
                setPageSearchResults(res.data.data.page.search_name);
            }
            else {
                addNotification(formatLucidError(res.data.errors[0].message).message,'error');
            }
        })
        .catch(() => {
            addNotification('An unexpected error occured while querying the pages!','error');
        })
    }

    const pageResultElements: Array<ReactElement> = [];
    for(let i = 0; i < pageSearchResults.length; i++) {
        pageResultElements.push(
            <button className='pageSearchBtn'
                type='button'
                key={pageSearchResults[i]._id}
                onClick={() => { 
                    if(pageSearchResults[i].slug === '/') navigate(`/edit/page/homepage`);
                    else navigate(`/edit/page/${pageSearchResults[i].slug}`);
                 }}>
                { pageSearchResults[i].name }<span> - {  pageSearchResults[i].slug }</span>
            </button>
        )
    }

    useEffect( () => {
        mounted.current = true;
        if(pageName != undefined) setPageSearchQuery(pageName);

        return () => {
            mounted.current = false;
            setPageSearchQuery('');
            setPageSearchResults([]);
        }
    }, [pageName])

    return (
        <header className="editPageHeader">

            {/* Edit */}
            <button 
                className='btnStyleBlank'
                onClick={() => { navigate('/pages') }}>
                <CoreIcon icon={faSignInAlt} style={'flip-horizontal'}/>
            </button>

            {/* Page Search */}
            <div className="headerSearchWrapper">
                <SearchInput
                    value={pageSearchQuery}
                    id={'assignedPageSearchInp'}
                    name={'assigned_page'}
                    errorMsg={''}
                    updateValue={(value) => {
                        setPageSearchQuery(value);
                    }}
                    results={pageResultElements}
                    searchAction={pageSearchAction}
                    style={'--hide-seperator --no-margin'}/>
            </div>

            {/* Save Button */}
            <button
                className={`btnStyle3`} 
                onClick={() => {
                    saveCallback();
                }}
                disabled={!canSave}>
                <CoreIcon 
                    icon={faSave}
                    style={'flip-horizontal'}/>
                <p>save page</p>
            </button>

        </header>
    )
}

export default EditPageHeader;