// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
// Components
import { useState, useContext } from "react";
import TextInput from "../../../components/Core/Inputs/TextInput";
import formValidationHandler from "../../../functions/formValidationHandler";
// Context
import { 
    ModalContext,
    LoadingContext
} from "../../../helper/Context";

const AddMediaForm: React.FC = () => {

    // -------------------------------------------------------
    // State
    // -------------------------------------------------------
    const { loadingState, setLoadingState } = useContext(LoadingContext);
    const { modalState, setModalState } = useContext(ModalContext);
    const [ formError, setFormError ] = useState({
        error: false,
        message: ''
    });
    const [ title, setTitle ] = useState('');
    const [ alt, setAlt ] = useState('');


    // -------------------------------------------------------
    // Functions
    // -------------------------------------------------------
    const validateForm = (e: React.FormEvent) => {
        formValidationHandler({
            e: e,
            onValidatePass: (fields) => {

            }
        });
    }

    const errorConEle = (
        <div className="errorCon">
            <p>{ formError.message }</p>
        </div>  
    );

    return (
        <div className="body">

            <form onSubmit={validateForm} noValidate={true}>

                <div className="dropTarget" onClick={() => document.getElementById('dropFileUpload')?.click()}>
                    <div className="dropTarget__inner">

                        <FontAwesomeIcon icon={faUpload}/>
                        <input  type="file" id="dropFileUpload" style={{ display: 'none' }}/>
                        <input className="dropTarget__inner__input" type="button" value="Browse..." />
                        <label htmlFor="dropFileUpload">select a file or drop one here.</label>

                    </div>
                </div>


                { formError.error ? errorConEle : null }
                    
                <div className="footer">
                    <div className="textarea">
                        <p>image types may take a moment longer, as we convert them into webp, avif, jpeg and png formats and optimise them.</p>
                    </div>
                    <input className="btnStyle1 btnStyle1--auto-width" type="submit" value="upload" />
                </div>
            </form>

        </div>
    )
}

export default AddMediaForm;