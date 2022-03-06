import {  useContext, useState } from 'react';

import { PageContext } from '../../functions/PageContext';

const OGCardPreview: React.FC = () => {

    const { page, setPage } = useContext(PageContext);

    if(page?.seo.og_title && page?.seo.og_description) {
        return (
            <div className="socialCardPreview">
                <h3>open graph</h3>
                {
                    page?.seo.og_image ?
                        <div className="card">
                            <img src={page?.seo.og_image} alt="Open graph image card preview" />
                            <div className="contentBlock">
                                { page?.slug ? <span className='domain'>domain.com{ page?.live_path }</span> : null }
                                { page?.seo.og_title ? <h3 className='title'>{ page?.seo.og_title }</h3> : null }
                                { page?.seo.og_description ? <p className='description'>{ page?.seo.og_description }</p> : null }
                            </div>
                        </div>
                    :
                        <div className="card noimage">
                            <div className='blankImage'></div>
                            <div className="contentBlock">
                                { page?.slug ? <span className='domain'>domain.com{ page?.live_path }</span> : null }
                                { page?.seo.og_title ? <h3 className='title'>{ page?.seo.og_title }</h3> : null }
                                { page?.seo.og_description ? <p className='description'>{ page?.seo.og_description }</p> : null }
                            </div>
                        </div>
                }
            </div>
        )
    }
    else {
        return (
            <div className="socialCardPreview">
                <h3>open graph</h3>
                <div className='noPreview'>
                    <p>not enough data</p>
                </div>
            </div>
        )
    }

}

export default OGCardPreview;