import {  useContext, useState } from 'react';

import { PageContext } from '../../functions/PageContext';

const SearchResultPreview: React.FC = () => {

    const { page, setPage } = useContext(PageContext);

    return (
        <div className="searchResultPreviewCon">
            <span className='domain'>domain.com{ page?.live_path }</span>
            <h3 className='title'>{ page?.seo.title }</h3>
            <p className='description'>{ page?.seo.description }</p>
        </div>
    )
}

export default SearchResultPreview;