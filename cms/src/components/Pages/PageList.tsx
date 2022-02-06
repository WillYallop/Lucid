import React, { useContext, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
// Context
import { PageNotificationContext, PageNotificationContextNoticationsObj, LoadingContext } from "../../helper/Context";
// Components
import PageRow from "./PageRow";
import UtilityLoading from '../../components/Ultility/Loading';
// Functions
import getApiUrl from "../../functions/getApiUrl";

export interface pageData {
    _id: string
    template: string
    slug: string
    name: string
    type: 'page' | 'post'
    post_name: string
    has_parent: boolean
    parent_id: string
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
                            template
                            slug
                            name
                            type
                            post_name
                            has_parent
                            parent_id
                            date_created
                            last_edited
                            author
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


    // -------------------------------------------------------
    // Recursive render helper
    // -------------------------------------------------------
    const getPageChildren = (page_id: pageData["_id"]) => {
        const result: Array<ReactElement> = [];
            pages.filter((page) => {
                if(page.parent_id === page_id) {
                    result.push(<PageRow key={pageRows.length} page={page} getChildren={getPageChildren}/>)
                }
            });
        return result;
    }
    const pageRows: Array<ReactElement> = [];
    pages.forEach((page) => {
        // Add normally
        if(!page.has_parent) {
            pageRows.push(<PageRow key={pageRows.length} page={page} getChildren={getPageChildren}/>)
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