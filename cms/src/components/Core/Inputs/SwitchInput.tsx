interface SwitchInputProps {
    state: boolean
    setState: (state: boolean) => void
}

const SwitchInput: React.FC<SwitchInputProps> = ({ state, setState }) => {
    return (
        <div onClick={() => setState(!state)} className={`switchInput ${ state ? 'active' : '' }`}></div>
    )
}

export default SwitchInput;