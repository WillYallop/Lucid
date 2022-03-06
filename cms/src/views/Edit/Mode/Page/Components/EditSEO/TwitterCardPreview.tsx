import {  useContext, useState } from 'react';

import { PageContext } from '../../functions/PageContext';

const TwitterCardPreview: React.FC = () => {

    const { page, setPage } = useContext(PageContext);

    if(page?.seo.twitter_card === 'summary') {
        return (
            <div className="socialCardPreview twitter">
                <h3>twitter</h3>
                {
                    page?.seo.twitter_image ?
                        <div className="card">
                            <img src={page?.seo.twitter_image} alt="Facebook og image card preview" />
                            <div className="contentBlock">
                                { page?.seo.twitter_title ? <h3 className='title'>{ page?.seo.twitter_title }</h3> : null }
                                { page?.seo.og_description ? <p className='description'>{ page?.seo.twitter_description }</p> : null }
                                { page?.slug ? <span className='domain'>domain.com{ page?.live_path }</span> : null }
                            </div>
                        </div>
                    :
                        <div className="card noimage">
                            <div className='blankImage'></div>
                            <div className="contentBlock">
                                { page?.seo.twitter_title ? <h3 className='title'>{ page?.seo.twitter_title }</h3> : null }
                                { page?.seo.og_description ? <p className='description'>{ page?.seo.twitter_description }</p> : null }
                                { page?.slug ? <span className='domain'>domain.com{ page?.live_path }</span> : null }
                            </div>
                        </div>
                }
            </div>
        )
    }
    else {
        return (
            <div className="socialCardPreview twitter">
                <h3>twitter</h3>
                <div className='noPreview'>
                    <p>no preview</p>
                </div>
            </div>
        )
    }


}

export default TwitterCardPreview;