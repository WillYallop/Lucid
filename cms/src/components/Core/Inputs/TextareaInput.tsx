
interface textareaInputProps {
    label: string
    value: string
    id: string
    name: string
    required: boolean
    errorMsg: string
    updateValue: (value: string) => void
}

const TextareaInput: React.FC<textareaInputProps> = ({ label, value, id, name, required, errorMsg, updateValue }) => {

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=> {
        const newValue = e.target.value;
        updateValue(newValue);
    }

    return (
        <div className="inputWrapper">
            <label htmlFor={id}>{ label }</label>
            <textarea className="inputStyle inputStyle--textarea" value={value} name={name} id={id} required={required} onChange={onChange} />
            <div className="inputError">
                <p>{ errorMsg }</p>
            </div>
        </div>
    )
}

export default TextareaInput;