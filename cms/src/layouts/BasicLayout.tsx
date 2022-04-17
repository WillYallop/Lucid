import React, { ReactElement, useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
// Components
import Header from "../components/Layout/Header";
import Modal from '../components/Modal/Modal';
import LoadingIndicator from '../components/Layout/LoadingIndicator';

const BasicLayout: React.FC = () => {

    return (
        <div className="basicLayoutCon">
            {/* Header */}
            <Header/>
            {/* Modal */}
            <Modal/>
            {/* Main */}
            <main>
                <Outlet />
            </main>
            <LoadingIndicator/>
        </div>
    );
}

export default BasicLayout;