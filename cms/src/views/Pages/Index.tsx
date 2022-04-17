import React, { useContext, useState } from "react";
import { useToasts } from 'react-toast-notifications';
// Context
import { ModalContext } from "../../helper/Context";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";
import PageList from "../../components/Pages/PageList";
import SidebarButton from "../../components/Layout/Sidebar/SidebarBtn";
import NewPageForm from "./Components/NewPageForm";
// Icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Pages: React.FC = () => {

    const { addToast } = useToasts();

    // -------------------------------------------------------
    // Notification 
    // -------------------------------------------------------
    const addNotification = (message: string, type: 'error' | 'warning' | 'success') => {
        addToast(message, {
            appearance: type
        });
    }

    // -------------------------------------------------------
    // Modal 
    // -------------------------------------------------------
    const { modalState, setModalState } = useContext(ModalContext);

    // Sidebar Element
    const siderbar = (
        <>
            <SidebarButton 
                text="new page"
                action={() => { 
                    setModalState({
                        ...modalState,
                        state: true,
                        title: 'add new page',
                        size: 'standard',
                        body: 'create and configure a new page',
                        element: <NewPageForm
                                    type={'page'}/>
                    });
                }}
                icon={faPlus}/>
        </>
    );

    return (
        <DefaultPage
        title="pages"
        body="create and manage all of your pages!"
        sidebar={siderbar}>
            <PageList
                type={'page'}/>
        </DefaultPage>
    );
}

export default Pages;