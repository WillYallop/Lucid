import React, { useContext, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
// Context
import { PageNotificationContext, PageNotificationContextNoticationsObj } from "../../../../helper/Context";
// Components
import DefaultPage from '../../../../components/Layout/DefaultPage';
// Functions
import getApiUrl from "../../../../functions/getApiUrl";

interface mod_componentModel {
    _id: string
    file_name: string
    file_path: string
    name: string
    description: string
    preview_url: string
    date_added: string
    date_modified: string

    content_types?: Array<mod_contentTypesConfigModel>
}

interface mod_contentTypesConfigModel {
    _id: string
    name: string // this is the custom name the user gives to the content type
    type: 'text' | 'email' | `rich_media` | 'number' | `range` | 'repeater' | 'select' | 'date' | 'media' | 'boolean' | 'json'
    config: {
        max_length?: number
        min_length?: number
        max_range?: number
        min_range?: number
        default_num?: number
        default_srt?: string
        max_repeats?: number
    }
    // Only type of repeater has this:
    fields?: Array<mod_contentTypesConfigModel>
}

interface editComponentProps {
    _id: string
}

const EditComponent: React.FC<editComponentProps> = ({ _id }) => {
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
    // Component 
    // -------------------------------------------------------
    const [ component, setComponent ] = useState({} as mod_componentModel);

    console.log(_id)

    // First load
    useEffect(() => {
        getComponentData();
        return () => {
            setNotifications((array: Array<PageNotificationContextNoticationsObj>) => []);
        }
    }, []);

    const getComponentData = () => {
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: `
                query {
                    components {
                        get_single ( _id: "${_id}" ) {
                            _id
                            name
                            file_name
                            file_path
                            description
                            preview_url
                            date_added
                            date_modified
                            content_types {
                                _id
                                name
                                type
                                config  {
                                    max_repeats
                                    max_range
                                    min_range
                                    max_length
                                    min_length
                                    default_num
                                    default_srt
                                }
                                fields {
                                    _id
                                    name
                                    type
                                    config {
                                        max_repeats
                                        max_range
                                        min_range
                                        max_length
                                        min_length
                                        default_num
                                        default_srt
                                    }
                                }
                            }
                        }
                    }
                }`
            }
        })
        .then((result) => {
            const componentData = result.data.data.components.get_single || {};
            if(!Object.keys(componentData).length) addNotification('There was an error getting your component!', 'error');
            setComponent({
                ...component,
                ...componentData
            });
        })
        .catch((err) => {
            console.log(err);
            addNotification('There was an error getting your component!', 'error');
        })
    }

    if(Object.keys(component).length) {
        return (
            <DefaultPage
            title="Edit Component"
            body="Manage your components fields and content types!">
                <div>
                    <ul>
                        <li><b>_id:</b> { component._id }</li>
                        <li><b>File name:</b> { component.file_name }</li>
                        <li><b>Name:</b> { component.name }</li>
                        <li><b>Description:</b> { component.description }</li>
                    </ul>
                </div>
            </DefaultPage>
        )
    }
    else {
        return (
            <DefaultPage
            title="Edit Component"
            body="Manage your components fields and content types!">
                <div>
                </div>
            </DefaultPage>
        )
    }
}

export default EditComponent;