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
// Context
import { ModalContext, PageNotificationContext } from "../../../../helper/Context";
// Functions
import formatLucidError from '../../../../functions/formatLucidError';
import getApiUrl from '../../../../functions/getApiUrl';
// Icons
import { faTh, faEdit, faTrashAlt, faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';


interface editPageProps {
    slug: string
}


interface updateDataObjInterface {
    template: boolean
    addComponents: Array<string>
    modifiedComponents: Array<string>
}
const defaultUpdateDataObj: updateDataObjInterface = {
    template: false,
    addComponents: [],
    modifiedComponents: []
};



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
    // Can save
    const [ canSave, setCanSave ] = useState(false);
    // page
    const [ page, setPage ] = useState({} as mod_pageModel);
    // Page preview markup
    const [ pageMarkup, setPageMarkup ] = useState('');
    // Template
    const [ selectedTemplate, setSelectedTemplate ] = useState('');
    const [ templates, setTemplates ] = useState([]);
    // Selected component
    const [ pageMode, setPageMode ] = useState<'preview' | 'edit_component'>('preview')
    const [ selectedPageComponent, setSelectedPageComponent ] = useState({} as mod_page_componentModel);

    // New data
    // Used to track and store data changes
    const [ updatedData, setUpdateData ] = useState(defaultUpdateDataObj);


    const addNotification = (message: string, type: 'error' | 'warning' | 'success') => {
        setNotifications([{
            message: message,
            type: type
        }]);
        if(notificationTimeout != undefined) clearTimeout(notificationTimeout);
        setNotificationTimeout(setTimeout(() => {
            notifications?.pop();
            setNotifications(notifications);
        }, 5000));
    }

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
                            component_id
                            position
                            component {
                                preview_url
                                file_path
                                file_name
                                date_added
                                description
                                date_modified
                            }
                            content_types {
                                _id
                                data
                                group_id
                                name
                                type
                                config {
                                    min
                                    max
                                    default
                                }
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
                setSelectedTemplate(page.template);
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

    // Add component
    const addComponent = (component: mod_componentModel) => {
        
        // Set missing fields
        let newContentType = component.content_types?.map((contentType) => {
            if(contentType.type != 'repeater') {
                if(contentType.config.default) contentType.data = contentType.config.default;
                else contentType.data = '';
                contentType.group_id = undefined;
            }
            return contentType;
        })

        let newPageComponent: mod_page_componentModel = {
            _id: uuidv1(),
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
            content_types: newContentType || []
        }

        // Update page pageComponents
        page.page_components.push(newPageComponent);
        setPage(page);

        // Update updatedData state
        updatedData.addComponents.push(newPageComponent._id);
        setUpdateData(updatedData);

        // set allow save
        setCanSave(true);

        setModalState({
            ...modalState,
            state: false
        });
    }
    // Update content type for selected page comp
    const updateContentTypeData = (_id: mod_contentTypesConfigModel["_id"], data: mod_contentTypesConfigModel["data"]) => {
        const contentTypeIndex = selectedPageComponent.content_types.findIndex( x => x._id === _id );
        if(contentTypeIndex != -1) {
            selectedPageComponent.content_types[contentTypeIndex].data = data;
            setSelectedPageComponent(() => {
                return {
                    ...selectedPageComponent
                }
            });
            // update updateData status
            // if not a new component, add to modified components object
            let findNewComp = updatedData.addComponents.findIndex( x => x === selectedPageComponent._id);
            let findAlreadyModified = updatedData.modifiedComponents.findIndex( x => x === selectedPageComponent._id );
            if(findNewComp === -1 && findAlreadyModified === -1) {
                updatedData.modifiedComponents.push(selectedPageComponent._id);
                setUpdateData({
                    ...updatedData
                });
            }
            // set allow save
            setCanSave(true);
        }
    }

    // Save data
    const savePageData = () => {
        addNotification('successfully saved the page!','success');
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
                    onClick={(e) => {
                        const allEditRows = document.querySelectorAll('.editContentRow') as NodeListOf<HTMLElement>;
                        allEditRows.forEach((ele) => ele.classList.remove('active'));
                        const target = e.target as HTMLTextAreaElement;
                        if(target) target.classList.add('active');
                        setSelectedPageComponent(page.page_components[i]);
                        setPageMode('edit_component');
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
            setSelectedTemplate('');
            setTemplates([]);
        }
    }, [slug]); 

    

    return (
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
                            <p>Content</p>
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
                            <p>SEO</p>
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
                            value={selectedTemplate}
                            options={templates}
                            id={"templateSelect"}
                            name={"template"}
                            required={true}
                            errorMsg={"there was an unexpected error!"}
                            updateValue={(value) => {
                                setSelectedTemplate(value);
                                setUpdateData({
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
                    page_component={selectedPageComponent}
                    exit={() => {
                        // Verify all fields meet their min and max configs
                        let editPageCompEle = document.querySelector('.editPageCompCon');
                        if(editPageCompEle) {
                            let invalidForms = editPageCompEle.querySelectorAll('.invalid');
                            console.log(invalidForms);
                            if(invalidForms.length) {
                                addNotification('Make sure all the component fields are valid!', 'error');
                            }
                            else {
                                // Success
                                const allEditRows = document.querySelectorAll('.editContentRow') as NodeListOf<HTMLElement>;
                                allEditRows.forEach((ele) => ele.classList.remove('active'));
                                setPageMode('preview');
                                console.log('set cooldown to update page preview');
                            }
                        }
                    }}
                    update_data={updateContentTypeData}/> 
            }
        </div>
    );
}

export default EditPage;