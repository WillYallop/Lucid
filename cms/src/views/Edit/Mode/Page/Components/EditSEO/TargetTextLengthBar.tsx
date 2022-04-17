import { useEffect } from "react"

interface targetTextLengthBarProps {
    max: number
    min: number
    length: number
    target: number
}

const TargetTextLengthBar: React.FC<targetTextLengthBarProps> = ({ max, min, length, target }) => {
    return (
        <div className={`targetTextLengthBar ${ length === 0 ? 'outofbounds' : '' }`}>
            <span className={`inner 
                ${ length < min ? 'outofbounds' : '' } 
                ${ length > max ? 'outofbounds' : '' } 
                ${ length >= Math.abs(min - target) && length <= (max - Math.abs(max - target)) ? 'sweetzone' : '' }
            `}
                style={{ width: `${(100 * length) / max}%` }}></span>
        </div>
    )
}

export default TargetTextLengthBar;