import react, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// Components
import SelectInput from '../../../components/Core/Inputs/SelectInput';
import TextInput from '../../../components/Core/Inputs/TextInput';
import SearchInput from '../../../components/Core/Inputs/SearchInput';
import SwitchInput from '../../../components/Core/Inputs/SwitchInput';
// Functions
import formValidationHandler from "../../../functions/formValidationHandler";
import getApiUrl from "../../../functions/getApiUrl";
import validatorConfig from '../../../functions/validatorConfig';
import formatLucidError from '../../../functions/formatLucidError';
// Context
import { LoadingContext, ModalContext } from "../../../helper/Context";

interface pageSerach {
    slug: string
    name: string
    _id: string
}
interface postType {
    _id: string
    name: string
}

interface newPageFormProps {
    type: 'page' | 'post'
    post_name?: string
    post_template?: string
}

const NewPageForm: React.FC<newPageFormProps> = ({ type, post_name, post_template }) => {
    
    // -------------------------------------------------------
    // Modal 
    // -------------------------------------------------------
    const { modalState, setModalState } = useContext(ModalContext);
    const navigate = useNavigate();

    // -------------------------------------------------------
    // State
    // -------------------------------------------------------
    const { loadingState, setLoadingState } = useContext(LoadingContext);
    // Template
    const [ selectedTemplate, setSelectedTemplate ] = useState('');
    const [ templates, setTemplates ] = useState([]);
    // Name
    const [ pageName, setPageName ] = useState('');
    // Slug
    const [ pageSlug, setPageSlug ] = useState('');
    // Is homepage
    const [ isHomePage, setIsHomepage ] = useState(false);
    // parent page
    const [ hasParentPage, setHasParentPage ] = useState(false);
    const [ pageSearchQuery, setPageSearchQuery ] = useState('');
    const [ pageSearchResults, setPageSearchResults ] = useState<Array<pageSerach>>([]);
    const [ selectedPage, setSelectedPage ] = useState<pageSerach>({} as pageSerach);
    // post type
    const [ hasPostType, setHasPostType ] = useState(false);
    const [ postTypeResults, setPostTypeResults ] = useState<Array<postType>>([]);
    const [ postTypeSelectOptions, setPostTypeSelectOptions ] = useState<Array<string>>([]);
    const [ selectedPostType, setSelectedPostType ] = useState<postType>({} as postType);


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
            setSelectedTemplate(templates[0]);
            setLoadingState(false);
        })
        .catch((err) => {
            console.log(err);
            setLoadingState(false);
        })
    }
    const getAllPostTypes = () => {
        setLoadingState(true);
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: `query {
                    post {
                        get_multiple
                        (
                            all: true
                        )
                        {
                            _id
                            name
                        }
                    }
                }`
            }
        })
        .then((result) => {
            const allPosts: Array<postType> = result.data.data.post.get_multiple || [];
            setPostTypeResults(allPosts);
            let postTypeArray: Array<string> = [];
            allPosts.forEach((post) => {
                postTypeArray.push(post.name);
            });
            setPostTypeSelectOptions(postTypeArray)
            setSelectedPostType(allPosts[0]);
            setLoadingState(false);
        })
        .catch((err) => {
            console.log(err);
            setLoadingState(false);
        })
    }

    // 
    useEffect(() => {
        if(type === 'page') {
            getAllTemplates();
            getAllPostTypes();
        }
        else {
            if(post_template) setSelectedTemplate(post_template);
        }
        return () => {
            
        }
    }, []);

    // Page search
    const searchPageName = (value: string) => {
        setLoadingState(true);
        // Search query and and set page search results
        const query = `query {
            page {
                search_name (
                    query: "${value}"
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
    const pageResultElements: Array<React.ReactElement> = [];
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
    // Form Error
    // -------------------------------------------------------
    const [ formError, setFormError ] = useState({ error: false, message: '' });
    const errorConEle = (<div className="errorCon"> <p>{ formError.message }</p></div>);

    // -------------------------------------------------------
    // Form validate
    // -------------------------------------------------------
    const validateForm = (e: React.FormEvent) => {
        formValidationHandler({
            e: e,
            onValidatePass: (fields) => {
                setLoadingState(true);
                const query = `mutation {
                    page {
                        save_single (
                            template: "${selectedTemplate}"
                            slug: "${isHomePage ? '/' : pageSlug }"
                            name: "${pageName}"
                            type: "${type}"
                            ${ type == 'post' && post_name ? 'post_name: "'+ post_name +'"' : '' }
                            has_parent: ${hasParentPage && selectedPage ? true : false}
                            ${ hasParentPage && selectedPage ? 'parent_id: "'+ selectedPage._id +'"' : '' }
                            author: "ADMIN"
                            is_homepage: ${isHomePage}
                            ${ hasPostType && selectedPostType ? 'post_type_id: "'+ selectedPostType._id +'"' : '' }
                        )
                        {
                            _id
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
                    const pageRes = res.data.data.page.save_single;
                    if(pageRes) {
                        setModalState({
                            ...modalState,
                            state: false
                        });
                        navigate(`/edit/page/${pageRes._id}`);
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
                        message: 'An unexpected error occured while saving the page!'
                    });
                    setLoadingState(false);
                })
            },
            customValidation: [
                {
                    field_name: 'parent_page',
                    validator: (value: string) => {
                        if(hasParentPage) {
                            if(selectedPage.name) return '';
                            else return 'Error';
                        } else return '';
                    }
                }
            ]
        })
    }

    const formatSlug = (value: string) => {
        let formatSlug = value.replaceAll(' ', '-').replace(/[^a-zA-Z-]/g, '');
        setPageSlug(formatSlug.toLowerCase());
    }

    const pageFromExtended = (
        <>
            <div className={`switchLabelRow ${ isHomePage ? 'active' : '' }`}>
                <label>is homepage?</label>
                <SwitchInput
                    state={isHomePage}
                    setState={(state) => {
                        setIsHomepage(state);
                        if(state) {
                            setHasParentPage(false);
                            setHasPostType(false);
                        } 
                    }}/>
            </div>

            {
                !isHomePage
                ?
                    <>

                        {/* Parent Page Row */}
                        <div className={`switchLabelRow ${ hasParentPage ? 'active' : '' } `}>
                            <label htmlFor="parentPageInp">parent page</label>
                            <SwitchInput
                                state={hasParentPage}
                                setState={(state) => {
                                    setHasParentPage(state);
                                }}/>
                        </div>
                        {
                            hasParentPage
                            ? 
                                <SearchInput 
                                    value={pageSearchQuery}
                                    id={'parentPageInp'}
                                    name={'parent_page'}
                                    errorMsg={'make sure you have picked a page to be the parent!'}
                                    updateValue={(value) => {
                                        setPageSearchQuery(value);
                                    }}
                                    described_by={'search for pages by their name, and select the one you wish to be the parent.'}
                                    results={pageResultElements}
                                    searchAction={searchPageName}>
                                    { selectedPage.name ? <div className="noteRow">selected: {selectedPage.name}</div> : null }
                                </SearchInput>
                            : null
                        }


                        {/* post type */}
                        <div className={`switchLabelRow ${ hasPostType ? 'active' : '' } switchLabelRow--not-border`}>
                            <label htmlFor="postTypeSelect">post type</label>
                            <SwitchInput
                                state={hasPostType}
                                setState={setHasPostType}/>
                        </div>
                        {
                            hasPostType
                            ? 
                                <SelectInput 
                                    options={postTypeSelectOptions}
                                    value={selectedPostType.name}
                                    id={'postTypeSelect'}
                                    name={'post_type'}
                                    required={true}
                                    errorMsg={"there was an unexpected error!"}
                                    updateValue={(value) => {
                                        // Find 
                                        const findMatchingPostType = postTypeResults.find( x => x.name === value );
                                        if(findMatchingPostType) {
                                            setSelectedPostType({
                                                ...selectedPostType,
                                                ...findMatchingPostType
                                            })
                                        }
                                    }}
                                    described_by="a page that has a post type set will act as that post types parent. all pages under that post type will be routed bellow this page. (note a homepage cannot have a post type)"
                                    style={'--hide-seperator'}/>
                            : null
                        }


                    </>
                :
                null
            }
        </>
    );


    return (
        <div className="body">
            <form onSubmit={validateForm} noValidate={true}>

                {/* template */}
                { type === 'page' ? 
                    <SelectInput 
                        value={selectedTemplate}
                        options={templates}
                        id={"templateSelect"}
                        name={"template"}
                        required={true}
                        errorMsg={"there was an unexpected error!"}
                        updateValue={setSelectedTemplate}
                        label="template (*)"
                        described_by="choose the template file you want this page to use."/>
                : null }

                {/* name */}
                <TextInput 
                    value={pageName}
                    id={'pageNameInp'}
                    name={'name'}
                    required={true}
                    errorMsg={'name must only include the following characters: [A-Za-z -!?_@] and be a minimum of 2 characters and a maximum of 255!'}
                    updateValue={(value) => {
                        setPageName(value);
                        formatSlug(value);
                    }}
                    label={'name (*)'}
                    max={255}
                    min={2}
                    described_by={'enter a name to represent your new page.'}
                    pattern={validatorConfig.page_name.string}/>

                {/* slug */}
                {
                    !isHomePage
                    ?
                    <TextInput 
                        value={pageSlug}
                        id={'pageSlugInp'}
                        name={'slug'}
                        required={true}
                        errorMsg={'a slug must only contain a-z characters and dashes.'}
                        updateValue={(value) => {
                            formatSlug(value);
                        }}
                        label={'slug (*)'}
                        max={255}
                        min={2}
                        described_by={"the slug is used to determine the path to the page once the site has been generated. you cannot have two page's with the same slug!"}
                        pattern={validatorConfig.page_slug.string}
                        style={type === 'post' ? '--hide-seperator' : undefined}/>
                    : null
                }

                { type === 'page' ? pageFromExtended : null }

                { formError.error ? errorConEle : null }

                <div className="footer">
                    <div className="textarea">
                        <p>you will be redirected to page once it has been created!</p>
                    </div>
                    <input className="btnStyle1 btnStyle1--small" type="submit" value="add page"/>
                </div>
            </form>
        </div>
    );
}

export default NewPageForm;