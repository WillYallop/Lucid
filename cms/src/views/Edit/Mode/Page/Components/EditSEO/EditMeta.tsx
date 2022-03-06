import { useEffect, useContext, useState } from 'react';
// components
import TextInput from "../../../../../../components/Core/Inputs/TextInput";
import TextareaInput from '../../../../../../components/Core/Inputs/TextareaInput';
// Context
import { PageContext, UpdatedDataContext } from '../../functions/PageContext';

const EditMeta: React.FC = () => {

    const { page, setPage } = useContext(PageContext);

    return (
        <div className="blockCon">

            {/* Meta title */}
            <TextInput
                id={'metaTitleInp'}
                label="meta title"
                value={page?.seo.title || ''}
                name={'metaTitle'}
                required={false}
                errorMsg={''}
                updateValue={(value) => { 
                    if(page != undefined) {
                        page.seo.title = value;
                        setPage({...page});
                    }
                }}/>

            {/* Meta description */}
            <TextareaInput
                id={'metaDescriptionInp'}
                label="meta description"
                value={page?.seo.description || ''}
                name={'metaDescription'}
                required={false}
                errorMsg={''}
                updateValue={(value) => { 
                    if(page != undefined) {
                        page.seo.description = value;
                        setPage({...page});
                    }
                }}/>

            {/* Meta canonical */}
            <TextInput
                id={'metaCanonicalInp'}
                label="meta canonical"
                value={page?.seo.canonical || ''}
                name={'metaCanonical'}
                required={false}
                errorMsg={''}
                updateValue={(value) => { 
                    if(page != undefined) {
                        page.seo.canonical = value;
                        setPage({...page});
                    }
                }}/>

            {/* Meta robots */}
            <TextInput
                id={'metaRobotsInp'}
                label="meta robots"
                value={page?.seo.robots || ''}
                name={'metaRobots'}
                required={false}
                errorMsg={''}
                updateValue={(value) => { 
                    if(page != undefined) {
                        page.seo.robots = value;
                        setPage({...page});
                    }
                }}
                style={'--no-margin-bottom'}/>

        </div>
    )
}

export default EditMeta;