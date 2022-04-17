import { useContext } from "react";
// Context
import { LoadingContext } from "../../helper/Context";
// Assets
import loadingGif from '../../assets/loadingInd.gif';

const LoadingIndicator: React.FC = () => {

    const { loadingState, setLoadingState } = useContext(LoadingContext);

    if(loadingState) {
        return (
            <div className="loadingIndCon">
                <img src={loadingGif} />
            </div>
        )
    }
    else return null;
}

export default LoadingIndicator;