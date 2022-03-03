import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Components
import PagePreview from './Components/PagePreview';
import EditPageHeader from './Components/EditPageHeader';
import SelectInput from '../../../../components/Core/Inputs/SelectInput';
import ComponentListModal from './Components/ComponentListModal';
import CoreIcon from '../../../../components/Core/Icon';
import NotificationPopup from '../../../../components/Core/Notifications/NotificationPopup';
import EditPageComponent from './Components/EditPageComponent';
import DeleteConfirmModal from '../../../../components/Modal/DeleteConfirmModal';
// Context
import { ModalContext, PageNotificationContext } from "../../../../helper/Context";
import { PageContext, UpdatedDataContext, defaultUpdateDataObj } from './functions/PageContext';
// Functions
import formatLucidError from '../../../../functions/formatLucidError';
import getApiUrl from '../../../../functions/getApiUrl';
import { savePageHandler, savePageComponentsHandler, deletePageComponentsHandler, saveGroupsHandler, saveFieldDataHandler, deleteGroupsHandler } from './functions/savePageHandler';
// Icons
import { faTh, faEdit, faTrashAlt, faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';

interface editPageProps {
    slug: string
}

const EditPage: React.FC<editPageProps> = ({ slug }) => {

    const mounted = useRef(false);

    // ---------------------------------------------------------------------/
    // - STATE -------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const { modalState, setModalState } = useContext(ModalContext);
    const { notifications, setNotifications } = useContext(PageNotificationContext);
    const [ notificationTimeout, setNotificationTimeout ] = useState<ReturnType<typeof setTimeout>>();
    const [ loading, setLoading ] = useState(true);
    const [ activeSlug, setActiveSlug ] = useState(slug);
    const [ canSave, setCanSave ] = useState(false); // Can save
    
    const [ page, setPage ] = useState({} as mod_pageModel); // page PageContext
    
    const [ pageMarkup, setPageMarkup ] = useState(''); // Page preview markup
    // Template
    const [ templates, setTemplates ] = useState([]);
    // Selected component
    const [ pageMode, setPageMode ] = useState<'preview' | 'edit_component'>('preview')
    
    const [ selectedPageComponent, setSelectedPageComponent ] = useState({} as mod_page_componentModel);
    const [ selectedPageCompID, setSelectedPageCompID ] = useState('');

    const [ mouseYPos, setMouseYPos ] = useState(0);
    const [ dragTarget, setDragTarget ] = useState<HTMLElement>();

    // New data
    // Used to track and store data changes
    const [ updatedData, setUpdatedData ] = useState(defaultUpdateDataObj.updatedData);



    // ---------------------------------------------------------------------/
    // - DATA --------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const getPageData = () => {
        setLoading(true);
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
              query: `query {
                page {
                    get_single(slug: "${ slug === 'homepage' ? '/' : slug }") {
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
                        post_type_id
                        seo {
                            page_id
                            title
                            og_title
                            description
                            og_description
                            og_image
                        }
                        page_components {
                            _id
                            position
                            component {
                                preview_url
                                name
                            }
                        }
                    }
                }
            }`
            }
        })
        .then((result) => {
            const page: mod_pageModel = result.data.data.page.get_single || {};
            if(page) {
                if(!mounted.current) return null;
                setPage(page);
            }
            else {
                addNotification(formatLucidError(result.data.errors[0].message).message,'error');
            }
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            addNotification('there was an unexpected error while getting the page data.','error');
        })
    }
    const getAllTemplates = () => {
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: `query {
                    template {
                        get_all
                    }	
                }`
            }
        })
        .then((result) => {
            const templates = result.data.data.template.get_all || [];
            if(!mounted.current) return null;
            setTemplates(templates);
        })
        .catch((err) => {
            console.log(err);
            addNotification('there was an unexpected error while getting the template data.','error');
        });
    }
    

    // -----------------------------------
    // Components
    // Add component
    const addComponent = (component: mod_componentModel) => {

        const newPageComponentID = uuidv1();

        // Build component data
        const componentDataGroups: Array<mod_contentTypeFieldGroupModel> = [];
        const componentData: Array<mod_contentTypesDatabaseModel> = [];

        // Create data for content types with parents, recursivly
        const addRepeaterChildrenGroups = (_id: mod_contentTypesConfigModel["_id"], parent_group_id?: string) => {
            // Create a new group obj
            const groupObj: mod_contentTypeFieldGroupModel = {
                _id: uuidv1(),
                page_component_id: newPageComponentID,
                parent_group: parent_group_id,
                parent_config_id: _id,
                position: 1
            }
            componentDataGroups.push(groupObj);
            // add data for repeaters children
            component.content_types?.forEach((contentType) => {
                if(contentType.parent === _id && contentType.type !== 'repeater') {
                    componentData.push({
                        page_component_id: newPageComponentID,
                        config_id: contentType._id,
                        value: contentType.config.default || '',
                        group_id: groupObj._id,
                        root: false
                    });
                } 
                else if(contentType.parent === _id && contentType.type === 'repeater') {
                    componentData.push({
                        page_component_id: newPageComponentID,
                        config_id: contentType._id,
                        value: undefined,
                        group_id: groupObj._id,
                        root: false
                    });
                    addRepeaterChildrenGroups(contentType._id, groupObj._id);
                }
            });
        }

        // Create data for root level content types
        component.content_types?.forEach((contentType) => {
            if(contentType.parent === 'root' && contentType.type !== 'repeater') {
                componentData.push({
                    page_component_id: newPageComponentID,
                    config_id: contentType._id,
                    value: contentType.config.default || '',
                    group_id: undefined,
                    root: true
                });
            }
            else if(contentType.parent === 'root' && contentType.type === 'repeater') {
                componentData.push({
                    page_component_id: newPageComponentID,
                    config_id: contentType._id,
                    value: undefined,
                    group_id: undefined,
                    root: true
                });
                addRepeaterChildrenGroups(contentType._id, undefined);
            }
        });

        let newPageComponent: mod_page_componentModel = {
            _id: newPageComponentID,
            page_id: page._id,
            component_id: component._id,
            position: page.page_components.length + 1,
            component: {
                _id: component._id,
                file_name: component.file_name,
                file_path: component.file_path,
                name: component.name,
                description: component.description,
                preview_url: component.preview_url,
                date_added: component.date_added,
                date_modified: component.date_modified
            },
            content_types: component.content_types || [],
            data: componentData,
            groups: componentDataGroups
        }

        // Update page pageComponents
        page.page_components.push(newPageComponent);
        setPage(page);

        // Update updatedData state
        updatedData.addComponents.push(newPageComponent._id);
        updatedData.pageComponentDownloaded.push(newPageComponent._id);
        setUpdatedData(updatedData);

        // set allow save
        setCanSave(true);

        setModalState({
            ...modalState,
            state: false
        });
    }
    const deleteComponent = (page_component_id: mod_page_componentModel["_id"]) => {
        if(selectedPageComponent._id === page_component_id) {
            setSelectedPageComponent({} as mod_page_componentModel);
            setPageMode('preview');
        }
        page.page_components = page.page_components.filter((component) => {
            if(component._id !== page_component_id) return component;
        });
        setPage({
            ...page
        });
        const findNewComponent = updatedData.addComponents.find( x => x === page_component_id);
        if(findNewComponent === undefined) {
            updatedData.deleteComponents.push(page_component_id);
            setUpdatedData({
                ...updatedData
            });
        }
        updatePageComponentPositions();
    }
    // drag pos
    const componentDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
    const componentDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        setMouseYPos(e.clientY);
        setDragTarget(target);
    }
    const componentDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if(dragTarget) {
            const dropTarget = e.target as HTMLElement;
            const dropTargetCompID = dropTarget.getAttribute('data-pagecomponentid');
            const targetCompID = dragTarget.getAttribute('data-pagecomponentid');
            const dropContainer = document.querySelector('.componentsCon') as HTMLElement;
            // update dom
            if(dropTargetCompID && targetCompID) {
                if(e.clientY < mouseYPos) dropContainer.insertBefore(dragTarget, dropTarget);
                else {
                    if(dropTarget.nextSibling) dropContainer.insertBefore(dragTarget, dropTarget.nextSibling);
                    else dropContainer.appendChild(dragTarget);
                }
            }
            updatePageComponentPositions();
        }
    }
    const updatePageComponentPositions = () => {
        const dropContainer = document.querySelector('.componentsCon') as HTMLElement;
        for(let i = 0; i < dropContainer.children.length; i++) {
            const child = dropContainer.children[i] as HTMLElement;
            const compID = child.getAttribute('data-pagecomponentid');
            if(compID) {
                page.page_components.find( x => {
                    if( x._id === compID) x.position = i;
                });
            }
        }
        setPage({
            ...page
        });
        updatedData.componentPositions = true;
        setUpdatedData(updatedData);
        setCanSave(true);
    }
    // -----------------------------------
    // Notifications
    const addNotification = (message: string, type: 'error' | 'warning' | 'success') => {
        setNotifications([{
            message: message,
            type: type
        }]);
        if(notificationTimeout !== undefined) clearTimeout(notificationTimeout);
        setNotificationTimeout(setTimeout(() => {
            notifications?.pop();
            setNotifications(notifications);
        }, 5000));
    }



    // ---------------------------------------------------------------------/
    // - Save --------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const savePageData = async () => {
        try {
            checkEditComponentForErrors(async () => {
                // Generate all of the queryies we need
                const pageQuery = await savePageHandler(page, updatedData);
                const pageComponentsQuery = await savePageComponentsHandler(page, updatedData);
                const deletePageComponentQuery = await deletePageComponentsHandler(page, updatedData);
                const groupQuery = await saveGroupsHandler(page, updatedData);
                const deleteGroupQuery = await deleteGroupsHandler(page, updatedData);
                const fieldDataQuery = await saveFieldDataHandler(page, updatedData);
                setCanSave(false);
                setUpdatedData(defaultUpdateDataObj.updatedData);
                // Notification
                addNotification(`you're page has been saved successfully!`, 'success');
            });
        }
        catch(err) {
            console.log(err);
            addNotification(`an unexpected error occured while saving the page!`, 'error');
        }
    }



    // ---------------------------------------------------------------------/
    // - RENDER ------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const pageComponents: Array<React.ReactElement> = [];
    if(page.page_components) {
        for(let i = 0; i < page.page_components.length; i++) {
            pageComponents.push(
                <div 
                    className='editContentRow' 
                    key={page.page_components[i]._id}
                    data-pagecomponentid={page.page_components[i]._id}
                    onDragStart={componentDragStart}
                    onDragOver={componentDragOver}
                    onDrop={componentDrop}
                    draggable
                    onClick={(e) => {
                        checkEditComponentForErrors(() => {
                            const allEditRows = document.querySelectorAll('.editContentRow') as NodeListOf<HTMLElement>;
                            allEditRows.forEach((ele) => ele.classList.remove('active'));
                            const target = e.target as HTMLTextAreaElement;
                            if(target) target.classList.add('active');
                            setSelectedPageComponent(page.page_components[i]);
                            setSelectedPageCompID(page.page_components[i]._id)
                            setPageMode('edit_component');
                        });
                    }}>
                    <div className="imgCon">
                        {
                            page.page_components[i].component.preview_url ?
                            <img src={page.page_components[i].component.preview_url}/>
                            : 
                            <FontAwesomeIcon icon={faTh}/>
                        }
                    </div>
                    <div className='mainCol'>
                        <p>{ page.page_components[i].component.name }</p>
                        <div>
                            {/* Delete this row */}
                            <button className='btnStyleBlank' onClick={(e) => { 
                                e.stopPropagation();
                                setModalState({
                                    ...modalState,
                                    state: true,
                                    title: 'confirmation',
                                    body: '',
                                    size: 'small',
                                    element: <DeleteConfirmModal 
                                                message={'are you sure you want to delete this page component?'}
                                                action={() => deleteComponent(page.page_components[i]._id)}/>
                                });
                             }}>
                                <CoreIcon icon={faTrashAlt} style={'transparent--warning'}/>
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }



    // ---------------------------------------------------------------------/
    // - ALT ---------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const checkEditComponentForErrors = (callback: () => void) => {
        // Verify all fields meet their min and max configs
        let editPageCompEle = document.querySelector('.editPageCompCon');
        if(editPageCompEle) {
            let invalidForms = editPageCompEle.querySelectorAll('.invalid');
            if(invalidForms.length) {
                addNotification(`you cannot navigate away or save this page yet, as some of your component's fields do not meet their criteria!`, 'error');
            }
            else callback();
        } else callback();
    }



    // ---------------------------------------------------------------------/
    // - ON LOAD -----------------------------------------------------------/
    // ---------------------------------------------------------------------/
    useEffect(() => {
        mounted.current = true;
        getPageData();
        getAllTemplates();
        
        // Temp
        setPageMarkup(`
            <style>
                .gridCon {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }
                .box {
                    height: 200px;
                    background-color: #1B1B1B;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-size: 30px;
                }
                @media only screen and (max-width: 700px) {
                    .gridCon {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media only screen and (max-width: 400px) {
                    .gridCon {
                        grid-template-columns: repeat(1, 1fr);
                    }
                }
            </style>

            <div>
                <h1>Page</h1>
                <a href="/about">About</a>           
                <a href="https://williamyallop.com">William Yallop Portfolio</a> 
            </div>
            <div class="gridCon">
                <div class="box">1</div>
                <div class="box">2</div>
                <div class="box">3</div>
                <div class="box">4</div>
                <div class="box">5</div>
                <div class="box">6</div>
                <div class="box">7</div>
                <div class="box">8</div>
                <div class="box">9</div>
            </div>
        `);

        return () => {
            mounted.current = false;
            setPage({} as mod_pageModel);
            setLoading(true);
            setActiveSlug(slug);
            setTemplates([]);
        }
    }, [slug]); 

    

    return (
        <PageContext.Provider value={{ page, setPage }}>
            <UpdatedDataContext.Provider value={{ updatedData, setUpdatedData}}>
                <div className='pageEditCon' key={activeSlug}>
                    <NotificationPopup/>
                    <EditPageHeader 
                        pageName={page.name}
                        canSave={canSave}
                        saveCallback={savePageData}/>
                    <div className="sidebar">
                        {/* Title */}
                        <div className="row">
                            <h1>{ page.name }</h1>
                        </div>
                        {/* Edit Page Data */}
                        <div className="row">
                            {/* Page content */}
                            <div className='editContentRow'>
                                <div className="imgCon"><FontAwesomeIcon icon={faAlignJustify}/></div>
                                <div className='mainCol'>
                                    <p>content</p>
                                    <div>
                                        {/* Edit this row */}
                                        <button className='btnStyleBlank' onClick={() => {  }}>
                                            <CoreIcon icon={faEdit} style={'transparent'}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* SEO */}
                            <div className='editContentRow'>
                                <div className="imgCon"><FontAwesomeIcon icon={faSearchengin}/></div>
                                <div className='mainCol'>
                                    <p>seo</p>
                                    <div>
                                        {/* Edit this row */}
                                        <button className='btnStyleBlank' onClick={() => {  }}>
                                            <CoreIcon icon={faEdit} style={'transparent'}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* template */}
                            { page.type === 'page' ? 
                                <SelectInput 
                                    value={page.template}
                                    options={templates}
                                    id={"templateSelect"}
                                    name={"template"}
                                    required={true}
                                    errorMsg={"there was an unexpected error!"}
                                    updateValue={(value) => {
                                        page.template = value;
                                        setPage({
                                            ...page
                                        })
                                        setUpdatedData({
                                            ...updatedData,
                                            template: true
                                        });
                                        setCanSave(true);
                                    }}
                                    label="template"
                                    style={'--hide-seperator --no-margin-bottom'}/>
                            : null }
                        </div>
                        {/* Page Components */}
                        <div className='row'>
                            {/* Add component */}
                            <button 
                                className="btnStyle1"
                                onClick={() => {
                                    setModalState({
                                        ...modalState,
                                        state: true,
                                        title: 'add component',
                                        size: 'standard',
                                        body: 'select a component bellow to add to your page',
                                        element: <ComponentListModal addComponentCallback={addComponent}/>
                                    });
                                }}>
                                add component
                            </button>
                            {
                                pageComponents.length ?
                                    <div className="componentsCon">
                                        {/* Components */}
                                        { pageComponents }
                                    </div>
                                : null
                            }
                        </div>
                    </div>
                    {
                        pageMode === 'preview'
                        ?
                        <PagePreview
                            pageMarkup={pageMarkup}/>
                        :
                        <EditPageComponent
                            page_component_id={selectedPageCompID}
                            setCanSave={setCanSave}
                            addNotification={addNotification}
                            exit={() => {
                                checkEditComponentForErrors(() => {
                                    // Success
                                    const allEditRows = document.querySelectorAll('.editContentRow') as NodeListOf<HTMLElement>;
                                    allEditRows.forEach((ele) => ele.classList.remove('active'));
                                    setPageMode('preview');
                                    console.log('set cooldown to update page preview');
                                });
                            }}/> 
                    }
                </div>
            </UpdatedDataContext.Provider>
        </PageContext.Provider>
    );
}

export default EditPage;