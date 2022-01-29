import React, { useContext, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
// Context
import { PageNotificationContext, PageNotificationContextNoticationsObj } from "../../../../helper/Context";
// Components
import DefaultPage from '../../../../components/Layout/DefaultPage';
import SidebarMeta from "../../../../components/Layout/Sidebar/SidebarMeta";
import SidebarButton from "../../../../components/Layout/Sidebar/SidebarBtn";
import SidebarLayout from '../../../../components/Layout/Sidebar/SidebarLayout';
import TextareaInput from '../../../../components/Core/Inputs/TextareaInput';
import TextInput from '../../../../components/Core/Inputs/TextInput';
import ContentTypeRow, { mod_contentTypesConfigModel } from '../../../../components/ContentTypes/ContentTypeRow';
// Functions
import getApiUrl from "../../../../functions/getApiUrl";
// Icons
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
    const [ allowSave, updateAllowSave ] = useState(false);

    const [ component, setComponent ] = useState({} as mod_componentModel);
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

    // Update data
    // Update description 
    const updateComponentDescription = (value: string) => {
        setComponent({
            ...component,
            ...{
                description: value
            }
        });
        updateAllowSave(true);
    }

    // Update name
    const updateComponentName = (value: string) => {
        setComponent({
            ...component,
            ...{
                name: value
            }
        });
        updateAllowSave(true);
    }


    // -------------------------------------------------------
    // First load
    // -------------------------------------------------------
    useEffect(() => {
        getComponentData();
        return () => {
            setNotifications((array: Array<PageNotificationContextNoticationsObj>) => []);
        }
    }, []);


    // -------------------------------------------------------
    // Save component data
    // -------------------------------------------------------
    const saveComponentData = () => {
        
    }


    // -------------------------------------------------------
    // Sidebar
    // -------------------------------------------------------
    const sidebar = (
        <>  
            {
                allowSave
                ?
                <SidebarButton 
                text="Save Changes"
                action={saveComponentData}
                icon={faSave}/>
                :
                null
            }
            <SidebarButton 
                text="Deregister"
                action={saveComponentData}
                icon={faTrashAlt}
                style={'warning'}/>
            <SidebarMeta 
                rows={[
                    {
                        key: 'created:',
                        data: new Date(component.date_added).toLocaleDateString()
                    },
                    {
                        key: 'last edited:',
                        data: new Date(component.date_modified).toLocaleDateString()
                    }
                ]}/>
            <SidebarLayout
                title="Description">
                {/* Component Description */}
                <TextareaInput
                    value={component.description}
                    id={"componentDescInp"}
                    name={"comp_desc"}
                    required={true}
                    errorMsg={`Description can only include the following characters: [A-Za-z \-\!,?._'@] and be a minimum of 0 and maximum of 400 characters long!`}
                    updateValue={updateComponentDescription}
                    min={0}
                    max={400}
                    style={'--no-margin'}/>
            </SidebarLayout>
        </>
    )

    const contentTypeRows: Array<ReactElement> = [];
    if(component.content_types) {
        for(let i = 0; i < component.content_types.length; i++) {
            contentTypeRows.push(<ContentTypeRow contentType={ component.content_types[i]}/>);
        }
    }
    
    return (
        <DefaultPage
        title="Edit Component"
        body="Manage your components fields and content types!"
        sidebar={sidebar}>

            {/* Component name input */}
            <TextInput
                value={component.name}
                id={"componentNameInp"}
                name={"comp_name"}
                required={true}
                errorMsg={`Name can only include the following characters: [A-Za-z -!,?._'"@] and be a minimum of 2 and maximum of 60 characters long!`}
                updateValue={updateComponentName}
                style={'--no-margin'}/>

            <div className="manageContentTypesCon blockCon blockCon--margin-top">
                <div className="header layout__flex layout__space-between layout__align-center">
                    <p className="bold">Content Types</p>
                    <button className="btnStyle1 btnStyle1--small">Add Field</button>
                </div>
                <div className="layout">
                    { contentTypeRows }
                </div>
            </div>

        </DefaultPage>
    )
}

export default EditComponent;