import React from "react"

interface textareaInputProps {
    label?: string
    value: string
    id: string
    name: string
    required: boolean
    errorMsg: string
    options: Array<string>
    described_by?: string
    style?: '--no-margin'
    updateValue: (value: string) => void
}

const SelectInput: React.FC<textareaInputProps> = ({ label, value, id, name, required, errorMsg, updateValue, options, described_by, style }) => {

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>)=> {
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
            <select aria-describedby={`${id}-described-by`} className={`inputStyle inputStyle--select ${style}`} value={value} name={name} id={id} required={required} onChange={onChange}>
                {options.map((val, index) => <option value={val} key={index}>{val}</option>)}
            </select>
            <div className="inputError">
                <p>{ errorMsg }</p>
            </div>
            { described_by ?  describedBy : null }
        </div>
    )
}

export default SelectInput;