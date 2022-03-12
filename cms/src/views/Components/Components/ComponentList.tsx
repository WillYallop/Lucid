import React, { useContext, ReactElement, useEffect, useState } from 'react';
// Context
import { PageNotificationContext, PageNotificationContextNoticationsObj, LoadingContext, ModalContext } from "../../../helper/Context";
// Components
import ComponentRow from "./ComponentRow";
// Functions
import getApiUrl from "../../../functions/getApiUrl";
// data
import { getMultipleComponents } from '../../../data/components';


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
    const [ showLoadMore, setShowLoadMore ] = useState(false);

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
        getMultipleComponents({
            __args: {
                skip: s, 
                limit: l
            },
            _id: true,
            name: true,
            description: true,
            preview_url: true,
            date_added: true,
            file_path: true,
            file_name: false,
            date_modified: false,
            content_types: false
        },
        (response) => {
            const allComponents: Array<componentData> = response.data.data.components.get_multiple || [];
            if(allComponents.length < limit) setShowLoadMore(false);
            else setShowLoadMore(true);
            setComponents((components) => [
                ...components,
                ...allComponents
            ]);
            setLoadingState(false);
        },
        () => {
            addNotification('There was an error getting your components!', 'error');
            setLoadingState(false);
        })
    }

    // Load more
    const loadmore = () => {
        skip += components.length;
        getAllComponents(skip, limit);
    }

    // Create results array
    const componentRows: Array<ReactElement> = [];
    if(components.length) {
        components.forEach((component) => {
            componentRows.push(<ComponentRow key={component._id} component={component} expanded={expanded}/>)
        });
    } 

    
    return (
        <div className="con">
            { componentRows }
            { showLoadMore ? <button className='btnStyle1' onClick={loadmore}>load more</button> : null }
        </div>
    )

}

export default ComponentList;