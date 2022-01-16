import { useContext } from "react";
// Components
import CoreIcon from "../Core/Icon";
// Icons
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// Context
import { ModalContext } from "../../helper/Context";

const Modal: React.FC = () => {
    const { modalState, setModalState } = useContext(ModalContext);

    if(!modalState) return null;
    if(!modalState.state) return null;

    const closeModal = () => {
        setModalState({
            ...modalState,
            state: false
        });
    }

    return (
        <div className='modalCon'>
            <div className='inner'>

                <div className='content'>
                    <div className='header'>
                        <h2>{ modalState.title ? modalState.title : 'Modal header' }</h2>
                        { modalState.body ? <p>{modalState.body}</p> : null }
                        <div className='closeBtn' onClick={closeModal}>
                            <CoreIcon icon={faTimes}/>
                        </div>
                    </div>
                    { modalState.element }
                </div>

            </div>
            <div className='overlay' onClick={closeModal}></div>
        </div>
    )
}

export default Modal;