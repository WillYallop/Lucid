import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
// Components
import PagePreview from './Components/PagePreview';
import EditPageHeader from './Components/EditPageHeader';
// Functions
import formatLucidError from '../../../../functions/formatLucidError';
import getApiUrl from '../../../../functions/getApiUrl';

interface pageModel {
    _id: string
    template: string
    slug: string
    name: string
    type: 'page' | 'post'
    post_name: string
    has_parent: boolean
    parent_id: string
    date_created: string
    last_edited: string
    author: string
    is_homepage: boolean
    post_type_id: string
    components: Array<{
        _id: string
        name: string
        preview_url: string
    }>
}

interface editPageProps {
    slug: string
}

const EditPage: React.FC<editPageProps> = ({ slug }) => {

    const mounted = useRef(false);

    // ---------------------------------------------------------------------/
    // - STATE -------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const [ activeSlug, setActiveSlug ] = useState(slug);
    const [ page, setPage ] = useState({} as pageModel);
    const [ loading, setLoading ] = useState(true);
    const [ pageMarkup, setPageMarkup ] = useState('');
    
    // ---------------------------------------------------------------------/
    // - DATA --------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const getPageData = () => {
        setLoading(true);
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
              query: `query {
                page {
                    get_single(slug: "${ slug === 'homepage' ? '/' : slug }") {
                        _id
                        template
                        slug
                        name
                        type
                        post_name
                        has_parent
                        parent_id
                        date_created
                        last_edited
                        author
                        is_homepage
                        post_type_id
                        components {
                            name
                            _id
                            preview_url
                        }
                    }
                }
            }`
            }
        })
        .then((result) => {
            const page: pageModel = result.data.data.page.get_single || {};
            if(page) {
                if(!mounted.current) return null;
                setPage(page);
            }
            else {
                // setFormError({
                //     error: true,
                //     message: formatLucidError(result.data.errors[0].message).message
                // });
            }
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        })
    }

    // ---------------------------------------------------------------------/
    // - ON LOAD -----------------------------------------------------------/
    // ---------------------------------------------------------------------/
    useEffect(() => {
        mounted.current = true;
        getPageData();
        
        // Temp
        setPageMarkup(`<div>
            <h1>Page</h1>
            <a href="/about">About</a>           
            <a href="https://williamyallop.com">William Yallop Portfolio</a> 
        </div>`)

        return () => {
            mounted.current = false;
            setPage({} as pageModel);
            setLoading(true);
            setActiveSlug(slug);
        }
    }, []); 

    if(slug !== activeSlug) {
        getPageData();
        setActiveSlug(slug);
    }
    

    return (
        <div className='pageEditCon' key={activeSlug}>
            <EditPageHeader pageName={page.name}/>
            <div className="sidebar">
                { slug }
                { page.name }
            </div>
            <div className="pagePreviewCon">
                <PagePreview
                    pageMarkup={pageMarkup}/>
            </div>
        </div>
    );
}

export default EditPage;