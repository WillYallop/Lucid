import { ReactElement, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// Components
import SelectInput from '../../../../../components/Core/Inputs/SelectInput';
import TextInput from '../../../../../components/Core/Inputs/TextInput';
// Functions
import formValidationHandler from "../../../../../functions/formValidationHandler";
import getApiUrl from "../../../../../functions/getApiUrl";
import validatorConfig from '../../../../../functions/validatorConfig';
import formatLucidError from '../../../../../functions/formatLucidError';
// Context
import { LoadingContext } from "../../../../../helper/Context";

interface newPostTypeFormInterface {
    callback: () => void
}

const NewPostTypeForm: React.FC<newPostTypeFormInterface> = ({ callback }) => {

    const navigate = useNavigate();

    const { loadingState, setLoadingState } = useContext(LoadingContext);
    const [ templates, setTemplates ] = useState([]);

    const [ selectedTemplate, setSelectedTemplate ] = useState('');
    const [ postName, setPostName ] = useState('');

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

    // 
    useEffect(() => {
        getAllTemplates();
        return () => {}
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
                      save_single (
                            name: "${fields['name']}"
                            template_path: "${fields["template_path"]}"
                        ) 
                        { 
                            _id
                            name
                            template_path
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
                    if(res.data.data.post.save_single) {
                        callback()
                        navigate(`/posts/${res.data.data.post.save_single.name}`);
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
                        message: 'An unexpected error occured while saving the post type!'
                    });
                    setLoadingState(false);
                })
            }
        })
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
                    label="templates"
                    described_by="choose the template file you want this post type to use"/>

                {/* Content Type = name */}
                <TextInput 
                    value={postName}
                    id={'postNameInp'}
                    name={'name'}
                    required={true}
                    errorMsg={'name must only include the following characters: [A-Z_a-z] and be a minimum of 2 characters and a maximum of 100!'}
                    updateValue={setPostName}
                    label={'name'}
                    max={100}
                    min={2}
                    described_by={'a unique post type name. this may only contain a-z characters and underscores, no spaces!'}
                    pattern={validatorConfig.post_name.string}
                    style={'--hide-seperator'}/>

                { formError.error ? errorConEle : null }

                <div className="footer">
                    <div className="textarea">
                        <p>you will be taken to the new post page once it has been made</p>
                    </div>
                    <input className="btnStyle1 btnStyle1--small" type="submit" value="add post type"/>
                </div>
            </form>
        </div>
    )
}

export default NewPostTypeForm;