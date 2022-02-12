import react, { useEffect } from 'react';
// Components
import PagePreview from './Components/PagePreview';

interface editPageProps {
    slug: string
}

const EditPage: React.FC<editPageProps> = ({ slug }) => {

    

    return (
        <div className='pageEditCon'>
            <div className="sidebar">
                exit
            </div>
            <div className="pagePreviewCon">
                <PagePreview/>
            </div>
            <div className="sidebar">
                save
            </div>
        </div>
    );
}

export default EditPage;