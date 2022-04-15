import React, { useContext, ReactElement, useEffect, useState } from 'react';
// Context
import { PageNotificationContext, PageNotificationContextNoticationsObj, LoadingContext, ModalContext } from "../../helper/Context";
// Components
import PageRow from "./PageRow";
import DeleteConfirmModal from '../Modal/DeleteConfirmModal';
import IllustrationMessage from '../Layout/IllustationMessage';
import UtilityLoading from '../Ultility/Loading';
// Functions
import formatLucidError from '../../functions/formatLucidError';
// Assets
import noDataIllustration from '../../assets/noDataIllustration.svg';
// data
import { getMultiplePages, deleteSinglePage } from '../../data/page';


interface PageListProps {
    type: 'page' | 'post'
    post_name?: string
}

const PageList: React.FC<PageListProps> = ({ type, post_name }) => {

    const { loadingState, setLoadingState } = useContext(LoadingContext);
    const { modalState, setModalState } = useContext(ModalContext);
    const { notifications, setNotifications } = useContext(PageNotificationContext);
    let [ skip, limit ] = [ 0 , 50 ];
    const [ pages, setPages ] = useState<Array<mod_pageModel>>([]);
    const [ showLoadMore, setShowLoadMore ] = useState(false);

    // -------------------------------------------------------
    // Notification 
    // -------------------------------------------------------


    // -------------------------------------------------------
    // Fuctions
    // -------------------------------------------------------
    // get all page data
    const getAllPages = (s: number, l: number) => {
        setLoadingState(true);
        getMultiplePages({
            __args: {
                type: type,
                post_name: post_name ? post_name : '',
                skip: s, 
                limit: l
            },
            _id: true,
            slug: true,
            name: true,
            has_parent: true,
            parent_id: true,
            is_homepage: true
        },
        (response) => {
            const allPages: Array<mod_pageModel> = response.data.data.page.get_multiple || [];
            if(allPages.length < limit) setShowLoadMore(false);
            else setShowLoadMore(true);
            setPages((pages) => [
                ...pages,
                ...allPages
            ]);
            setLoadingState(false);
        },
        (err) => {
            addNotification('There was an error getting your pages!', 'error');
            setLoadingState(false);
        })
    }
    // open confirm delte page modal
    const openConfirmDeleteModal = (_id: mod_pageModel["_id"]) => {
        setModalState({
            ...modalState,
            state: true,
            title: 'confirmation',
            body: '',
            size: 'small',
            element: <DeleteConfirmModal 
                        message={'are you sure you would like to delete this page?'}
                        action={() => deletePage(_id)}/>
        });
    }
    // delete page
    const deletePage = (_id: mod_pageModel["_id"]) => {
        setLoadingState(true);
        deleteSinglePage({
            __args: {
                _id: _id
            },
            deleted: true
        },
        (response) => {
            const deletePage = response.data.data.page.delete_single;
            if(deletePage.deleted) {
                let findPageInd = pages.findIndex( x => x._id === _id );
                if(findPageInd != -1) {
                    pages.splice(findPageInd, 1);
                }
                pages.forEach((page) => {
                    if(page.parent_id === _id) {
                        page.has_parent = false;
                        page.parent_id = null;
                    }
                })
            }
            else {
                addNotification(formatLucidError(response.data.errors[0].message).message, 'error');
            }
            setLoadingState(false);
        },
        (err) => {
            addNotification('There was an error getting your pages!', 'error');
            setLoadingState(false);
        })
    }
    // add notifications
    const addNotification = (message: string, type: 'error' | 'warning' | 'success') => {
        setNotifications((array: Array<PageNotificationContextNoticationsObj>) => [
            ...array,
            {
                message: message,
                type: type
            }
        ]);
    }
    // Load more
    const loadmore = () => {
        skip += pages.length;
        getAllPages(skip, limit);
    }

    // -------------------------------------------------------
    // Recursive render helper
    // -------------------------------------------------------
    const getPageChildren = (page_id: mod_pageModel["_id"]) => {
        const result: Array<ReactElement> = [];
            pages.filter((page) => {
                if(page.parent_id === page_id) {
                    result.push(<PageRow key={pageRows.length} page={page} getChildren={getPageChildren} deleteCallback={openConfirmDeleteModal}/>)
                }
            });
        return result;
    }
    const pageRows: Array<ReactElement> = [];
    pages.forEach((page) => {
        // Add normally
        if(!page.has_parent) {
            pageRows.push(<PageRow key={pageRows.length} page={page} getChildren={getPageChildren} deleteCallback={openConfirmDeleteModal}/>)
        }
    });


    // First load
    useEffect(() => {
        getAllPages(skip, limit);
        return () => {
            setPages([]);
            setShowLoadMore(true);
            setNotifications((array: Array<PageNotificationContextNoticationsObj>) => []);
        }
    }, []);


    if(loadingState && !pages.length) {
        return (
            <div className="con">
                <div className="blockCon loading">
                    <UtilityLoading mode="light"/>
                </div>
                <div className="blockCon loading">
                    <UtilityLoading mode="light"/>
                </div>
                <div className="blockCon loading">
                    <UtilityLoading mode="light"/>
                </div>
                <div className="blockCon loading">
                    <UtilityLoading mode="light"/>
                </div>
                <div className="blockCon loading">
                    <UtilityLoading mode="light"/>
                </div>
                <div className="blockCon loading">
                    <UtilityLoading mode="light"/>
                </div>
            </div>
        )
    } 
    else {
        if(!pages.length) {
            return (
                <div className='blockCon'>
                    <IllustrationMessage 
                        img={noDataIllustration}
                        title={`no ${type}s found`}
                        body={'you can add a new page through the add button on the sidebar'}/>
                </div>
            )
        }
        else {
            return (
                <div className="con">
                    { pageRows }
                    { showLoadMore ? <button className='btnStyle1' onClick={loadmore}>load more</button> : null }
                </div>
            )
        }
    }
}

export default PageList;