import React, { useContext } from "react";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";
import MediaSidebar from "./Components/Sidebar";
import AddMediaForm from "./Components/AddMediaForm";
// Context
import { ModalContext } from "../../helper/Context";

const Media: React.FC = () => {

    // -------------------------------------------------------
    // Modal 
    // -------------------------------------------------------
    const { modalState, setModalState } = useContext(ModalContext);
    const openAddComponentModal = () => {
        setModalState({
            ...modalState,
            state: true,
            title: 'add media',
            size: 'standard',
            body: 'drop an image or document into the box bellow, or click it an select the file.',
            element: <AddMediaForm/>
        });
    }

    return (
        <DefaultPage
            title="media library"
            body="upload and manage your media"
            sidebar={<MediaSidebar addMediaModalToggle={openAddComponentModal}/>}>
           
        </DefaultPage>
    );
}

export default Media;