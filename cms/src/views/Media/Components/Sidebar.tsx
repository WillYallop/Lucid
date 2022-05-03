// Components
import SidebarButton from "../../../components/Layout/Sidebar/SidebarBtn";
// Icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface MediaSidebarProps {
    addMediaModalToggle: () => void
}

const MediaSidebar: React.FC<MediaSidebarProps> = ({ addMediaModalToggle }) => {
    
    

    return (
        <SidebarButton 
            text="add media"
            action={addMediaModalToggle}
            icon={faPlus}/>
    )
}

export default MediaSidebar;