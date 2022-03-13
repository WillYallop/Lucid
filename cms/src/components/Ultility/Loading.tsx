
interface UtilityLoadingProps {
    mode: 'light'|'dark'|'transparent'
}

const UtilityLoading: React.FC<UtilityLoadingProps> = ({ mode }) => {

    return (
        <div className={`loadingSkeleton ${mode}`}></div>
    )
}

export default UtilityLoading;