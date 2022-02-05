import React, { useContext, useState } from "react";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";
import PageList from "../../components/Pages/PageList";
import SidebarLayout from "../../components/Layout/Sidebar/SidebarLayout";

const Pages: React.FC = () => {

    // -------------------------------------------------------
    // Pages
    // -------------------------------------------------------


    // Sidebar Element
    const siderbar = (
        <>
 
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