import React, { createContext, useState } from 'react';

const emptyModal = (
    <div>Placeholder</div>
);

const modalState = {
    status: true,
    element: emptyModal
}
const ModalState = createContext(modalState);


// Open modal
export const openModal = (element: React.ReactElement) => {
    alert('open modal');
}

const Modal: React.FC<{}> = ({  }) => {

    const emptyModal = (
        <div>Placeholder</div>
    );
    
    const [modalState, setModalState] = useState(false);
    const [modalElement, setModalElement] = useState(emptyModal);

    // Close modal
    const closeModal = () => {
        alert('close modal')
    }

    return (
        <div className='modalCon'>
            <div className='inner'>

                <div className='content'>
                    { modalState }
                </div>

            </div>
            <div className='overlay' onClick={closeModal}></div>
        </div>
    )
}

export default Modal;