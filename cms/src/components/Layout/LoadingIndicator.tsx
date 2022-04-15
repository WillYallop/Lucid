import { useContext } from "react";
// Context
import { LoadingContext } from "../../helper/Context";
// Assets
import logo from '../../assets/logoIcon.svg';

const LoadingIndicator: React.FC = () => {

    const { loadingState, setLoadingState } = useContext(LoadingContext);

    if(loadingState) {
        return (
            <div className="loadingIndCon">
                <img src={logo}/>
            </div>
        )
    }
    else return null;
}

export default LoadingIndicator;