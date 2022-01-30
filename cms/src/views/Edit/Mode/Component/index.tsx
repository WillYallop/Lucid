import React, { useContext, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
// Context
import { 
    PageNotificationContext, PageNotificationContextNoticationsObj, 
    ModalContext 
} from "../../../../helper/Context";
// Components
import DefaultPage from '../../../../components/Layout/DefaultPage';
import SidebarMeta from "../../../../components/Layout/Sidebar/SidebarMeta";
import SidebarButton from "../../../../components/Layout/Sidebar/SidebarBtn";
import SidebarFormSubmit from "../../../../components/Layout/Sidebar/SidebarFormSubmit";
import ContentTypeRow, { mod_contentTypesConfigModel } from '../../../../components/ContentTypes/ContentTypeRow';
import CoreIcon from '../../../../components/Core/Icon';
import ComponentContentTypeActionForm from '../../../../components/Modal/ComponentContentTypeActionForm';
import ComponentDataForm from './Components/ComponentDataForm';
// Functions
import getApiUrl from "../../../../functions/getApiUrl";
// Icons
import { faSave, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

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
    const [ componentName, setComponentName ] = useState('');

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
    // Modal 
    // -------------------------------------------------------
    const { modalState, setModalState } = useContext(ModalContext);
    const openContentTypeActionModal = (actionType: 'update' | 'create' | 'repeater', contentType__id?: string) => {
        let title,body;
        if(actionType === 'create') {
            title = 'Add a content type';
            body = 'Create a configure a new content type!';
        }
        else if (actionType === 'update') {
            title = 'Update content type';
            body = 'Update your content types configuration!';
        }
        else {
            title = 'Add a content type';
            body = 'Create a new content type for the repeater!';
        }
        setModalState({
            ...modalState,
            state: true,
            title: title,
            body: body,
            element: <ComponentContentTypeActionForm
                component__id={_id}
                successCallback={addContentTypeSuccessCallback}
                contentType__id={contentType__id}
                actionType={actionType}/>
        });
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
                                fields {
                                    _id
                                    name
                                    type
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
            setComponentName(componentData.name);
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

    // Callback for adding new content type
    const addContentTypeSuccessCallback = (contentType: mod_contentTypesConfigModel) => {
        // Add new content type to component data
        const newContentTypeArr: Array<mod_contentTypesConfigModel> = component.content_types || [];
        newContentTypeArr.push(contentType);
        setComponent({
            ...component,
            ...{
                content_types: newContentTypeArr
            }
        });
        // Close modal
        setModalState({
            ...modalState,
            state: false,
        });
        // Add success message
        addNotification('You have successfully added a new content type!', 'success');
    }

    // -------------------------------------------------------
    // First load
    // -------------------------------------------------------
    useEffect(() => {
        getComponentData();
        return () => {
            setNotifications((array: Array<PageNotificationContextNoticationsObj>) => []);
            setComponent({} as mod_componentModel);
            // Close modal
            setModalState({
                ...modalState,
                state: false,
            });
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
                <SidebarFormSubmit
                    text="Save Changes"
                    formID={'compDataForm'}
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
        </>
    )

    const contentTypeRows: Array<ReactElement> = [];
    if(component.content_types) {
        for(let i = 0; i < component.content_types.length; i++) {
            contentTypeRows.push(
                <ContentTypeRow 
                    key={component.content_types[i]._id} 
                    contentType={ component.content_types[i]}
                    actionForm={openContentTypeActionModal}/>
            );
        }
    }
    
    return (
        <DefaultPage
        title={`Edit - ${componentName}`}
        body="Manage your components fields and content types!"
        sidebar={sidebar}>

            {/* Component Data */}
            <section className="section blockCon">
                <div className="header layout__flex layout__space-between layout__align-center">
                    <p className="bold">Component Data</p>
                </div>
                <div className="body layout">
                    <ComponentDataForm
                        component__id={_id}
                        name={{
                            value: component.name,
                            update: updateComponentName
                        }}
                        description={{
                            value: component.description,
                            update: updateComponentDescription
                        }}
                        successCallback={() => {
                            // Add success message
                            addNotification('You have successfully update the components data!', 'success');
                            updateAllowSave(false);
                            setComponentName(component.name);
                        }}/>
                </div>
            </section>
            
            {/* Content Types */}
            <section className="section blockCon">
                <div className="header layout__flex layout__space-between layout__align-center">
                    <p className="bold">Content Types</p>
                    <button className='btnStyleBlank' onClick={() => openContentTypeActionModal('create')}><CoreIcon icon={faPlus}/></button>
                </div>
                <div className="body layout">
                    { contentTypeRows }
                </div>
            </section>

        </DefaultPage>
    )
}

export default EditComponent;