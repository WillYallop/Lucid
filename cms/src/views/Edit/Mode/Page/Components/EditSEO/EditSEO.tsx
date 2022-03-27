// Components
import CoreIcon from '../../../../../../components/Core/Icon';
import SearchResultPreview from './SearchResultPreview';
import EditMetaOG from './EditMetaOG';
import EditMeta from './EditMeta';
import TwitterCardPreview from './TwitterCardPreview';
import FacebookCardPreview from './OGCardPreview';
// Icons
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

interface editSEOProps {
    exit: () => void
    setCanSave: (state: boolean) => void
}

const EditSEO: React.FC<editSEOProps> = ({ exit, setCanSave }) => {

    return (
        <div className="editPageCon">
            {/* Header */}
            <div className="pagePreviewRow">
                <button
                    className={`btnStyle3`} 
                    onClick={exit}>
                    <CoreIcon 
                        icon={faSignInAlt}
                        style={'flip-horizontal'}/>
                    page preview
                </button>
            </div>
            <div className="topRow"></div>
            {/* Body */}
            <div className="body">

                {/* main content */}
                <div className="mainContent">
                    {/* Search Result preview */}
                    <SearchResultPreview/>
                    {/* meta */}
                    <EditMeta setCanSave={setCanSave}/>
                    {/* socials meta */}
                    <EditMetaOG setCanSave={setCanSave}/>
                </div>
                {/* socials sidebar */}
                <div className="socialsSidebar blockCon">
                    <FacebookCardPreview />
                    <TwitterCardPreview />
                </div>
                
            </div>
        </div>
    )
}

export default EditSEO;