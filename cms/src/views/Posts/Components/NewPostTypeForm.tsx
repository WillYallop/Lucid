import { ReactElement, useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
// Components
import SelectInput from '../../../components/Core/Inputs/SelectInput';
import TextInput from '../../../components/Core/Inputs/TextInput';
import SearchInput from '../../../components/Core/Inputs/SearchInput';
// Functions
import formValidationHandler from "../../../functions/formValidationHandler";
import validatorConfig from '../../../functions/validatorConfig';
import formatLucidError from '../../../functions/formatLucidError';
// Context
import { LoadingContext } from "../../../helper/Context";
// data
import { getTemplates } from '../../../data/template';
import { searchPageName } from '../../../data/page';
import { saveSinglePost } from '../../../data/post';


interface newPostTypeFormInterface {
    callback: () => void
}
interface pageSerach {
    slug: string
    name: string
    _id: string
}

const NewPostTypeForm: React.FC<newPostTypeFormInterface> = ({ callback }) => {

    const navigate = useNavigate();

    const { loadingState, setLoadingState } = useContext(LoadingContext);

    const [ templates, setTemplates ] = useState<Array<string>>([]);
    const [ selectedTemplate, setSelectedTemplate ] = useState('');

    const [ postName, setPostName ] = useState('');

    const [ pageSearchQuery, setPageSearchQuery ] = useState('');
    const [ pageSearchResults, setPageSearchResults ] = useState<Array<pageSerach>>([]);
    const [ selectedPage, setSelectedPage ] = useState<pageSerach>({} as pageSerach);

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
            setSelectedTemplate(templates[0]);
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
        return () => {}
    }, []);


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
    const [ formError, setFormError ] = useState({
        error: false,
        message: ''
    });
    const errorConEle = (
        <div className="errorCon">
            <p>{ formError.message }</p>
        </div>  
    );

    // -------------------------------------------------------
    // Form validate
    // -------------------------------------------------------
    const validateForm = (e: React.FormEvent) => {
        formValidationHandler({
            e: e,
            onValidatePass: (fields) => {
                setLoadingState(true);
                let queryObj: data_post_saveSingleQuery["query"]["post"]["save_single"]["__args"] = {
                    name: fields['name'],
                    template_path: fields["template_path"],
                }
                if(selectedPage._id) queryObj.page_id = selectedPage._id;
                saveSinglePost({
                    __args: queryObj,
                    _id: true,
                    name: true,
                    template_path: true
                },
                (response) => {
                    if(response.data.data.post.save_single) {
                        callback()
                        navigate(`/posts/${response.data.data.post.save_single.name}`);
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

    const formatName = (value: string) => {
        let formatName = value.replace(/[^a-zA-Z_ ]/g, '');
        setPostName(formatName.toLowerCase());
    }

    return (
        <div className="body">
            <form onSubmit={validateForm} noValidate={true}>

                {/* Content Type - type */}
                <SelectInput 
                    value={selectedTemplate}
                    options={templates}
                    id={"templateSelect"}
                    name={"template_path"}
                    required={true}
                    errorMsg={"there was an unexpected error!"}
                    updateValue={setSelectedTemplate}
                    label="templates (*)"
                    described_by="choose the template file you want this post type to use"/>

                {/* Content Type = name */}
                <TextInput 
                    value={postName}
                    id={'postNameInp'}
                    name={'name'}
                    required={true}
                    errorMsg={'name must only include the following characters: [A-Z_a-z ] and be a minimum of 2 characters and a maximum of 100!'}
                    updateValue={(value) => formatName(value)}
                    label={'name (*)'}
                    max={100}
                    min={2}
                    described_by={'a unique post type name. bellow is how the name will be formatted.'}
                    pattern={validatorConfig.post_name.string}/>

                {/* Assigned Page */}
                <SearchInput 
                    value={pageSearchQuery}
                    id={'assignedPageSearchInp'}
                    name={'assigned_page'}
                    errorMsg={''}
                    updateValue={setPageSearchQuery}
                    label={'assigned page'}
                    described_by={'assign a page for this post type, if set to a page that already has one it will replace it, and it cannot be set to the homepage!'}
                    results={pageResultElements}
                    searchAction={searchPageNameHandler}
                    style={'--hide-seperator'}>
                    { selectedPage.name ? <div className="noteRow">selected: {selectedPage.name}</div> : null }
                </SearchInput>

                { formError.error ? errorConEle : null }

                <div className="footer">
                    <div className="textarea">
                        <p>onces this has been created, you will not be able to edit its name!</p>
                    </div>
      
                    <input className="btnStyle1 btnStyle1--small" type="submit" value="add post type"/>
                </div>
            </form>
        </div>
    )
}

export default NewPostTypeForm;