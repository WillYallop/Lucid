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
    
    // Mouse click handler
    const barClickHandler = (e: React.MouseEvent) => {
        const scrollbarEle = document.getElementById(scrollbarEleID) as HTMLElement;
        const rect = scrollbarEle.getBoundingClientRect();
        const tempMousePos = (e.clientX - rect.left) - (leftBtnEle.offsetWidth / 2);
        if(tempMousePos >= 0 && tempMousePos <= (scrollbarEle.offsetWidth / 2) - ((leftBtnEle.offsetWidth / 2) + 50)) updateBtnPos(tempMousePos);
    }
    // Mouse down handler
    const mouseDownHandler = (e: React.MouseEvent, side: 'left' | 'right') => {
        setMouseDown(true);
        setActiveSide(side);
    }
    // Mouse up handler
    const mouseUpHandler = (e: React.MouseEvent) => {
        setMouseDown(false);
    }
    // Mouse move handler
    const updateBtnPos = (pos: number) => {
        const maxRangeSlide = scrollbarEle.offsetWidth;
        let percent = (100 * pos) / maxRangeSlide;
        leftBtnEle.style.left = `${percent}%`;
        rightBtnEle.style.right = `${percent}%`;
        workoutPageWidth(pos);
    }
    const mouseMoveHandler = (e: React.MouseEvent) => {
        if(mouseDown) {
            const rect = scrollbarEle.getBoundingClientRect();
            let mousePos: number;
            if(activeSide == 'left') {
                mousePos = (e.clientX - rect.left) - (leftBtnEle.offsetWidth / 2);
                if(mousePos >= 0 && mousePos <= (scrollbarEle.offsetWidth / 2) - ((leftBtnEle.offsetWidth / 2) + 50)) updateBtnPos(mousePos);
            }
            else {
                mousePos = Math.abs((e.clientX - rect.right)) - (rightBtnEle.offsetWidth / 2);
                if(mousePos >= 0 && mousePos <= (scrollbarEle.offsetWidth / 2) - ((rightBtnEle.offsetWidth / 2) + 50)) updateBtnPos(mousePos);
            }
        }
    }
    // Return page percentage with callback
    const workoutPageWidth = (pos: number) => {
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
            onClick={(e) => barClickHandler(e)}>
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