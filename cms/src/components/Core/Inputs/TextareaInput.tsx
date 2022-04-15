
interface textareaInputProps {
    label?: string
    value: string
    id: string
    name: string
    required: boolean
    errorMsg: string
    described_by?: string
    max?: number
    min?: number
    style?: '--no-margin' | '--no-margin-bottom' | 'dropdown-open'
    updateValue: (value: string) => void
}

const TextareaInput: React.FC<textareaInputProps> = ({ label, value, id, name, required, errorMsg, updateValue, described_by, max, min, style, children }) => {

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=> {
        const newValue = e.target.value;
        updateValue(newValue);
    }

    const describedBy = (
        <div className="describedBy">
            <p id={`${id}-described-by`}>{ described_by }</p>
        </div>
    )

    return (
        <div className="inputWrapper">
            { label ? <label htmlFor={id}>{ label }</label> : null }
            <textarea 
                aria-describedby={`${id}-described-by`} 
                className={`inputStyle inputStyle--textarea ${ style ? style : '' }`} 
                value={value} 
                name={name} 
                id={id} 
                required={required} 
                onChange={onChange} 
                maxLength={max}
                minLength={min}/>
            <div className={`inputError ${ style ? style : '' }`}>
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

export default TextareaInput;