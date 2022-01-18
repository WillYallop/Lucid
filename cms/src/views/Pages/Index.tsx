import React, { useContext } from "react";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";
import ExampleNotification from "./Components/ExampleNotification";

const Pages: React.FC = () => {

    // Sidebar Element
    const siderbar = (
        <p>I am a sidebar</p>
    )

    return (
        <DefaultPage
        title="Pages"
        body="Create and manage all of your page!"
        sidebar={siderbar}>
            <p>Lorem ipsum dolar</p>
            

            <ExampleNotification/>

        </DefaultPage>
    );
}

export default Pages;