import React, { useState } from 'react';
// Context
import { PageNotificationContext, defaultPageNotificationState } from '../../helper/Context';
// Components
import NotificationSection from '../Core/Notifications/NotificationSection';

interface DefaultPageProps {
    title: string
    body: string
    sidebar?: React.ReactElement
}

const DefaultPage: React.FC<DefaultPageProps> = ({ title, body, sidebar, children }) => {
    const [ notifications, setNotifications ] = useState(defaultPageNotificationState.notifications);

    return (
        <PageNotificationContext.Provider value={{ notifications, setNotifications }}>
            <div className="defaultPageCon">
                {/* Notification Section */}
                <NotificationSection />
                {/* Header Row */}
                <div className="header">
                    <h1>{ title }</h1>
                    <p>{ body }</p>
                </div>
                {/* Content */}
                <div className={`content ${sidebar ? 'hasSidebar' : ''}`}>
                    {/* Main */}
                    <div className="main">
                        { children }
                    </div>
                    {/* Sidebar */}
                    { sidebar ? <div className="sidebar"> { sidebar } </div> : null }
                </div>
            </div>
        </PageNotificationContext.Provider>
    )
}

export default DefaultPage