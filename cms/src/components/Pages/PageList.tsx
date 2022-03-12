import React, { useContext, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
// Context
import { PageNotificationContext, PageNotificationContextNoticationsObj, LoadingContext, ModalContext } from "../../helper/Context";
// Components
import PageRow from "./PageRow";
import DeleteConfirmModal from '../Modal/DeleteConfirmModal';
import IllustrationMessage from '../Layout/IllustationMessage';
import UtilityLoading from '../Ultility/Loading';
// Functions
import getApiUrl from "../../functions/getApiUrl";
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

    // -------------------------------------------------------
    // Modal 
    // -------------------------------------------------------
    const { modalState, setModalState } = useContext(ModalContext);

    // -------------------------------------------------------
    // Notification 
    // -------------------------------------------------------
    const { notifications, setNotifications } = useContext(PageNotificationContext);
    const addNotification = (message: string, type: 'error' | 'warning' | 'success') => {
        setNotifications((array: Array<PageNotificationContextNoticationsObj>) => [
            ...array,
            {
                message: message,
                type: type
            }
        ]);
    }

    // -------------------------------------------------------
    // Components
    // -------------------------------------------------------
    let [ skip, limit ] = [ 0 , 50 ];
    const [ pages, setPages ] = useState<Array<mod_pageModel>>([]);
    const [ showLoadMore, setShowLoadMore ] = useState(false);

    // First load
    useEffect(() => {
        getAllPages(skip, limit);
        return () => {
            setPages([]);
            setShowLoadMore(true);
            setNotifications((array: Array<PageNotificationContextNoticationsObj>) => []);
        }
    }, []);

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


    // Load more
    const loadmore = () => {
        skip += pages.length;
        getAllPages(skip, limit);
    }


    if(loadingState && !pages.length) {
        return (
            <div className="con">
                <div className="blockCon loading">
                    <UtilityLoading mode="dark"/>
                </div>
                <div className="blockCon loading">
                    <UtilityLoading mode="dark"/>
                </div>
                <div className="blockCon loading">
                    <UtilityLoading mode="dark"/>
                </div>
                <div className="blockCon loading">
                    <UtilityLoading mode="dark"/>
                </div>
                <div className="blockCon loading">
                    <UtilityLoading mode="dark"/>
                </div>
                <div className="blockCon loading">
                    <UtilityLoading mode="dark"/>
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