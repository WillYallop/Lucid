import {  useContext, useState } from 'react';

import { PageContext } from '../../functions/PageContext';

const FacebookCardPreview: React.FC = () => {

    const { page, setPage } = useContext(PageContext);

    return (
        <div className="socialCardPreview facebook">
            <h3>facebook</h3>
            {
                page?.seo.og_image ?
                    <div className="card">
                        <img src={page?.seo.og_image} alt="Facebook og image card preview" />
                        <div className="contentBlock">
                            <span className='domain'>domain.com/{ page?.slug === '/' ? '' : page?.slug }</span>
                            <h3 className='title'>{ page?.seo.og_title }</h3>
                            <p className='description'>{ page?.seo.og_description }</p>
                        </div>
                    </div>
                :
                    <div className="card noimage">
                        <div className='blankImage'></div>
                        <div className="contentBlock">
                            <span className='domain'>domain.com/{ page?.slug === '/' ? '' : page?.slug }</span>
                            <h3 className='title'>{ page?.seo.og_title }</h3>
                            <p className='description'>{ page?.seo.og_description }</p>
                        </div>
                    </div>
            }
        </div>
    )
}

export default FacebookCardPreview;