import React from 'react';

interface DefaultPageProps {
    title: string
    body: string
    sidebar?: React.ReactElement
}

const DefaultPage: React.FC<DefaultPageProps> = ({ title, body, sidebar, children }) => {

    return (
        <div className="defaultPageCon">
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
    )
}

export default DefaultPage