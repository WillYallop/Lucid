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
            <div className="headerRow">
                <button
                    className={`btnStyle3`} 
                    onClick={exit}>
                    <CoreIcon 
                        icon={faSignInAlt}
                        style={'flip-horizontal'}/>
                    <p>page preview</p>
                </button>
            </div>
            {/* Body */}
            <div className="body">
                {/* Search Result preview */}
                <SearchResultPreview/>
                {/* main content */}
                <div className="mainContent">
                    {/* meta */}
                    <EditMeta setCanSave={setCanSave}/>
                    {/* socials meta */}
                    <EditMetaOG setCanSave={setCanSave}/>
                </div>
                {/* socials sidebar */}
                <div className="socialsSidebar">
                    <div className='blockCon'>
                        <FacebookCardPreview />
                        <TwitterCardPreview />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default EditSEO;