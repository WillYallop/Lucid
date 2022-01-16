import React, { useState } from 'react';
// Context
import { ModalContext, defaultModalState } from '../helper/Context';
// Components
import Header from "../components/Layout/Header";
import Navigation from "../components/Layout/Navigation/Navigation";
import Modal from '../components/Modal/Modal';


const MainLayout: React.FC = ({ children }) => {
    
    // Navigation State
    const [navigationState, toggleNavigation] = useState(false);

    // Modal State
    const [modalState, setModalState] = useState(defaultModalState.modalState);

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
                    { children }
                </main>
            </div>
        </ModalContext.Provider>
    );
}

export default MainLayout;