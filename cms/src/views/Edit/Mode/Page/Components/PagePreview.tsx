// Components
import { useState } from "react";
import WidthScrollBar from "./WidthScrollbar";

const PagePreview: React.FC = () => {
    
    // IDS
    const IframeConID = 'iframeConID';

    const setIframeContent = `<p>hello</p>`;

    return (
        <>
            <WidthScrollBar 
                updateValue={(value) => {
                    let iframeConEle = document.getElementById(IframeConID) as HTMLElement;
                    iframeConEle.style.width = `${value}%`; 
                }}
                iframeContainerID={IframeConID}/>
            <div id={IframeConID} className="iframeContainer">
                <iframe srcDoc={setIframeContent} sandbox=""></iframe>
            </div>
        </>
    )
}

export default PagePreview;