import React, { useContext } from "react";
// Layout
import MainLayout from "../../layouts/MainLayout";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";
import ExampleNotification from "./components/ExampleNotification";

const Pages: React.FC = () => {

    // Sidebar Element
    const siderbar = (
        <p>I am a sidebar</p>
    )

    return (
        <MainLayout>
            <DefaultPage
            title="Pages"
            body="Create and manage all of your page!"
            sidebar={siderbar}>
                <p>Lorem ipsum dolar</p>
                

                <ExampleNotification/>

            </DefaultPage>
        </MainLayout>
    );
}

export default Pages;