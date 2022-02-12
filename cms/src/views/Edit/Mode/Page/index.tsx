import react, { useEffect, useState } from 'react';
// Components
import PagePreview from './Components/PagePreview';

interface editPageProps {
    slug: string
}

const EditPage: React.FC<editPageProps> = ({ slug }) => {

    // ---------------------------------------------------------------------/
    // - STATE -------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const [ activeSlug, setActiveSlug ] = useState(slug);
    

    // ---------------------------------------------------------------------/
    // - ON LOAD -----------------------------------------------------------/
    // ---------------------------------------------------------------------/
    useEffect(() => {
        
    }, []);

    if(slug != activeSlug) {
        
        setActiveSlug(slug);
    }
    

    return (
        <div className='pageEditCon' key={activeSlug}>
            <div className="sidebar">
                exit
                { slug }
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