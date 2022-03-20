import react, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { useNavigate } from "react-router-dom";
// Functions
import getApiUrl from "../../functions/getApiUrl";
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

    return (
        <div>
            <h1>sign in</h1>
            <TextInput
                value={username}
                id={"usernameInp"}
                name={"username"}
                label={"username"}
                required={true}
                errorMsg={``}
                updateValue={setUsername}/>
            <TextInput
                value={password}
                id={"passwordInp"}
                label={"password"}
                name={"password"}
                required={true}
                errorMsg={``}
                updateValue={setPassword}/>

            <button onClick={singIn}>sign in</button>
        </div>
    );
}

export default SignIn;