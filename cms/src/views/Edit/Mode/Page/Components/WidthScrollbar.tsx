import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Icons
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';

interface widthScrollbarProps {
    updateValue: (width: number) => void
    iframeContainerID?: string
}

const WidthScrollBar: React.FC<widthScrollbarProps> = ({ updateValue, iframeContainerID }) => {


    // IDS
    const scrollbarEleID = 'widthScrollBarID';
    const leftBtnID = 'leftDragBtnID';
    const rightBtnID = 'rightDragBtnID';

    // State
    const [ pageWidth, setPageWidth ] = useState(0);
    const [ activeSide, setActiveSide ] = useState('');
    const [ mouseDown, setMouseDown ] = useState(false);

    // Elements
    const scrollbarEle = document.getElementById(scrollbarEleID) as HTMLElement;
    const leftBtnEle = document.getElementById(leftBtnID) as HTMLElement;
    const rightBtnEle = document.getElementById(rightBtnID) as HTMLElement;
    
    // Button move handler
    const barUpdateButtonPosHandler = (e: React.MouseEvent) => {
        const scrollbarEle = document.getElementById(scrollbarEleID) as HTMLElement;
        const rect = scrollbarEle.getBoundingClientRect();

        // Mouse move handler
        const updateBtnPos = (pos: number) => {
            const scrollbarWidth = scrollbarEle.offsetWidth;
            let buttonPosPercent = (100 * pos) / scrollbarWidth;
            leftBtnEle.style.left = `${buttonPosPercent}%`;
            rightBtnEle.style.right = `${buttonPosPercent}%`;
            
            // Return page percentage with callback
            const maxRangeSlide = (scrollbarEle.offsetWidth / 2) - rightBtnEle.offsetWidth;
            let percent = (100 * pos) / maxRangeSlide;
            percent = 100 - percent;
            if(percent >= 100) {
                percent = 100;
            }
            updateValue(percent);
            let pageWidth = Math.ceil(scrollbarEle.offsetWidth * (percent / 100));
            setPageWidth(pageWidth);
        }

        let mousePos: number;
        if((e.clientX - rect.left) > (scrollbarEle.offsetWidth / 2)) {
            // Right side 
            mousePos = Math.abs((e.clientX - rect.right)) - (rightBtnEle.offsetWidth / 2);
            if(mousePos >= 0 && mousePos <= (scrollbarEle.offsetWidth / 2) - ((rightBtnEle.offsetWidth / 2) + 50)) updateBtnPos(mousePos);
        }
        else {
            // Left side
            mousePos = (e.clientX - rect.left) - (leftBtnEle.offsetWidth / 2);
            if(mousePos >= 0 && mousePos <= (scrollbarEle.offsetWidth / 2) - ((leftBtnEle.offsetWidth / 2) + 50)) updateBtnPos(mousePos);
        }
    }

    // Button events
    const mouseDownHandler = (e: React.MouseEvent, side: 'left' | 'right') => {
        setMouseDown(true);
        setActiveSide(side);
    }
    const mouseUpHandler = (e: React.MouseEvent) => {
        setMouseDown(false);
    }
    const mouseMoveHandler = (e: React.MouseEvent) => {
        if(mouseDown) barUpdateButtonPosHandler(e);
    }


    const windowResize = function () {
        if(iframeContainerID) {
            const scrollbarEle = document.getElementById(iframeContainerID) as HTMLElement;
            setPageWidth(scrollbarEle.offsetWidth);
        }
    }

    useEffect(() => {
        const scrollbarEle = document.getElementById(scrollbarEleID) as HTMLElement;
        setPageWidth(scrollbarEle.offsetWidth);
        window.addEventListener('resize', windowResize);

        return () => {
            window.removeEventListener('resize', windowResize);
        }
    }, []);

    return (
        <div 
            id={scrollbarEleID} 
            className="widthScrollbar" 
            onMouseMove={(e) => mouseMoveHandler(e)} 
            onClick={(e) => barUpdateButtonPosHandler(e)}>
            <button id={leftBtnID}
                className="left" 
                onMouseDown={(e) => mouseDownHandler(e, 'left')}
                onMouseUp={(e) => mouseUpHandler(e)}>
                <FontAwesomeIcon icon={faGripLinesVertical}/>
            </button>

            <div className="pageSize">
                <p>{pageWidth}px</p>
            </div>

            <div className="markers">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <button id={rightBtnID}
                className="right" 
                onMouseDown={(e) => mouseDownHandler(e, 'right')}
                onMouseUp={(e) => mouseUpHandler(e)}>
                <FontAwesomeIcon icon={faGripLinesVertical}/>
            </button>
        </div>
    )
}

export default WidthScrollBar;