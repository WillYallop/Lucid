import { useState, useContext, useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// Components
import TextInput from "../../../components/Core/Inputs/TextInput";
import SelectInput from "../../../components/Core/Inputs/SelectInput";
import SearchInput from "../../../components/Core/Inputs/SearchInput";
// Context
import { LoadingContext } from "../../../helper/Context";
// Functions
import getApiUrl from "../../../functions/getApiUrl";
import validatorConfig from '../../../functions/validatorConfig';
import formValidationHandler from "../../../functions/formValidationHandler";
import formatLucidError from "../../../functions/formatLucidError";

interface pageSerach {
    slug: string
    name: string
    _id: string
}

interface updatePostTypeFormProps {
    _id: string
    name: string
    template: string
    post_id: string
    callback: (state: boolean) => void
}

const UpdatePostTypeForm: React.FC<updatePostTypeFormProps> = ({ _id, name, template, post_id, callback }) => {

    const navigate = useNavigate();

    const { loadingState, setLoadingState } = useContext(LoadingContext);

    const [ templates, setTemplates ] = useState([]);
    const [ selectedTemplate, setSelectedTemplate ] = useState(template);
    const [ postName, setPostName ] = useState(name);

    const [ pageSearchQuery, setPageSearchQuery ] = useState('');
    const [ pageSearchResults, setPageSearchResults ] = useState<Array<pageSerach>>([]);
    const [ selectedPage, setSelectedPage ] = useState<pageSerach>({} as pageSerach);


    // -------------------------------------------------------
    // Data
    // -------------------------------------------------------
    const getAllTemplates = () => {
        setLoadingState(true);
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
            setTemplates(templates);
            setLoadingState(false);
        })
        .catch((err) => {
            console.log(err);
            setLoadingState(false);
        })
    }
    const getAssignedPage = () => {
        setLoadingState(true);
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: `query {
                    page {
                        get_single_by_post_id (
                            post_id: "${post_id}"
                        ) 
                        {
                            _id
                            name
                            slug
                        }
                    }
                }`
            }
        })
        .then((result) => {
            const page: pageSerach = result.data.data.page.get_single_by_post_id || {};
            if(page) {
                setSelectedPage(page);
                setPageSearchQuery(page.name);
            }
            setLoadingState(false);
        })
        .catch((err) => {
            console.log(err);
            setLoadingState(false);
        })  
    }

    // 
    useEffect(() => {
        getAllTemplates();
        getAssignedPage();
        return () => {
            setTemplates([]);
            setSelectedTemplate('');
            setPostName('');
            setSelectedPage({} as pageSerach);
        }
    }, []);


    // -------------------------------------------------------
    // Form Error
    // -------------------------------------------------------
    const [ formError, setFormError ] = useState({
        error: false,
        message: ''
    });
    const errorConEle = (
        <div className="errorCon">
            <p>{ formError.message }</p>
        </div>  
    );


    // Page search
    const searchPageName = (value: string) => {
        setLoadingState(true);
        // Search query and and set page search results
        const query = `query {
            page {
                search_name (
                    query: "${value}"
                    full_slug: true
                    allow_home: false
                    type: "page"
                )
                {
                    slug
                    name
                    _id
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
        .then((res) => {
            if(res.data.data.page.search_name) {
                setPageSearchResults(res.data.data.page.search_name);
            }
            else {
                setFormError({
                    error: true,
                    message: formatLucidError(res.data.errors[0].message).message
                });
            }
            setLoadingState(false);
        })
        .catch(() => {
            setFormError({
                error: true,
                message: 'An unexpected error occured while querying the pages!'
            });
            setLoadingState(false);
        })
    }
    const pageResultElements: Array<ReactElement> = [];
    const selectPageLink = (page: pageSerach) => {
        setPageSearchQuery(page.name);
        setSelectedPage(page);
    }
    for(let i = 0; i < pageSearchResults.length; i++) {
        pageResultElements.push(
            <button className='pageSearchBtn'
                type='button'
                key={pageSearchResults[i]._id}
                onClick={() => selectPageLink(pageSearchResults[i])}>
                { pageSearchResults[i].name }<span> - {  pageSearchResults[i].slug }</span>
            </button>
        )
    }

    // -------------------------------------------------------
    // Form validate
    // -------------------------------------------------------
    const validateForm = (e: React.FormEvent) => {
        formValidationHandler({
            e: e,
            onValidatePass: (fields) => {
                setLoadingState(true);
                const query = `mutation {
                    post {
                        update_single (
                            _id: "${_id}"
                            name: "${postName}"
                            old_name: "${name}"
                            template_path: "${selectedTemplate}"
                            ${ selectedPage._id ? 'page_id: "'+ selectedPage._id +'"' : '' }
                        )
                        {
                            name
                        }
                    }
                }`;
                // Save single component data
                axios({
                    url: getApiUrl(),
                    method: 'post',
                    data: {
                        query: query
                    }
                })
                .then((res) => {
                    if(res.data.data.post.update_single) {
                        window.location.href = `/posts/${res.data.data.post.update_single.name}`;
                    }
                    else {
                        setFormError({
                            error: true,
                            message: formatLucidError(res.data.errors[0].message).message
                        });
                    }
                    setLoadingState(false);
                })
                .catch((err) => {
                    setFormError({
                        error: true,
                        message: 'An unexpected error occured while saving the post type!'
                    });
                    setLoadingState(false);
                })
            }
        })
    }

    // Format name value
    const formatName = (value: string) => {
        let formatName = value.replace(/[^a-zA-Z_ ]/g, '');
        setPostName(formatName.toLowerCase());
    }

    return (
        <form id="updatePostForm" onSubmit={validateForm} noValidate={true}>

            {/* Content Type = name */}
            <TextInput 
                value={postName}
                id={'postNameInp'}
                name={'name'}
                required={true}
                errorMsg={'name must only include the following characters: [A-Z_a-z ] and be a minimum of 2 characters and a maximum of 100!'}
                updateValue={(value) => {
                    formatName(value);
                    callback(true);
                }}
                label={'name'}
                max={100}
                min={2}
                pattern={validatorConfig.post_name.string}/>

            {/* Content Type - type */}
            <SelectInput 
                value={selectedTemplate}
                options={templates}
                id={"templateSelect"}
                name={"template_path"}
                required={true}
                errorMsg={"there was an unexpected error!"}
                updateValue={(value) => {
                    setSelectedTemplate(value);
                    callback(true);
                }}
                label="template"/>

            {/* Assigned Page */}
            <SearchInput 
                value={pageSearchQuery}
                id={'assignedPageSearchInp'}
                name={'assigned_page'}
                errorMsg={''}
                updateValue={(value) => {
                    setPageSearchQuery(value);
                    callback(true);
                }}
                label={'assigned page'}
                results={pageResultElements}
                searchAction={searchPageName}
                style={'--hide-seperator'}>
                { selectedPage.name ? <div className="noteRow noteRow--no-margin-top">selected: {selectedPage.name}</div> : null }
            </SearchInput>

            { formError.error ? errorConEle : null }

        </form>
    )
}

export default UpdatePostTypeForm;