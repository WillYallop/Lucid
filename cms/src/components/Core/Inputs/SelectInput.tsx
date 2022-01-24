import React from "react"

interface textareaInputProps {
    label: string
    value: string
    id: string
    name: string
    required: boolean
    errorMsg: string
    options: Array<string>
    updateValue: (value: string) => void
}

const SelectInput: React.FC<textareaInputProps> = ({ label, value, id, name, required, errorMsg, updateValue, options }) => {

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>)=> {
        const newValue = e.target.value;
        updateValue(newValue);
    }

    return (
        <div className="inputWrapper">
            <label htmlFor={id}>{ label }</label>
            <select className="inputStyle inputStyle--select" value={value} name={name} id={id} required={required} onChange={onChange}>
                {options.map((val) => <option value={val} >{val}</option>)}
            </select>
            <div className="inputError">
                <p>{ errorMsg }</p>
            </div>
        </div>
    )
}

export default SelectInput;