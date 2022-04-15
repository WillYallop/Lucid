import { createContext } from "react";


// ---------------------------------------
// MODAL
// ---------------------------------------
interface ModalContextInterface {
    modalState: {
        title?: string
        body?: string
        state: boolean
        size: 'small' | 'standard' | string
        element: React.ReactElement
    },
    setModalState?: any
}
export const defaultModalState = {
    modalState: {
        title: '',
        body: '',
        state: false,
        size: 'standard',
        element: (
            <p>Something doesnt seem to be working quite right!</p>
        )
    }
}
export const ModalContext = createContext<Partial<ModalContextInterface>>(defaultModalState);



// ---------------------------------------
// Page Notifications
// ---------------------------------------
interface PageNotificationContextInterface {
    notifications: Array<PageNotificationContextNoticationsObj>,
    setNotifications?: any
}
export interface PageNotificationContextNoticationsObj {
    message: string
    type: 'error' | 'warning' | 'success'
}
export const defaultPageNotificationState = { 
    notifications: []
}
export const PageNotificationContext = createContext<Partial<PageNotificationContextInterface>>(defaultPageNotificationState);



// ---------------------------------------
// Loading State
// ---------------------------------------
interface LoadingContextInterface {
    loadingState: boolean
    setLoadingState?: any
}
export const defaultLoadingContext = {
    loadingState: false
};
export const LoadingContext = createContext<Partial<LoadingContextInterface>>(defaultLoadingContext);