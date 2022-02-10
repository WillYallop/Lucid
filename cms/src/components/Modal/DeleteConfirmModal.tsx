import { useContext } from "react";
// Context
import { ModalContext } from "../../helper/Context";

interface deleteConfirmModalProps {
    message: string
    action: any
}

const DeleteConfirmModal: React.FC<deleteConfirmModalProps> = ({ message, action }) => {

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
                        <button className="btnStyle1  btnStyle1--small" onClick={closeModal}>close</button>
                        <button className="btnStyle1 btnStyle1--small btnStyle1--delete" onClick={() => {
                            action();
                            closeModal();
                        }}>delete</button>
                    </div>
                </div>
        </div>
    )
}

export default DeleteConfirmModal;