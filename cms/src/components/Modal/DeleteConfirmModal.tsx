import { useContext } from "react";
// Context
import { ModalContext } from "../../helper/Context";

interface deleteConfirmModalProps {
    message: string
    action: any
    btnText?: Array<string>
}

const DeleteConfirmModal: React.FC<deleteConfirmModalProps> = ({ message, action, btnText }) => {

    const { modalState, setModalState } = useContext(ModalContext);

    const closeModal = () => {
        setModalState({
            ...modalState,
            state: false
        });
    }

    return (
        <div className="body">
            <p>{ message }</p>

            <div className="footer">
                    <div className="textarea"></div>
                    <div className="doubleBtnCon">
                        <button className="btnStyle1  btnStyle1--auto-width" onClick={closeModal}>{ btnText ? btnText[0] : 'close' }</button>
                        <button className="btnStyle1 btnStyle1--auto-width btnStyle1--delete" onClick={() => {
                            action();
                            closeModal();
                        }}>{ btnText ? btnText[1] : 'delete' }</button>
                    </div>
                </div>
        </div>
    )
}

export default DeleteConfirmModal;