import React, { useContext, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
// Context
import { PageNotificationContext, PageNotificationContextNoticationsObj, LoadingContext, ModalContext } from "../../helper/Context";
// Components
import PageRow from "./PageRow";
import DeleteConfirmModal from '../Modal/DeleteConfirmModal';
// Functions
import getApiUrl from "../../functions/getApiUrl";
import formatLucidError from '../../functions/formatLucidError';

export interface pageData {
    _id: string
    template: string
    slug: string
    name: string
    type: 'page' | 'post'
    post_name: string
    has_parent: boolean
    parent_id: string | null
    date_created: string
    last_edited: string
    author: string
    is_homepage: boolean
}

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
    const [ pages, setPages ] = useState<Array<pageData>>([]);
    const [ showLoadMore, setShowLoadMore ] = useState(true);

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
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
              query: `query {
                    page {
                        get_multiple
                        (
                            type: "${type}"
                            ${ post_name ? 'post_name: "'+ post_name +'"' : '' }
                            skip: ${s}, limit: ${l}
                        )
                        {
                            _id
                            slug
                            name
                            has_parent
                            parent_id
                            is_homepage
                        }
                    }
                }`
            }
        })
        .then((result) => {
            const allPages: Array<pageData> = result.data.data.page.get_multiple || [];
            if(allPages.length < limit) setShowLoadMore(false);
            setPages((pages) => [
                ...pages,
                ...allPages
            ]);
            setLoadingState(false);
        })
        .catch((err) => {
            addNotification('There was an error getting your pages!', 'error');
            setLoadingState(false);
        })
    }

    const openConfirmDeleteModal = (_id: pageData["_id"]) => {
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
    const deletePage = (_id: pageData["_id"]) => {
        setLoadingState(true);
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: `mutation {
                    page {
                        delete_single (
                            _id: "${_id}"
                        )
                        {
                            deleted
                        }
                    }
                }`
            }
        })
        .then((result) => {
            const deletePage: Array<pageData> = result.data.data.page.delete_single;
            if(deletePage) {
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
                addNotification(formatLucidError(result.data.errors[0].message).message, 'error');
            }
            setLoadingState(false);
        })
        .catch((err) => {
            addNotification('There was an error getting your pages!', 'error');
            setLoadingState(false);
        })
    }

    // -------------------------------------------------------
    // Recursive render helper
    // -------------------------------------------------------
    const getPageChildren = (page_id: pageData["_id"]) => {
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

    return (
        <div className="con">
            { pageRows }
            { showLoadMore ? <button className='btnStyle1' onClick={loadmore}>load more</button> : null }
        </div>
    )
}

export default PageList;