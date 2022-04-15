
interface numberInputProps {
    label?: string
    value: number
    id: string
    name: string
    required: boolean
    errorMsg: string
    described_by?: string
    max?: number
    min?: number
    pattern?: string
    style?: '--no-margin'
    updateValue: (value: number) => void
}

const NumberInput: React.FC<numberInputProps> = ({ label, value, id, name, required, errorMsg, updateValue, described_by, max, min, pattern, style, children }) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const newValue = e.target.value;
        updateValue(parseInt(newValue));
    }

    const describedBy = (
        <div className="describedBy">
            <p id={`${id}-described-by`}>{ described_by }</p>
        </div>
    )

    return (
        <div className="inputWrapper">
            { label ? <label htmlFor={id}>{ label }</label> : null }
            <input 
            aria-describedby={`${id}-described-by`} 
            className={`inputStyle inputStyle--number ${ style ? style : '' }`} 
            value={value} 
            type="number" 
            name={name} 
            id={id} 
            required={required} 
            onChange={onChange}
            max={max}
            min={min}
            pattern={pattern}/>
            <div className="inputError">
                <p>{ errorMsg }</p>
            </div>
            { 
                children 
            ?
                <> 
                    { described_by ?  <div className="describedBy">{describedBy}</div> : null }
                    { children } 
                    <span className="speratorRow"></span>
                </> 
            : 
                <> 
                    { described_by ? <><div className="describedBy">{describedBy}</div><span className="speratorRow"></span></> : null }
                </> 
            }
        </div>
    )
}

export default NumberInput;