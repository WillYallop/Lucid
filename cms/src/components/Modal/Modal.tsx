import ReactDom from 'react-dom';
// Components
import CoreIcon from "../Core/Icon";
// Icons
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
    state: boolean
    toggleState: () => void
    title?: string
    body?: string
}

const Modal: React.FC<ModalProps> = ({ children, state, toggleState, title, body }) => {
    const portalEle = document.getElementById('portal') as HTMLElement;

    if(!state) return null;

    return ReactDom.createPortal(
        <div className='modalCon'>
            <div className='inner'>

                <div className='content'>
                    <div className='header'>
                        <h2>{ title ? title : 'Modal header' }</h2>
                        { body ? <p>{body}</p> : null }
                        <div className='closeBtn' onClick={toggleState}>
                            <CoreIcon icon={faTimes}/>
                        </div>
                    </div>
                    { children }
                </div>

            </div>
            <div className='overlay' onClick={toggleState}></div>
        </div>,
        portalEle
    )
}

export default Modal;