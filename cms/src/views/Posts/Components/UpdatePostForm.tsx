import { useState, useContext, useEffect, ReactElement } from "react";
// Components
import TextInput from "../../../components/Core/Inputs/TextInput";
import SelectInput from "../../../components/Core/Inputs/SelectInput";
import SearchInput from "../../../components/Core/Inputs/SearchInput";
// Context
import { LoadingContext } from "../../../helper/Context";
// Functions
import validatorConfig from '../../../functions/validatorConfig';
import formValidationHandler from "../../../functions/formValidationHandler";
import formatLucidError from "../../../functions/formatLucidError";
// data
import { getTemplates } from '../../../data/template';
import { getSinglePageByPostID, searchPageName } from '../../../data/page';
import { updateSinglePost } from '../../../data/post';


interface updatePostTypeFormProps {
    _id: string
    name: string
    template: string
    post_id: string
    callback: (state: boolean) => void
}

const UpdatePostTypeForm: React.FC<updatePostTypeFormProps> = ({ _id, name, template, post_id, callback }) => {

    const { loadingState, setLoadingState } = useContext(LoadingContext);

    const [ templates, setTemplates ] = useState<Array<string>>([]);
    const [ selectedTemplate, setSelectedTemplate ] = useState(template);
    const [ postName, setPostName ] = useState(name);

    const [ pageSearchQuery, setPageSearchQuery ] = useState('');
    const [ pageSearchResults, setPageSearchResults ] = useState<Array<pageSearchRes>>([]);
    const [ selectedPage, setSelectedPage ] = useState<pageSearchRes>({} as pageSearchRes);


    // -------------------------------------------------------
    // Data
    // -------------------------------------------------------
    const getAllTemplates = () => {
        setLoadingState(true);
        getTemplates({
            __args: {}
        },
        (response) => {
            const templates = response.data.data.template.get_all || [];
            setTemplates(templates);
            setLoadingState(false);
        },
        (err) => {
            console.log(err);
            setLoadingState(false);
        })
    }
    const getAssignedPage = () => {
        setLoadingState(true);
        getSinglePageByPostID({
            __args: {
                post_id: post_id
            },
            _id: true,
            name: true,
            slug: true
        },
        (response) => {
            const page: pageSearchRes = response.data.data.page.get_single_by_post_id || {};
            if(page) {
                setSelectedPage(page);
                setPageSearchQuery(page.name);
            }
            setLoadingState(false);
        },
        (err) => {
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
            setSelectedPage({} as pageSearchRes);
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
    const searchPageNameHandler = (value: string) => {
        setLoadingState(true);
        // Search query and and set page search results
        searchPageName({
            __args: {
                query: value,
                full_slug: true,
                allow_home: false,
                type: "page"
            },
            slug: true,
            name: true,
            _id: true
        },
        (response) => {
            if(response.data.data.page.search_name) {
                setPageSearchResults(response.data.data.page.search_name);
            }
            else {
                setFormError({
                    error: true,
                    message: formatLucidError(response.data.errors[0].message).message
                });
            }
            setLoadingState(false);
        },
        (err) => {
            setFormError({
                error: true,
                message: 'An unexpected error occured while querying the pages!'
            });
            setLoadingState(false);
        })
    }
    const pageResultElements: Array<ReactElement> = [];
    const selectPageLink = (page: pageSearchRes) => {
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
                let queryObj: data_post_updateSingleQuery["query"]["post"]["update_single"]["__args"] = {
                    _id: _id,
                    name: postName,
                    old_name: name,
                    template_path: selectedTemplate,
                }
                if(selectedPage._id) queryObj.page_id = selectedPage._id
                updateSinglePost({
                    __args: queryObj,
                    name: true,
                    template_path: false,
                    _id: false
                },
                (response) => {
                    if(response.data.data.post.update_single) {
                        window.location.href = `/posts/${response.data.data.post.update_single.name}`;
                    }
                    else {
                        setFormError({
                            error: true,
                            message: formatLucidError(response.data.errors[0].message).message
                        });
                    }
                    setLoadingState(false);
                },
                (err) => {
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
                searchAction={searchPageNameHandler}
                style={'--hide-seperator'}>
                { selectedPage.name ? <div className="noteRow noteRow--no-margin-top">selected: {selectedPage.name}</div> : null }
            </SearchInput>

            { formError.error ? errorConEle : null }

        </form>
    )
}

export default UpdatePostTypeForm;