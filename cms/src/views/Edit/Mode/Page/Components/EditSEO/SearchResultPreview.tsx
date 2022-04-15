import {  useContext, useState } from 'react';

import { PageContext } from '../../functions/PageContext';

const SearchResultPreview: React.FC = () => {

    const { page, setPage } = useContext(PageContext);

    return (
        <div className="searchResultPreviewCon">
            <span className='domain'>{ page?.path }</span>
            <h3 className='title'>{ page?.seo.title ? page?.seo.title : 'you have no title set!' }</h3>
            { page?.seo.description ? <p className='description'>{ page?.seo.description }</p> : null }
        </div>
    )
}

export default SearchResultPreview;