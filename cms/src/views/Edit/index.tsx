import { useParams } from "react-router-dom";
// "Views"
import EditComponent from "./Mode/Component";
import EditPage from "./Mode/Page";
import Error404 from "../404";

const Edit: React.FC = () => {
    const { mode } = useParams();
    const { _id } = useParams();
    if(_id) {
        if(mode === 'component') {
            return <EditComponent _id={_id}/>
        }
        else if(mode === 'page') {
            return <EditPage _id={_id}/>
        }
        else {
            return <Error404/>
        }
    }
    else {
        return <Error404/>
    }
}

export default Edit;