import React, { ReactElement, useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from "react-router-dom";
// Components
import Header from "../components/Layout/Header";
import Navigation from "../components/Layout/Navigation/Navigation";
import Modal from '../components/Modal/Modal';
// Functions
import getApiUri from "../functions/getApiUri";



const MainLayout: React.FC = () => {
    // Navigation State
    const [navigationState, toggleNavigation] = useState(false);
    // Pint state
    const [showConnectionError, setConnectionErrorState] = useState(false);


    // Check server status
    useEffect(() => {
        checkAPIConnection();
        return () => {
            setConnectionErrorState(false);
        }
    }, []);

    const checkAPIConnection = () => {
        axios({
            url: getApiUri(),
            method: 'post',
            data: {
              query: `
                query {
                    utility {
                        ping
                        {
                            recieved
                        }
                    }
                }`
            }
        })
        .then((result) => {
            const pingRecieved: boolean = result.data.data.utility.ping.recieved;
            if(!pingRecieved) setConnectionErrorState(false);
        })
        .catch((err) => {
            console.log(err);
            setConnectionErrorState(true);
        })
    }

    const connectionErrorEle = (
        <div className='criticalWarning'>
            <p className="title">Critial Error</p>
            <p>We cannot connect to the Lucid API. Please check your set up!</p>
        </div>
    )

    return (
        <div className="mainLayoutCon">
            {/* Header */}
            <Header toggleNav={() => toggleNavigation(!navigationState)}></Header>
            {/* Navigation */}
            <Navigation 
            showNav={navigationState} 
            toggleNav={() => toggleNavigation(!navigationState)}></Navigation>
            {/* Modal */}
            <Modal/>
            {/* Main */}
            <main>
                { showConnectionError ? connectionErrorEle : null }
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;