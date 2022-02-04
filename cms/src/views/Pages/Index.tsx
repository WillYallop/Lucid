import React, { useContext } from "react";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";
import ExampleNotification from "./Components/ExampleNotification";

const Pages: React.FC = () => {

    // Sidebar Element
    const siderbar = (
        <p>i am a sidebar</p>
    )

    return (
        <DefaultPage
        title="pages"
        body="create and manage all of your page!"
        sidebar={siderbar}>
            <p>lorem ipsum dolar</p>
            

            <ExampleNotification/>

        </DefaultPage>
    );
}

export default Pages;