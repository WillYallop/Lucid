import { useParams, useNavigate } from "react-router-dom";
// "Views"
import EditComponent from "./Mode/Component";
import EditPage from "./Mode/Page";

const Edit: React.FC = () => {
    const { mode } = useParams();
    const { param } = useParams();
    const navigate = useNavigate();


    if(param) {
        if(mode === 'component') {
            return (
                <EditComponent _id={param}/>
            )
        }
        else if(mode === 'page') {
            return <EditPage slug={param}/>
        }
        else {
            navigate('/404');
            return null;
        }
    }
    else {
        navigate('/404');
        return null;
    }
}

export default Edit;