import { createContext, useContext } from "react";

// ---------------------------------------
// MODAL
// ---------------------------------------
interface ModalContextInterface {
    modalState: {
        title?: string
        body?: string
        state: boolean
        element: React.ReactElement
    },
    setModalState?: any
}
export const defaultModalState = {
    modalState: {
        title: '',
        body: '',
        state: false,
        element: (
            <p>Something doesnt seem to be working quite right!</p>
        )
    }
}
export const ModalContext = createContext<Partial<ModalContextInterface>>(defaultModalState);