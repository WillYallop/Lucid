import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
// Components
import PagePreview from './Components/PagePreview';
import EditPageHeader from './Components/EditPageHeader';
import SelectInput from '../../../../components/Core/Inputs/SelectInput';
import ComponentListModal from './Components/ComponentListModal';
// Context
import { ModalContext } from "../../../../helper/Context";
// Functions
import formatLucidError from '../../../../functions/formatLucidError';
import getApiUrl from '../../../../functions/getApiUrl';
// Icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';


interface editPageProps {
    slug: string
}

const defaultUpdateDataObj = {
    template: false,
    components: []
};



const EditPage: React.FC<editPageProps> = ({ slug }) => {

    const mounted = useRef(false);

    // ---------------------------------------------------------------------/
    // - STATE -------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const { modalState, setModalState } = useContext(ModalContext);
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

    // New data
    // Used to track and store data changes
    const [ updatedData, setUpdateData ] = useState(defaultUpdateDataObj);
    


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
                        components {
                            name
                            _id
                            page_components_id
                            preview_url
                            file_path
                            file_name
                            date_added
                            description
                            date_modified
                            content_types {
                                data
                                config_id
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
                // setFormError({
                //     error: true,
                //     message: formatLucidError(result.data.errors[0].message).message
                // });
            }
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
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
        })
    }

    const addComponent = (component: mod_componentModel) => {
        console.log(component);
        setModalState({
            ...modalState,
            state: false
        });
    }

    // Save data
    const savePageData = () => {
        alert('save me')
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
    }, []); 

    // Reset data and get data needed
    if(slug !== activeSlug) {
        // reset
        setSelectedTemplate('');
        setCanSave(false);
        setUpdateData(defaultUpdateDataObj);
        setActiveSlug(slug);
        // get data
        getPageData();
    }
    

    return (
        <div className='pageEditCon' key={activeSlug}>
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
                    <p style={{marginBottom: '10px'}}>add edit page content button</p>
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
                                console.log(canSave)
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

                    {/* Components */}

                </div>
            </div>
            <div className="pagePreviewCon">
                <PagePreview
                    pageMarkup={pageMarkup}/>
            </div>
        </div>
    );
}

export default EditPage;