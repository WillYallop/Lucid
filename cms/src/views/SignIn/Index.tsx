import react, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// Functions
import getApiUrl from "../../functions/getApiUrl";
import formValidationHandler from "../../functions/formValidationHandler";
// Components
import TextInput from '../../components/Core/Inputs/TextInput';
// Data
import { signIn, signInAndUpdate } from '../../data/auth';


const SignIn: React.FC = () => {

    const [ updateDetails, setUpdateDetails ] = useState(false);
    const [ userId, setUserId ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordRepeat, setPasswordRepeat ] = useState('');
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const navigate = useNavigate();

    const validateSignInForm = (e: React.FormEvent) => {
        formValidationHandler({
            e: e,
            onValidatePass: (fields) => {
                signIn({
                    __args: {
                        username: fields.username,
                        password: fields.password
                    },
                    success: true,
                    defualt_details: true,
                    _id: true
                },
                (response) => {
                    const data = response.data.data.authentication.sign_in;
                    const success = data.success || false;
                    if(success) {
                        if(data.defualt_details) {
                            setUserId(data._id);
                            // reset info
                            setUsername('');
                            setPassword('');
                            setErrorMessage('');
                            setShowError(false);
                            // show update details form 
                            setUpdateDetails(true);
                        }
                        else {
                            navigate('/');
                        }
                    }
                    else {
                        setErrorMessage('the details you entered are incorrect');
                        setShowError(true);
                    }
                },
                (err) => {
                    setErrorMessage('there was an unexpected error! please try again');
                    setShowError(true);
                })
            }
        });
    }

    const validateUpdateDataForm = (e: React.FormEvent) => {
        formValidationHandler({
            e: e,
            onValidatePass: (fields) => {
                signInAndUpdate({
                    __args: {
                        _id: userId,
                        email: fields.email,
                        username: fields.username,
                        password: fields.password
                    },
                    success: true
                },
                (response) => {
                    const data = response.data.data.authentication.sign_in_update;
                    const success = data.success || false;
                    if(success) {
                        navigate('/');
                    }
                    else {
                        setErrorMessage('there was an unexpected error! please try again');
                        setShowError(true);
                    }
                },
                (err) => {
                    setErrorMessage('there was an unexpected error! please try again');
                    setShowError(true);
                });
            },
            customValidation: [
                {
                    field_name: 'password',
                    validator: (value) => {
                        const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{8,}$/);
                        if(regex.test(value)) return '';
                        else return 'Error';
                    }
                },
                {
                    field_name: 'passwordRepeat',
                    validator: (value) => {
                        const passwordInpEle = document.getElementById('passwordNewInp') as HTMLInputElement;
                        if(value === passwordInpEle.value) return '';
                        else return 'Error';
                    }
                }
            ]
        });
    }

    return (
        <div className="signInCon">


            {
                updateDetails 
                ?
                <>
                    <h1>welcome to LUCID</h1>
                    <p className="authP">before we get started. please update your admin accounts credentials and information</p>
                    <form onSubmit={validateUpdateDataForm} noValidate={true}>
                        <TextInput
                            value={username}
                            id={"usernameInp"}
                            name={"username"}
                            label={"username"}
                            required={true}
                            errorMsg={`a username must be between 4 and 60 characters`}
                            updateValue={setUsername} 
                            autocomplete={'username'}
                            min={4}
                            max={60}/>
                        <TextInput
                            value={email}
                            id={"userEmailInp"}
                            name={"email"}
                            label={"email"}
                            required={true}
                            errorMsg={`enter a valid email`}
                            updateValue={setEmail} 
                            autocomplete={'email'}
                            type={'email'}/>
                        <TextInput
                            value={password}
                            id={"passwordNewInp"}
                            label={"password"}
                            name={"password"}
                            required={true}
                            errorMsg={`your password does not meet the required criteria`}
                            updateValue={setPassword}
                            type={'password'}
                            autocomplete={'new-password'}/>
                        <TextInput
                            value={passwordRepeat}
                            id={"passwordRepeatInp"}
                            label={"password repeat"}
                            name={"passwordRepeat"}
                            required={true}
                            errorMsg={`make sure your passwords match`}
                            updateValue={setPasswordRepeat}
                            type={'password'}
                            autocomplete={'new-password'}/>
                        {
                            showError ?
                                <div className='errorMsgRow'>
                                    <p>{ errorMessage }</p>
                                </div>
                            : null
                        }
                        <input className='btnStyle1 btnStyle1--auto-width btnStyle1--min-width' type={'submit'} value={'update & continue'}></input>
                    </form>
                </>

                :
                <>
                    <h1>sign in</h1>
                    <p className="authP">sign in to get access and manage your website</p>
                    <form onSubmit={validateSignInForm} noValidate={true}>
                        <TextInput
                            value={username}
                            id={"usernameInp"}
                            name={"username"}
                            label={"username"}
                            required={true}
                            errorMsg={`make sure to enter your username correctly`}
                            updateValue={setUsername} 
                            autocomplete={'username'}/>
                        <TextInput
                            value={password}
                            id={"passwordInp"}
                            label={"password"}
                            name={"password"}
                            required={true}
                            errorMsg={`you must enter your password`}
                            updateValue={setPassword}
                            type={'password'}
                            autocomplete={'current-password'}/>
                        {
                            showError ?
                                <div className='errorMsgRow'>
                                    <p>{ errorMessage }</p>
                                </div>
                            : null
                        }
                        <input className='btnStyle1 btnStyle1--auto-width btnStyle1--min-width' type={'submit'} value={'sign in'}></input>
                    </form>
                </>

            }




        </div>
    );
}

export default SignIn;