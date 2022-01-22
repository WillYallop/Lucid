import { ReactElement } from "react"
// Components
import SidebarLayout from './SidebarLayout';

interface MetaRowInterface {
    key: string
    data: string | number
} 
interface SideBarMetaProps {
    rows: Array<MetaRowInterface>
}

const SidebarMeta: React.FC<SideBarMetaProps> = ({ rows }) => {

    const metaRows: Array<ReactElement> = [];
    for(let i = 0; i < rows.length; i++) {
        metaRows.push(<div className="sidebarCon__body__key-row">
            <p>{ rows[i].key }</p>
            <p className="bold">{ rows[i].data }</p>
        </div>)
    }

    return (
        <SidebarLayout 
        title="Meta">
            { metaRows }
        </SidebarLayout>
    )
}

export default SidebarMeta;