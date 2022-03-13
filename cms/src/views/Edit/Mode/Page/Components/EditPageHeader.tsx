import { useState, ReactElement, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Components
import CoreIcon from '../../../../../components/Core/Icon';
import SearchInput from "../../../../../components/Core/Inputs/SearchInput";
import DeleteConfirmModal from '../../../../../components/Modal/DeleteConfirmModal';
// Context
import { PageNotificationContext, ModalContext } from "../../../../../helper/Context";
// Icons
import { faSignInAlt, faSave } from '@fortawesome/free-solid-svg-icons';
// Functions 
import formatLucidError from "../../../../../functions/formatLucidError";
// data
import { searchPageName } from '../../../../../data/page';

interface editPageHeaderProps {
    pageName: string
    canSave: boolean
    saveCallback: () => void
    checkForErrors: (callback:() => void) => void
}

const EditPageHeader: React.FC<editPageHeaderProps> = ({ pageName, canSave, saveCallback, checkForErrors }) => {
    const mounted = useRef(false);
    const navigate = useNavigate();

    const { modalState, setModalState } = useContext(ModalContext);
    const { notifications, setNotifications } = useContext(PageNotificationContext);
    const [ notificationTimeout, setNotificationTimeout ] = useState<ReturnType<typeof setTimeout>>();
    const [ pageSearchQuery, setPageSearchQuery ] = useState('');
    const [ pageSearchResults, setPageSearchResults ] = useState<Array<pageSearchRes>>([]);

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
        searchPageName({
            __args: {
                query: value,
                full_slug: false,
                allow_home: true,
                type: "all"
            },
            slug: true,
            name: true,
            _id: true
        },
        (response) => {
            if(response.data.data.page.search_name) {
                if(!mounted.current) return null;
                setPageSearchResults(response.data.data.page.search_name);
            }
            else {
                addNotification(formatLucidError(response.data.errors[0].message).message,'error');
            }
        },
        (err) => {
            addNotification('An unexpected error occured while querying the pages!','error');
        })
    }

    const pageResultElements: Array<ReactElement> = [];
    for(let i = 0; i < pageSearchResults.length; i++) {
        pageResultElements.push(
            <button className='pageSearchBtn'
                type='button'
                key={pageSearchResults[i]._id}
                onClick={(e) => { 
                    checkForErrors(() => {
                        const navigateAway = () => {
                            if(pageSearchResults[i].slug === '/') navigate(`/edit/page/homepage`);
                            else navigate(`/edit/page/${pageSearchResults[i].slug}`);
                        }
                        if(canSave) {
                            e.stopPropagation();
                            setModalState({
                                ...modalState,
                                state: true,
                                title: 'confirmation',
                                body: '',
                                size: 'small',
                                element: <DeleteConfirmModal 
                                            btnText={['close', 'continue']}
                                            message={'you have unsaved changes, these will be lost if navigate to a new page!'}
                                            action={() => navigateAway()}/>
                            });
                        } else navigateAway();
                    })
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
    }, [pageName, canSave])

    return (
        <header className="editPageHeader">

            {/* Edit */}
            <button 
                className='btnStyleBlank'
                onClick={(e) => { 
                        if(canSave) {
                            e.stopPropagation();
                            setModalState({
                                ...modalState,
                                state: true,
                                title: 'confirmation',
                                body: '',
                                size: 'small',
                                element: <DeleteConfirmModal 
                                            btnText={['close', 'continue']}
                                            message={'you have unsaved changes, these will be lost if you continue!'}
                                            action={() => navigate('/pages')}/>
                            });
                        } else {
                            navigate('/pages');
                        }
                    }}>
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