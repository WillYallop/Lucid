import React, { useState } from 'react';
// Components
import Header from "../components/Layout/Header";
import Navigation from "../components/Layout/Navigation/Navigation";


const MainLayout: React.FC = ({ children }) => {
    const [navigationState, toggleNavigation] = useState(false);

    return (
        <div className="mainLayoutCon">
            {/* Header */}
            <Header toggleNav={() => toggleNavigation(!navigationState)}></Header>
            {/* Navigation */}
            <Navigation 
            showNav={navigationState} 
            toggleNav={() => toggleNavigation(!navigationState)}></Navigation>
            {/* Main */}
            <main>
                { children }
            </main>
        </div>
    );
}

export default MainLayout;