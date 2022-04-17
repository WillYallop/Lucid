import React, { useContext, ReactElement, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
// Context
import { 
    ModalContext,
    LoadingContext
} from "../../../../helper/Context";
// Components
import DefaultPage from '../../../../components/Layout/DefaultPage';
import SidebarMeta from "../../../../components/Layout/Sidebar/SidebarMeta";
import SidebarButton from "../../../../components/Layout/Sidebar/SidebarBtn";
import SidebarFormSubmit from "../../../../components/Layout/Sidebar/SidebarFormSubmit";
import ContentTypeRow from '../../../../components/ContentTypes/ContentTypeRow';
import ComponentContentTypeActionForm from './Components/ContentTypeActionForm';
import ComponentDataForm from './Components/ComponentDataForm';
import DeleteConfirmModal from '../../../../components/Modal/DeleteConfirmModal';
// Functions
import formatLucidError from '../../../../functions/formatLucidError';
// Icons
import { faSave, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import SidebarLayout from '../../../../components/Layout/Sidebar/SidebarLayout';
// Data
import { degrigisterComponent, getSingleComponent } from '../../../../data/components';
import { deleteContentTypeConfig } from '../../../../data/contentTypeConfig';

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

    const { addToast } = useToasts();
    const navigate = useNavigate();
    const [ componentName, setComponentName ] = useState('');
    const { loadingState, setLoadingState } = useContext(LoadingContext);

    // -------------------------------------------------------
    // Notification 
    // -------------------------------------------------------
    const addNotification = (message: string, type: 'error' | 'warning' | 'success') => {
        addToast(message, {
            appearance: type
        });
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
        getSingleComponent({
            __args: {
                _id: _id
            },
            _id: true,
            name: true,
            file_name: true,
            file_path: true,
            description: true,
            preview_url: true,
            date_added: true,
            date_modified: true,
            content_types: {
                _id: true,
                name: true,
                type: true,
                parent: true,
                config: {
                    max: true,
                    min: true,
                    default: true
                }
            }
        },
        (response) => {
            const componentData = response.data.data.components.get_single || {};
            if(!Object.keys(componentData).length) addNotification('there was an error getting your component!', 'error');
            setComponent({
                ...component,
                ...componentData
            });
            setComponentName(componentData.name);
            setLoadingState(false);
        }, 
        () => {
            addNotification('there was an error getting your component!', 'error');
            setLoadingState(false);
        });
    }

    // Update data
    // Update description 
    const updateComponentDescription = (value: string) => {
        component.date_modified = new Date().toString();
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
        component.date_modified = new Date().toString();
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
            component.date_modified = new Date().toString();
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
                component.date_modified = new Date().toString();
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

    // Delete content type
    const confirmDeleteContentType = (contentType__id: mod_contentTypesConfigModel["_id"]) => {
        setModalState({
            ...modalState,
            state: true,
            title: 'confirmation',
            body: '',
            size: 'small',
            element: <DeleteConfirmModal 
                        message={'are you sure you would like to delete this content type?'}
                        action={() => {
                            setLoadingState(true);
                            deleteContentTypeConfig({
                                __args: {
                                    component_id: _id,
                                    content_type_id: contentType__id
                                },
                                deleted: true
                            },
                            (response) => {
                                const componentData = response.data.data.content_type_config.delete_single;
                                if(componentData) {
                                    if(componentData.deleted) {
                                        // Add new content type to component data
                                        const newContentTypeArr: Array<mod_contentTypesConfigModel> = component.content_types || [];
                                        const updatedIndex = newContentTypeArr.findIndex( x => x._id === contentType__id );
                                        if(updatedIndex != -1) newContentTypeArr.splice(updatedIndex, 1);
                                        component.date_modified = new Date().toString();
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
                                    addNotification(formatLucidError(response.data.errors[0].message).message, 'error');
                                }
                                setLoadingState(false);
                            },
                            () => {
                                addNotification(`there was an error while deleting the content type with ID "${contentType__id}"!`, 'error');
                                setLoadingState(false);
                            })
                        }}/>
        });
    }
    // Delete component
    const confirmDeleteComponent = (component_id: mod_componentModel["_id"]) => {
        setModalState({
            ...modalState,
            state: true,
            title: 'confirmation',
            body: '',
            size: 'small',
            element: <DeleteConfirmModal 
                        message={'are you sure you would like to deregister this component?'}
                        action={() => {
                            setLoadingState(true);
                            degrigisterComponent({
                                __args: {
                                    _id: component_id
                                },
                                deleted: true
                            },
                            (result) => {
                                if(result) if(result.data.data.components.delete_single.deleted) navigate('/components');
                                else addNotification(formatLucidError(result.data.errors[0].message).message, 'error');
                                setLoadingState(false);
                            },
                            () => {
                                addNotification(`there was an error while degregistering this component with an ID of"${component_id}"!`, 'error');
                                setLoadingState(false);
                            });
                        }}/>
        });
    }


    // -------------------------------------------------------
    // First load
    // -------------------------------------------------------
    useEffect(() => {
        getComponentData();
        return () => {
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
                action={() => confirmDeleteComponent(_id)}
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
                        deleteCallback={confirmDeleteContentType}
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
                    deleteCallback={confirmDeleteContentType}
                    getChildren={getContentTypeChildren}/>)
            }
        });
    }


    return (
        <DefaultPage
            title={`${componentName}`}
            body="configure the component with the content type fields you want it to have"
            sidebar={sidebar}>
            {/* Content Types */}
            <section>
                { contentTypeRows }
            </section>
        </DefaultPage>
    )
}

export default EditComponent;