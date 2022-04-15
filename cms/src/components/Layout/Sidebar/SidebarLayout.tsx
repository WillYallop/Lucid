
interface SidebarLayoutProps {
    title?: string
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ title, children }) => {
    return (
        <div className="blockCon sidebarCon">
            {
                title
                ? 
                <div className="sidebarCon__header">
                    <p className="bold">{ title }</p>
                </div>
                : null
            }
            <div className="sidebarCon__body">
                { children }
            </div>
        </div>
    )
}

export default SidebarLayout