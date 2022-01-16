import React, { ReactElement, useState, useEffect } from 'react';
import { useQuery, gql } from "@apollo/client";
// Context
import { 
    ModalContext, defaultModalState
} from '../helper/Context';
// Components
import Header from "../components/Layout/Header";
import Navigation from "../components/Layout/Navigation/Navigation";
import Modal from '../components/Modal/Modal';
import NotificationSection from '../components/Core/Notifications/NotificationSection';

// Ping query
const UTILITY_PING = gql`query {
    utility {
        ping
        {
    recieved
    }
}
}`;

const MainLayout: React.FC = ({ children }) => {
    // Ping API
    const { error } = useQuery(UTILITY_PING); 

    // Navigation State
    const [navigationState, toggleNavigation] = useState(false);
    // Modal State
    const [modalState, setModalState] = useState(defaultModalState.modalState);

    const checkAPIConnection = () => {
        if(error) {
            return (
                <div className='criticalWarning'>
                    <p className="title">Critial Error</p>
                    <p>We cannot connect to the Lucid API. Please check your set up!</p>
                </div>
            )
        }
    }

    return (
        <ModalContext.Provider value={{ modalState, setModalState }}>
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
                    { checkAPIConnection() }
                    { children }
                </main>
            </div>
        </ModalContext.Provider>
    );
}

export default MainLayout;