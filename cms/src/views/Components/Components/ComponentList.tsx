import React, { useContext, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
// Context
import { PageNotificationContext, PageNotificationContextNoticationsObj, LoadingContext } from "../../../helper/Context";
// Components
import ComponentRow from "./ComponentRow";
import UtilityLoading from '../../../components/Ultility/Loading';
// Functions
import getApiUrl from "../../../functions/getApiUrl";

interface componentData {
    date_added: string
    description: string
    name: string
    preview_url: string
    file_path: string
    _id: string
}

interface componentListProps {
    expanded: boolean
}

const ComponentList: React.FC<componentListProps> = ({ expanded }) => {
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
    let [ skip, limit ] = [ 0 , 10 ];
    const [ components, setComponents ] = useState<Array<componentData>>([]);
    const [ showLoadMore, setShowLoadMore ] = useState(true);

    // First load
    useEffect(() => {
        getAllComponents(skip, limit);
        return () => {
            setComponents([]);
            setShowLoadMore(true);
            setNotifications((array: Array<PageNotificationContextNoticationsObj>) => []);
        }
    }, []);

    const getAllComponents = (s: number, l: number) => {
        setLoadingState(true);
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
              query: `
                query {
                    components {
                        get_multiple ( skip: ${s}, limit: ${l} )
                        {
                            _id
                            name
                            description
                            preview_url
                            date_added
                            file_path
                        }
                    }
                }`
            }
        })
        .then((result) => {
            const allComponents: Array<componentData> = result.data.data.components.get_multiple || [];
            if(allComponents.length < limit) setShowLoadMore(false);
            setComponents((components) => [
                ...components,
                ...allComponents
            ]);
            setLoadingState(false);
        })
        .catch((err) => {
            addNotification('There was an error getting your components!', 'error');
            setLoadingState(false);
        })
    }

    // Create results array
    const componentRows: Array<ReactElement> = [];
    if(components.length) {
        components.forEach((component) => {
            componentRows.push(<ComponentRow key={componentRows.length} component={component} expanded={expanded}/>)
        });
    } 
    else {
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
            </div>
        )
    }

    // Load more
    const loadmore = () => {
        skip += components.length;
        getAllComponents(skip, limit);
    }

    return (
        <div className="con">
            { componentRows }
            { showLoadMore ? <button className='btnStyle1' onClick={loadmore}>Load more</button> : null }
        </div>
    )
}

export default ComponentList;