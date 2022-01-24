
interface textInputProps {
    value: string
    id: string
    name: string
    required: boolean
    errorMsg: string
    updateValue: (value: string) => void
}

const TextInput: React.FC<textInputProps> = ({ value, id, name, required, errorMsg, updateValue }) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const newValue = e.target.value;
        updateValue(newValue);
    }

    return (
        <div className="inputWrapper">
            <label htmlFor={id}></label>
            <input className="inputStyle" value={value} type="text" name={name} id={id} required={required} onChange={onChange}/>
            <div className="inputError">
                <p>{ errorMsg }</p>
            </div>
        </div>
    )
}

export default TextInput;