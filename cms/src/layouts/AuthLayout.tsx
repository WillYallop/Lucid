import React, { ReactElement, useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
// Assets
import background from '../assets/authBackground.svg';

const AuthLayout: React.FC = () => {

    return (
        <div className="authLayoutCon">
            {/* Main */}
            <main className="mainCon">
                <Outlet />
            </main>
            <div className='imgCon'>
                <img src={background} alt=''/>
            </div>
        </div>
    );
}

export default AuthLayout;