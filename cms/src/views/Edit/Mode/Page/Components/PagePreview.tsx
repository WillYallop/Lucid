// Components
import { useEffect, useState } from "react";
import WidthScrollBar from "./WidthScrollbar";
import { useNavigate } from "react-router-dom";

const PagePreview: React.FC = () => {

    const navigate = useNavigate();

    // ---------------------------------------------------------------------/
    // - IDS ---------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const iframeConID = 'iframeConID';
    const iframeID = 'sitePreviewFrame';

    

    // ---------------------------------------------------------------------/
    // - STATE -------------------------------------------------------------/
    // ---------------------------------------------------------------------/
    const [ srcDoc, setSrcDoc ] = useState('');



    // ---------------------------------------------------------------------/
    // - Iframe Custom Actions ---------------------------------------------/
    // ---------------------------------------------------------------------/
    const iframeLinkClickHandler = (e: Event) => {
        // Check to see if the link is local or external
        // --
        // If its a local path, we grab the slug from it, and attach an event listenr to navigate to that pages edit route in the CMS
        // --
        // Else we attach an event that will fire a popup in the CMS telling the user that they cannot navigate to an external URL while editing the page
        e.preventDefault();
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
                if(action === 'create') links[i].addEventListener('click', iframeLinkClickHandler);
                else links[i].removeEventListener('click', iframeLinkClickHandler);
            }
        }
    }



    // Create
    useEffect(() => {
        // Temp
        setSrcDoc(`<div>
            <h1>Page</h1>
            <a href="/about">About</a>           
            <a href="https://williamyallop.com">William Yallop Portfolio</a> 
        </div>`);
        return () => {
            iframeLinkEventHandler('destroy');
        }
    }, []);



    return (
        <>
            <WidthScrollBar 
                updateValue={(value) => {
                    let iframeConEle = document.getElementById(iframeConID) as HTMLElement;
                    iframeConEle.style.width = `${value}%`; 
                }}
                iframeContainerID={iframeConID}/>
            <div id={iframeConID} className="iframeContainer">
                <iframe id={iframeID} srcDoc={srcDoc} onLoad={() => { iframeLinkEventHandler('create') }}></iframe>
            </div>
        </>
    )
}

export default PagePreview;