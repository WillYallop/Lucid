import { useEffect, useState, useContext } from "react";
// Components
import WidthScrollBar from "./WidthScrollbar";
import { useNavigate } from "react-router-dom";
import UtilityLoading from "../../../../../components/Ultility/Loading";
// Context
import { PageMarkupContext, PageContext } from '../functions/PageContext';

interface pagePreviewPops {
    loading: boolean
}

const PagePreview: React.FC<pagePreviewPops> = ({ loading }) => {

    const navigate = useNavigate();

    // ---------------------------------------------------------------------/
    // - IDS ---------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const iframeConID = 'iframeConID';
    const iframeID = 'sitePreviewFrame';
    

    // ---------------------------------------------------------------------/
    // - STATE -------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const [ markup, setMarkup ] = useState('');
    const { markupObj, setMarkupObj } = useContext(PageMarkupContext);
    const { page, setPage } = useContext(PageContext);

    // ---------------------------------------------------------------------/
    // - DATA --------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const buildPageMarkup = () => {
        if(markupObj != undefined && page != undefined) {
            if(markupObj.template.length) {
                let template: string = JSON.parse(markupObj.template);
                let components = '';
                if(page.page_components) {
                    // Filter over components in their order
                    page.page_components.sort((a,b) => a.position - b.position);
                    page.page_components.forEach((pageComp) => {
                        const findMarkup = markupObj.components.find( x => x.page_component_id === pageComp._id );
                        if(findMarkup != undefined) components+=JSON.parse(findMarkup.markup);
                    });
                }
                template = template.replace('<lucidPreviewAddComponents/>', components);
                setMarkup(template);
            }
        }
    }


    // ---------------------------------------------------------------------/
    // - Iframe Custom Actions ---------------------------------------------/
    // ---------------------------------------------------------------------/
    const iframeLinkClickHandler = (e: Event) => {
        e.preventDefault();
        // Check to see if the link is local or external
        // --
        // If its a local path, we grab the slug from it, and attach an event listenr to navigate to that pages edit route in the CMS
        // --
        // Else we attach an event that will fire a popup in the CMS telling the user that they cannot navigate to an external URL while editing the page
        let target = e.currentTarget as HTMLAnchorElement;
        if(target.host !== window.location.host) {
            alert('This is an external link, you cannot navigate to this while editing this page.');
        }
        else {
            // Check the API that a page of this slug exists before navigating to it.
            // Else display a message saying we cannot navigate away from the page while editing it.
            let href = target.href;
            let slug = href.split('/').filter((el) => { 
                return el.trim().length > 0; 
            }).pop();
            navigate(`/edit/page/${slug}`);
        }
    }
    const iframeLinkEventHandler = (action: 'create' | 'destroy') => {
        const myIFrame = document.getElementById(iframeID) as HTMLIFrameElement;
        if(myIFrame && myIFrame.contentWindow) {
            const links = myIFrame.contentWindow.document.getElementsByTagName("a");
            for (let i = 0; i < links.length; i++) {
                if(action === 'create') links[i].addEventListener('click', iframeLinkClickHandler, false);
                else links[i].removeEventListener('click', iframeLinkClickHandler, false);
            }
        }
    }


    // Create
    useEffect(() => {
        buildPageMarkup();

        return () => {
            iframeLinkEventHandler('destroy');
            setMarkup('');
        }
    }, [markupObj]);


    return (
        <div className="pagePreviewCon">
            <WidthScrollBar 
                updateValue={(value) => {
                    let iframeConEle = document.getElementById(iframeConID) as HTMLElement;
                    iframeConEle.style.width = `${value}%`; 
                }}
                iframeContainerID={iframeConID}/>
            <div id={iframeConID} className="iframeContainer">
                <iframe id={iframeID} srcDoc={markup} onLoad={() => { iframeLinkEventHandler('create') }}></iframe>
            </div>
            {
                loading ?
                    <div className="pagePreviewLoadingCon">
                        <UtilityLoading mode="transparent"/>
                    </div>
                : null
            }
        </div>
    )
}

export default PagePreview;