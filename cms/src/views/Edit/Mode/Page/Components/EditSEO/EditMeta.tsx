import { useEffect, useContext, useState } from 'react';
// components
import TextInput from "../../../../../../components/Core/Inputs/TextInput";
import TextareaInput from '../../../../../../components/Core/Inputs/TextareaInput';
// Context
import { PageContext, UpdatedDataContext } from '../../functions/PageContext';

interface editMetaProps {
    setCanSave: (state: boolean) => void
}

const EditMeta: React.FC<editMetaProps> = ({ setCanSave }) => {

    const { page, setPage } = useContext(PageContext);
    const { updatedData, setUpdatedData } = useContext(UpdatedDataContext);

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
                    if(page !== undefined && updatedData !== undefined) {
                        page.seo.title = value;
                        setPage({...page});
                        updatedData.seoFields.title = true;
                        setUpdatedData({...updatedData});
                        setCanSave(true);
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
                described_by={'the recommended length for the description is between 50 and 160 characters!'}
                updateValue={(value) => { 
                    if(page !== undefined && updatedData !== undefined) {
                        page.seo.description = value;
                        setPage({...page});
                        updatedData.seoFields.description = true;
                        setUpdatedData({...updatedData});
                        setCanSave(true);
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
                    if(page !== undefined && updatedData !== undefined) {
                        page.seo.canonical = value;
                        setPage({...page});
                        updatedData.seoFields.canonical = true;
                        setUpdatedData({...updatedData});
                        setCanSave(true);
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
                    if(page !== undefined && updatedData !== undefined) {
                        page.seo.robots = value;
                        setPage({...page});
                        updatedData.seoFields.robots = true;
                        setUpdatedData({...updatedData});
                        setCanSave(true);
                    }
                }}
                style={'--no-margin-bottom'}/>

        </div>
    )
}

export default EditMeta;