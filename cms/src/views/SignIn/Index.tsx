import react, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { useNavigate } from "react-router-dom";
// Functions
import getApiUrl from "../../functions/getApiUrl";
import formValidationHandler from "../../functions/formValidationHandler";
// Components
import TextInput from '../../components/Core/Inputs/TextInput';


const SignIn: React.FC = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const navigate = useNavigate();

    const singIn = () => {
        const queryObj = {
            query: {
                authentication: {
                    sign_in: {
                        __args: {
                            username: username,
                            password: password
                        },
                        success: true,
                        token: true
                    }
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: query
            }
        })
        .then((result) => {
            console.log(result);
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
        })
    }


    const validateForm = (e: React.FormEvent) => {
        formValidationHandler({
            e: e,
            onValidatePass: (fields) => {
                console.log(fields);
            }
        })
    }


    return (
        <div className="signInCon">
            <h1>sign in</h1>
            <p className="authP">sign in to get access and manage your website</p>
            <form onSubmit={validateForm} noValidate={true}>
                <TextInput
                    value={username}
                    id={"usernameInp"}
                    name={"username"}
                    label={"username"}
                    required={true}
                    errorMsg={`make sure to enter your username correctly`}
                    updateValue={setUsername} />
                <TextInput
                    value={password}
                    id={"passwordInp"}
                    label={"password"}
                    name={"password"}
                    required={true}
                    errorMsg={`you must enter your password`}
                    updateValue={setPassword}
                    password={true}/>
                <input className='btnStyle1 btnStyle1--auto-width btnStyle1--min-width' type={'submit'} value={'sign in'}></input>
            </form>
        </div>
    );
}

export default SignIn;