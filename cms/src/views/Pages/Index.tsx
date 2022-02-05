import React, { useContext, useState } from "react";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";
import PageList from "../../components/Pages/PageList";
import SidebarLayout from "../../components/Layout/Sidebar/SidebarLayout";
import SidebarButton from "../../components/Layout/Sidebar/SidebarBtn";
// Icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Pages: React.FC = () => {

    // -------------------------------------------------------
    // Pages
    // -------------------------------------------------------


    // Sidebar Element
    const siderbar = (
        <>
            <SidebarButton 
                text="new page"
                action={() => { console.log('add [age') }}
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