
interface textInputProps {
    label?: string
    value: string
    id: string
    name: string
    required: boolean
    errorMsg: string
    described_by?: string
    max?: number
    min?: number
    pattern?: string
    style?: '--no-margin' | '--hide-seperator' | '--no-margin-bottom' | 'dropdown-open'
    password?: boolean
    updateValue: (value: string) => void
    autocomplete?: string
    type?: string
}

const TextInput: React.FC<textInputProps> = ({ label, value, id, name, password, required, errorMsg, updateValue, described_by, max, min, pattern, style, children, autocomplete, type }) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const newValue = e.target.value;
        updateValue(newValue);
    }

    const describedBy = (
        <div className={`describedBy`}>
            <p id={`${id}-described-by`}>{ described_by }</p>
        </div>
    )

    return (
        <div className="inputWrapper">
            { label ? <label htmlFor={id}>{ label }</label> : null }
            <input 
                aria-describedby={`${id}-described-by`} 
                className={`inputStyle ${ style ? style : '' }`} 
                value={value ? value : ''} 
                type={type ? type : 'text'} 
                name={name} 
                id={id} 
                required={required} 
                onChange={onChange}
                maxLength={max}
                minLength={min}
                pattern={pattern}
                autoComplete={ autocomplete ? autocomplete : '' } />
            <div className="inputError">
                <p>{ errorMsg }</p>
            </div>
            { 
                children 
            ?
                <> 
                    { described_by ? <div className="describedBy">{describedBy}</div> : null }
                    { children } 
                    <span className={`speratorRow ${ style ? style : '' }`}></span>
                </> 
            : 
                <> 
                    { described_by ? <><div className="describedBy">{describedBy}</div><span className={`speratorRow ${ style ? style : '' }`}></span></> : null }
                </> 
            }
        </div>
    )
}

export default TextInput;