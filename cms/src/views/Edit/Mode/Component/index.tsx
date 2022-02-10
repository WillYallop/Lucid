import React, { useContext, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
// Context
// Context
import { 
    PageNotificationContext, PageNotificationContextNoticationsObj, 
    ModalContext,
    LoadingContext
} from "../../../../helper/Context";
// Components
import DefaultPage from '../../../../components/Layout/DefaultPage';
import SidebarMeta from "../../../../components/Layout/Sidebar/SidebarMeta";
import SidebarButton from "../../../../components/Layout/Sidebar/SidebarBtn";
import SidebarFormSubmit from "../../../../components/Layout/Sidebar/SidebarFormSubmit";
import ContentTypeRow, { mod_contentTypesConfigModel } from '../../../../components/ContentTypes/ContentTypeRow';
import CoreIcon from '../../../../components/Core/Icon';
import ComponentContentTypeActionForm from './Components/ContentTypeActionForm';
import ComponentDataForm from './Components/ComponentDataForm';
import DeleteConfirmModal from '../../../../components/Modal/DeleteConfirmModal';
// Functions
import getApiUrl from "../../../../functions/getApiUrl";
import formatLucidError from '../../../../functions/formatLucidError';
// Icons
import { faSave, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import SidebarLayout from '../../../../components/Layout/Sidebar/SidebarLayout';

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
    // Modal 
    // -------------------------------------------------------
    const { modalState, setModalState } = useContext(ModalContext);
    const openContentTypeActionModal = (actionType: 'update' | 'create', contentType__id: mod_contentTypesConfigModel["_id"]) => {
        let title,body;
        if(actionType === 'create') {
            title = 'add a content type';
            body = 'create a configure a new content type!';
        }
        else if (actionType === 'update') {
            title = 'update content type';
            body = 'update your content types configuration!';
        }
        setModalState({
            ...modalState,
            state: true,
            title: title,
            size: 'standard',
            body: body,
            element: <ComponentContentTypeActionForm
                component__id={_id}
                successCallback={contentTypeActionFormSuccessCallback}
                actionType={actionType}
                contentType__id={contentType__id}/>
        });
    }

    // -------------------------------------------------------
    // Component 
    // -------------------------------------------------------
    const [ allowSave, updateAllowSave ] = useState(false);

    const [ component, setComponent ] = useState({} as mod_componentModel);
    const getComponentData = () => {
        setLoadingState(true);
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
                                parent
                                config {
                                    max
                                    min
                                    default
                                }
                            }
                        }
                    }
                }`
            }
        })
        .then((result) => {
            const componentData = result.data.data.components.get_single || {};
            if(!Object.keys(componentData).length) addNotification('there was an error getting your component!', 'error');
            setComponent({
                ...component,
                ...componentData
            });
            setComponentName(componentData.name);
            setLoadingState(false);
        })
        .catch((err) => {
            console.log(err);
            addNotification('there was an error getting your component!', 'error');
            setLoadingState(false);
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
    const contentTypeActionFormSuccessCallback = (contentType: mod_contentTypesConfigModel, actionType: 'update' | 'create', repeater__id?: string) => {
        const newContentTypeArr: Array<mod_contentTypesConfigModel> = component.content_types || [];
        if(actionType === 'create') {
            // Add new content type to component data
            newContentTypeArr.push(contentType);
            setComponent({
                ...component,
                ...{
                    content_types: newContentTypeArr
                }
            });
            // Add success message
            addNotification('you have successfully added a new content type!', 'success');
        }
        else {
            // Add new content type to component data
            const updatedIndex = newContentTypeArr.findIndex( x => x._id === contentType._id );
            if(updatedIndex != -1) {
                newContentTypeArr[updatedIndex] = contentType;
                setComponent({
                    ...component,
                    ...{
                        content_types: newContentTypeArr
                    }
                });
            }
            // Add success message
            addNotification(`you have successfully update the "${contentType.name}" content type!`, 'success');
        }
        // Close modal
        setModalState({
            ...modalState,
            state: false,
        });
    }

    // Delete component
    const deleteComponent = (contentType__id: mod_contentTypesConfigModel["_id"]) => {
        setLoadingState(true);
        const query = `mutation
            {
                content_type_config 
                {
                    delete_single 
                    (
                        component_id: "${_id}"
                        content_type_id: "${contentType__id}"
                    )
                    {
                        deleted
                    }
                }
            }`;
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: query
            }
        })
        .then((result) => {
            const componentData = result.data.data.content_type_config.delete_single;
            if(componentData) {
                if(componentData.deleted) {
                    // Add new content type to component data
                    const newContentTypeArr: Array<mod_contentTypesConfigModel> = component.content_types || [];
                    const updatedIndex = newContentTypeArr.findIndex( x => x._id === contentType__id );
                    if(updatedIndex != -1) newContentTypeArr.splice(updatedIndex, 1);
                    setComponent({
                        ...component,
                        ...{
                            content_types: newContentTypeArr
                        }
                    });
                    // Add success message
                    addNotification(`you have successfully deleted the content type!`, 'success');
                }
            }
            else {
                addNotification(formatLucidError(result.data.errors[0].message).message, 'error');
            }
            setLoadingState(false);
        })
        .catch((err) => {
            addNotification(`there was an error while deleting the content type with ID "${contentType__id}"!`, 'error');
            setLoadingState(false);
        })
    }
    const openConfirmDeleteModal = (contentType__id: mod_contentTypesConfigModel["_id"]) => {
        setModalState({
            ...modalState,
            state: true,
            title: 'confirmation',
            body: '',
            size: 'small',
            element: <DeleteConfirmModal 
                        message={'are you sure you would like to delete this content type?'}
                        action={() => deleteComponent(contentType__id)}/>
        });
    }


    // -------------------------------------------------------
    // First load
    // -------------------------------------------------------
    useEffect(() => {
        getComponentData();
        return () => {
            setNotifications([]);
            setComponent({} as mod_componentModel);
            // Close modal
            setModalState({
                ...modalState,
                state: false,
            });
        }
    }, []);


    // -------------------------------------------------------
    // Sidebar
    // -------------------------------------------------------
    const sidebar = (
        <>  
            {
                allowSave
                ?
                <SidebarFormSubmit
                    text="save changes"
                    formID={'compDataForm'}
                    icon={faSave}/>
                :
                null
            }
            <SidebarButton 
                text="add content type"
                action={() => { openContentTypeActionModal('create', 'root') }}
                icon={faPlus}/>
            <SidebarButton 
                text="deregister"
                action={() => { alert('deregister') }}
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

            <SidebarLayout>
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
                        addNotification('you have successfully update the components data!', 'success');
                        updateAllowSave(false);
                        setComponentName(component.name);
                    }}/>
            </SidebarLayout>
        </>
    )


    // -------------------------------------------------------
    // Recursive render helper
    // -------------------------------------------------------
    const getContentTypeChildren = (contentType__id: mod_contentTypesConfigModel["_id"]): Array<ReactElement> => {
        const result: Array<ReactElement> = [];
        // Loop through component.content_types and find ones with parent ID matching to contentType_id and reurn
        if(component.content_types) { 
            component.content_types.filter( x => {
                if(x.parent === contentType__id) {
                    result.push(<ContentTypeRow 
                        key={x._id} 
                        contentType={x}
                        actionForm={openContentTypeActionModal}
                        deleteCallback={openConfirmDeleteModal}
                        getChildren={getContentTypeChildren}/>);
                }
            });
        }
        return result;
    }

    const contentTypeRows: Array<ReactElement> = [];
    if(component.content_types) {
        component.content_types.forEach((contentType) => {
            // Add normally
            if(contentType.parent === 'root') {
                contentTypeRows.push(<ContentTypeRow 
                    key={contentType._id} 
                    contentType={contentType}
                    actionForm={openContentTypeActionModal}
                    deleteCallback={openConfirmDeleteModal}
                    getChildren={getContentTypeChildren}/>)
            }
        });
    }


    return (
        <DefaultPage
        title={`edit - ${componentName}`}
        body="manage your components fields and content types!"
        sidebar={sidebar}>
            {/* Content Types */}
            <section>
                { contentTypeRows }
            </section>
        </DefaultPage>
    )
}

export default EditComponent;