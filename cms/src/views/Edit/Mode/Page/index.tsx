import React, { useEffect, useState, useRef, useContext } from 'react';
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
import EditSEO from './Components/EditSEO/EditSEO';
// Context
import { ModalContext, PageNotificationContext } from "../../../../helper/Context";
import { PageContext, UpdatedDataContext, defaultUpdateDataObj, PageMarkupContext, defaultPageMarkupContextInt, pageMarkupContextInt } from './functions/PageContext';
// Functions
import formatLucidError from '../../../../functions/formatLucidError';
import { cmdDevOrgin } from '../../../../functions/getApiUrl';
import { savePageHandler, savePageComponentsHandler, deletePageComponentsHandler, saveGroupsHandler, saveFieldDataHandler, deleteGroupsHandler, saveSEOHandler } from './functions/savePageHandler';
// Icons
import { faTh, faTrashAlt, faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
// data
import { getSinglePage } from '../../../../data/page';
import { getTemplates } from '../../../../data/template';
import { generatePreview } from '../../../../data/generator';


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
    const [ markupObj, setMarkupObj ] = useState(defaultPageMarkupContextInt.markupObj); // Page preview markup obj
    // Template
    const [ templates, setTemplates ] = useState<Array<string>>([]);
    // Selected component
    const [ pageMode, setPageMode ] = useState<'preview' | 'edit_component' | 'seo'>('preview')
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
        getSinglePage({
            __args: {
                slug: slug === 'homepage' ? '/' : slug
            },
            _id: true,
            template: true,
            slug: true,
            path: true,
            name: true,
            type: true,
            post_name: true,
            has_parent: true,
            parent_id: true,
            date_created: true,
            last_edited: true,
            author: true,
            is_homepage: true,
            post_type_id: true,
            seo: {
                page_id: true,
                title: true,
                description: true,
                canonical: true,
                robots: true,
                og_type: true,
                og_title: true,
                og_description: true,
                og_image: true,
                twitter_card: true,
                twitter_title: true,
                twitter_description: true,
                twitter_image: true,
                twitter_creator: true,
                twitter_site: true,
                twitter_player: true,
            },
            page_components: {
                _id: true,
                position: true,
                component: {
                    _id: true,
                    preview_url: true,
                    file_path: true,
                    name: true,
                }
            }
        },
        (response) => {
            const page: mod_pageModel = response.data.data.page.get_single || {};
            if(page) {
                if(!mounted.current) return null;
                setPage(page);
                generatePagePreview('live', page);
            }
            else {
                addNotification(formatLucidError(response.data.errors[0].message).message,'error');
            }
            setLoading(false);
        },
        (err) => {
            setLoading(false);
            addNotification('there was an unexpected error while getting the page data.','error');
        })
    }

    const getAllTemplates = () => {
        getTemplates({
            __args: {}   
        },
        (response) => {
            const templates = response.data.data.template.get_all || [];
            if(!mounted.current) return null;
            setTemplates(templates);
        },
        (err) => {
            console.log(err);
            addNotification('there was an unexpected error while getting the template data.','error');
        })
    }

    const generatePagePreview = (mode: 'live' | 'provided', pageData?: mod_pageModel, pageComponentID?: mod_componentModel["_id"]) => {
        setLoading(true);
        const pageComponentsArr: Array<mod_generatePreviewPageComponents> = []; 
        if(mode === 'live') {
            if(pageData !== undefined) {
                pageData.page_components.forEach((pageComp) => {
                    pageComponentsArr.push({
                        _id: pageComp._id,
                        component: {
                            _id: pageComp.component._id,
                            file_path: pageComp.component.file_path,
                            name: pageComp.component.name
                        }
                    })
                });
            }
        }
        else if(mode === 'provided') {
            if(pageComponentID !== undefined) {
                // find matching page component
                const findPageComp = page.page_components.find( x => x._id === pageComponentID );
                if(findPageComp !== undefined && findPageComp.data !== undefined) {
                    const dataArr = findPageComp.data.filter((data) => {
                        if(typeof data.value === 'number') data.value = data.value.toString();
                        return data;
                    });
                    pageComponentsArr.push({
                        _id: findPageComp._id,
                        component: {
                            _id: findPageComp.component._id,
                            file_path: findPageComp.component.file_path,
                            name: findPageComp.component.name
                        },
                        groups: findPageComp.groups,
                        data: dataArr
                    });
                }
            }
        }

        generatePreview({
            __args: {
                data_mode: mode,
                template: page.template || null,
                page_id: pageData !== undefined ? pageData._id : page._id,
                page_components: pageComponentsArr,
                location: window.location.origin === 'http://localhost:3000' ? cmdDevOrgin : window.location.origin
            },
            template: true,
            components: {
                _id: true,
                page_component_id: true,
                markup: true
            }
        },
        (response) => {
            const data = response.data.data.generator.preview || {};
            if(mode === 'live') setMarkupObj(data);
            else {
                // go through template, and components in this response.data obj and replace matching ones with new markup
                markupObj.template = data.template;
                for(let i = 0; i < data.components.length; i++) {
                    let findMatchCompIndex = markupObj.components.findIndex( x => x._id === data.components[i]._id && x.page_component_id === data.components[i].page_component_id)
                    if(findMatchCompIndex !== -1) markupObj.components[findMatchCompIndex] = data.components[i];
                    else markupObj.components.push(data.components[i]);
                }
                setMarkupObj({...markupObj});
            }
            setLoading(false);
        },
        (err) => {
            setLoading(false);
            addNotification('there was an unexpected error while generating the page','error');
        })
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
        const addRepeaterChildrenGroups = (_id: mod_contentTypesConfigModel["_id"], parent_group_id?: string | null ) => {
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
                        value: null,
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
                    group_id: null,
                    root: true
                });
            }
            else if(contentType.parent === 'root' && contentType.type === 'repeater') {
                componentData.push({
                    page_component_id: newPageComponentID,
                    config_id: contentType._id,
                    value: null,
                    group_id: null,
                    root: true
                });
                addRepeaterChildrenGroups(contentType._id, null);
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
        generatePagePreview('provided', undefined, newPageComponent._id);

        // set allow save
        setCanSaveState(true);

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
        // Remove from the markupObj
        const markupCompIndex = markupObj.components.findIndex( x => x.page_component_id === page_component_id );
        if(markupCompIndex !== -1) markupObj.components.splice(markupCompIndex, 1);
        setMarkupObj({...markupObj});
        generatePagePreview('provided', undefined, undefined);
        // If its not a new component, add it to the updatedData object to track it and delete on save
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
            setMarkupObj({...markupObj}); // retrigger the buildPageMarkup function in the PagePreview component
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
        setCanSaveState(true);
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
    const setCanSaveState = (state: boolean) => {
        if(state) window.onbeforeunload = (e) => "you have unsaved changes. these will be lost if you navigate away";
        else window.onbeforeunload = null;
        setCanSave(state);
    }
    const savePageData = async () => {
        try {
            checkEditComponentForErrors(async () => {
                // Generate all of the queryies we need
                const pageQuery = await savePageHandler(page, updatedData);
                const seoQuery = await saveSEOHandler(page, updatedData);
                const pageComponentsQuery = await savePageComponentsHandler(page, updatedData);
                const deletePageComponentQuery = await deletePageComponentsHandler(page, updatedData);
                const groupQuery = await saveGroupsHandler(page, updatedData);
                const deleteGroupQuery = await deleteGroupsHandler(page, updatedData);
                const fieldDataQuery = await saveFieldDataHandler(page, updatedData);
                setCanSaveState(false);
                setUpdatedData(defaultUpdateDataObj.updatedData);
                // Notification
                addNotification(`your page has been saved successfully!`, 'success');
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
        return () => {
            mounted.current = false;
            setPage({} as mod_pageModel);
            setUpdatedData(defaultUpdateDataObj.updatedData);
            updatedData.pageComponentDownloaded = [];
            setLoading(true);
            setCanSaveState(false);
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
                                    <p>page</p>
                                </div>
                            </div>
                            {/* SEO */}
                            <div className='editContentRow' onClick={(e) => {
                                const allEditRows = document.querySelectorAll('.editContentRow') as NodeListOf<HTMLElement>;
                                allEditRows.forEach((ele) => ele.classList.remove('active'));
                                const target = e.target as HTMLTextAreaElement;
                                if(target) target.classList.add('active');
                                setPageMode('seo');
                            }}>
                                <div className="imgCon"><FontAwesomeIcon icon={faSearchengin}/></div>
                                <div className='mainCol'>
                                    <p>seo</p>
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
                                        setCanSaveState(true);
                                        generatePagePreview('provided', undefined, undefined);
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

                    {/* Edit SEO page */}
                    {
                        pageMode === 'seo' ?
                            <EditSEO                             
                                exit={() => { 
                                    // Success
                                    const allEditRows = document.querySelectorAll('.editContentRow') as NodeListOf<HTMLElement>;
                                    allEditRows.forEach((ele) => ele.classList.remove('active'));
                                    setPageMode('preview'); 
                                }}
                                setCanSave={setCanSaveState}/>
                        : null
                    }

                    {/* Page preview page */}
                    {
                        pageMode === 'preview' ?
                            <PageMarkupContext.Provider value={{ markupObj, setMarkupObj }}>
                                <PagePreview loading={loading}/>
                            </PageMarkupContext.Provider>
                        : null
                    }

                    {/* Edit component page */}
                    {
                        pageMode === 'edit_component' ?
                            <EditPageComponent
                                page_component_id={selectedPageCompID}
                                setCanSave={setCanSaveState}
                                addNotification={addNotification}
                                generateComponent={generatePagePreview}
                                exit={() => {
                                    checkEditComponentForErrors(() => {
                                        // Success
                                        const allEditRows = document.querySelectorAll('.editContentRow') as NodeListOf<HTMLElement>;
                                        allEditRows.forEach((ele) => ele.classList.remove('active'));
                                        setPageMode('preview');
                                    });
                                }}/> 
                        : null
                    }

                </div>
            </UpdatedDataContext.Provider>
        </PageContext.Provider>
    );
}

export default EditPage;