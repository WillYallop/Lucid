import { useParams, useNavigate } from "react-router-dom";
// "Views"
import EditComponent from "./Mode/Component";
import EditPage from "./Mode/Page";

const Edit: React.FC = () => {
    const { mode } = useParams();
    const { _id } = useParams();
    const navigate = useNavigate();


    if(_id) {
        if(mode === 'component') {
            return (
                <EditComponent _id={_id}/>
            )
        }
        else if(mode === 'page') {
            return <EditPage _id={_id}/>
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