import { useEffect, useContext, useState } from 'react';
// components
import TextInput from "../../../../../../components/Core/Inputs/TextInput";
import TextareaInput from '../../../../../../components/Core/Inputs/TextareaInput';
import SelectInput from '../../../../../../components/Core/Inputs/SelectInput';
import TargetTextLengthBar from './TargetTextLengthBar';
// Context
import { PageContext, UpdatedDataContext } from '../../functions/pageContext';

interface editOGProps {
    setCanSave: (state: boolean) => void
}

const EditMetaOG: React.FC<editOGProps> = ({ setCanSave }) => {

    const { page, setPage } = useContext(PageContext);
    const { updatedData, setUpdatedData } = useContext(UpdatedDataContext);
    const [ tab, setTab ] = useState<'og' | 'twitter'>('og')

    return (
        <>
            {/* Tab select row */}
            <div className="buttonRow">
                <button className={`btnStyle1 ${ tab !== 'og' ? 'btnStyle1--not-active' : '' }`} onClick={() => { setTab('og') }}>open graph</button>
                <button className={`btnStyle1 ${ tab !== 'twitter' ? 'btnStyle1--not-active-alt' : '' }`}  onClick={() => { setTab('twitter') }}>twitter</button>
            </div>
            <div className="blockCon blockCon--no-top-radius blockCon--large-bot-margin">
                {
                    tab === 'og' ?
                    <>
                        {/* og type */}
                        <SelectInput
                            id={'metaOGTypeInp'}
                            label="og type"
                            value={page?.seo.og_type || ''}
                            name={'metaOGType'}
                            required={false}
                            options={[
                                'website',
                                'article',
                                'book',
                                'profile'
                            ]}
                            errorMsg={''}
                            updateValue={(value) => { 
                                if(page !== undefined && updatedData !== undefined) {
                                    page.seo.og_type = value;
                                    setPage({...page});
                                    updatedData.seoFields.og_type = true;
                                    setUpdatedData({...updatedData});
                                    setCanSave(true);
                                }
                            }}/>

                        {/* og title */}
                        <TextInput
                            id={'metaOGTitleInp'}
                            label="og title"
                            value={page?.seo.og_title || ''}
                            name={'metaOGTitle'}
                            required={false}
                            errorMsg={''}
                            updateValue={(value) => { 
                                if(page !== undefined && updatedData !== undefined) {
                                    page.seo.og_title = value;
                                    setPage({...page});
                                    updatedData.seoFields.og_title = true;
                                    setUpdatedData({...updatedData});
                                    setCanSave(true);
                                }
                            }}/>

                        {/* og description */}
                        <TextareaInput
                            id={'metaOGDescriptionInp'}
                            label="og description"
                            value={page?.seo.og_description || ''}
                            name={'metaOGDescription'}
                            required={false}
                            errorMsg={''}
                            style={'dropdown-open'}
                            updateValue={(value) => { 
                                if(page !== undefined && updatedData !== undefined) {
                                    page.seo.og_description = value;
                                    setPage({...page});
                                    updatedData.seoFields.og_description = true;
                                    setUpdatedData({...updatedData});
                                    setCanSave(true);
                                }
                            }}>
                                <TargetTextLengthBar
                                    target={50}
                                    max={200}
                                    min={10}
                                    length={page?.seo.og_description.length ? page?.seo.og_description.length : 0}/>
                                <p id='metaOGDescriptionInp-described-by' className='describedBy describedBy--marginTop'>the optimum length for the og description is 55 characters or under, with the upper limit at 200!</p>
                            </TextareaInput>

                        {/* og image */}
                        <TextInput
                            id={'metaOGImageInp'}
                            label="og image"
                            value={page?.seo.og_image || ''}
                            name={'metaOGImage'}
                            required={false}
                            errorMsg={''}
                            updateValue={(value) => { 
                                if(page !== undefined && updatedData !== undefined) {
                                    page.seo.og_image = value;
                                    setPage({...page});
                                    updatedData.seoFields.og_image = true;
                                    setUpdatedData({...updatedData});
                                    setCanSave(true);
                                }
                            }}
                            style={'--no-margin-bottom'}/>

                    </>
                    : null
                }

                {
                    tab === 'twitter' ?
                    <>
                        {/* og type */}
                        <SelectInput
                            id={'metaTwitterCardInp'}
                            label="twitter card"
                            value={page?.seo.twitter_card || ''}
                            name={'metaTwitterCard'}
                            required={false}
                            options={[
                                'summary',
                                'summary large image',
                                'app',
                                'player'
                            ]}
                            errorMsg={''}
                            updateValue={(value: any) => { 
                                if(page !== undefined && updatedData !== undefined) {
                                    page.seo.twitter_card = value;
                                    setPage({...page});
                                    updatedData.seoFields.twitter_card = true;
                                    setUpdatedData({...updatedData});
                                    setCanSave(true);
                                }
                            }}/>


                        {/* twitter title */}
                        <TextInput
                            id={'metaTwitterTitleInp'}
                            label="twitter title"
                            value={page?.seo.twitter_title || ''}
                            name={'metaTwitterTitle'}
                            required={false}
                            errorMsg={''}
                            updateValue={(value) => { 
                                if(page !== undefined && updatedData !== undefined) {
                                    page.seo.twitter_title = value;
                                    setPage({...page});
                                    updatedData.seoFields.twitter_title = true;
                                    setUpdatedData({...updatedData});
                                    setCanSave(true);
                                }
                            }}/>

                        {/* twitter description */}
                        <TextareaInput
                            id={'metaTwitterDescriptionInp'}
                            label="twitter description"
                            value={page?.seo.twitter_description || ''}
                            name={'metaTwitterDescription'}
                            required={false}
                            errorMsg={''}
                            style={'dropdown-open'}
                            updateValue={(value) => { 
                                if(page !== undefined && updatedData !== undefined) {
                                    page.seo.twitter_description = value;
                                    setPage({...page});
                                    updatedData.seoFields.twitter_description = true;
                                    setUpdatedData({...updatedData});
                                    setCanSave(true);
                                }
                            }}>
                                <TargetTextLengthBar
                                    target={125}
                                    max={200}
                                    min={10}
                                    length={page?.seo.twitter_description.length ? page?.seo.twitter_description.length : 0}/>
                                <p id='metaTwitterDescriptionInp-described-by' className='describedBy describedBy--marginTop'>
                                    the optimum length for the twitter description is 125 characters or under, with the upper limit at 200. note that at this length however, it may not all be shown still!</p>
                            </TextareaInput>

                        {/* twitter image */}
                        <TextInput
                            id={'metaTwitterImageInp'}
                            label="twitter image"
                            value={page?.seo.twitter_image || ''}
                            name={'metaTwitterImage'}
                            required={false}
                            errorMsg={''}
                            updateValue={(value) => { 
                                if(page !== undefined && updatedData !== undefined) {
                                    page.seo.twitter_image = value;
                                    setPage({...page});
                                    updatedData.seoFields.twitter_image = true;
                                    setUpdatedData({...updatedData});
                                    setCanSave(true);
                                }
                            }}/>

                        {/* twitter site */}
                        <TextInput
                            id={'metaTwitterSiteInp'}
                            label="twitter site"
                            value={page?.seo.twitter_site || ''}
                            name={'metaTwitterSite'}
                            required={false}
                            errorMsg={''}
                            updateValue={(value) => { 
                                if(page !== undefined && updatedData !== undefined) {
                                    page.seo.twitter_site = value;
                                    setPage({...page});
                                    updatedData.seoFields.twitter_site = true;
                                    setUpdatedData({...updatedData});
                                    setCanSave(true);
                                }
                            }}/>

                        {/* twitter creator */}
                        <TextInput
                            id={'metaTwitterCreatorInp'}
                            label="twitter creator"
                            value={page?.seo.twitter_creator || ''}
                            name={'metaTwitterCreator'}
                            required={false}
                            errorMsg={''}
                            updateValue={(value) => { 
                                if(page !== undefined && updatedData !== undefined) {
                                    page.seo.twitter_creator = value;
                                    setPage({...page});
                                    updatedData.seoFields.twitter_creator = true;
                                    setUpdatedData({...updatedData});
                                    setCanSave(true);
                                }
                            }}/>

                        {/* twitter player */}
                        <TextInput
                            id={'metaTwitterPlayuerInp'}
                            label="twitter player"
                            value={page?.seo.twitter_player || ''}
                            name={'metaTwitterPlayer'}
                            required={false}
                            errorMsg={''}
                            updateValue={(value) => { 
                                if(page !== undefined && updatedData !== undefined) {
                                    page.seo.twitter_player = value;
                                    setPage({...page});
                                    updatedData.seoFields.twitter_player = true;
                                    setUpdatedData({...updatedData});
                                    setCanSave(true);
                                }
                            }}/>
                    </>
                    : null
                }


            </div>
        </>
    )
}

export default EditMetaOG;