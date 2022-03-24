import React, { ReactElement, useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
// Assets
import backgroundImg from '../assets/authBackground.svg';
import logoImg from '../assets/logo.svg';

const AuthLayout: React.FC = () => {

    return (
        <div className="authLayoutCon">
            <div className="bodyCon">
                <header>
                    <img src={logoImg}/>
                </header>
                <main className='mainCon'>
                    <div className="inner">
                        <Outlet />
                    </div>
                </main>
            </div>
            <div className='imgCon'>
                <img src={backgroundImg} alt=''/>
            </div>
        </div>
    );
}

export default AuthLayout;