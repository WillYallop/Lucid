import React, { useContext, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
// Context
import { PageNotificationContext, PageNotificationContextNoticationsObj } from "../../../helper/Context";
// Components
import ComponentRow from "./ComponentRow";

interface componentData {
    date_added: string
    description: string
    name: string
    preview_url: string
    _id: string
}

const ComponentList: React.FC = () => {
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

    useEffect(() => {
        getAllComponents(skip, limit);
        return () => {
            setComponents([]);
            setShowLoadMore(true);
        }
    }, []);

    const getAllComponents = (s: number, l: number) => {
        axios({
            url: 'http://api.lucid.local/auth',
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
        })
        .catch((err) => {
            console.log(err);
            addNotification('There was an error getting your components!', 'error');
        })
    }

    // Create results array
    const componentRows: Array<ReactElement> = [];
    if(components.length) {
        components.forEach((component) => {
            componentRows.push(<ComponentRow key={componentRows.length} component={component}/>)
        });
    } 
    else {
        return <p>Loading</p>
    }

    // Load more
    const loadmore = () => {
        skip += components.length;
        getAllComponents(skip, limit);
    }

    return (
        <div className="componentList">
            { componentRows }
            { showLoadMore ? <button onClick={loadmore}>Load more</button> : null }
            
        </div>
    )
}

export default ComponentList;