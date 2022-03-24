import { ReactElement } from "react"
import { NavLink, useNavigate } from "react-router-dom";
// Components
import CoreIcon from "../../../components/Core/Icon";
// Icons
import { faTh, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ComponentRowProps {
    component: {
        date_added: string
        description: string
        name: string
        preview_url: string
        _id: string
        file_path: string
    },
    expanded: boolean
    clickCallback?: () => void
}

const ComponentRow: React.FC<ComponentRowProps> = ({ component, expanded, clickCallback }) => {

    const navigate = useNavigate();

    let componentImg: ReactElement;
    if(component.preview_url) componentImg = <img className="componentImg" src={component.preview_url}/>
    else componentImg = <div className="componentImg componentImg--default"><FontAwesomeIcon icon={faTh}/></div>

    if(expanded) {
        return (
            <div className="blockCon componentRow componentRow__extended"
                onClick={() => {
                    if(clickCallback !== undefined) clickCallback();
                    else navigate(`/edit/component/${component._id}`);
                }}>
                <div className="componentRow__extended__image">
                    { componentImg }
                </div>
                <div className="componentRow__extended__body">
                    <p className="title">{ component.name }</p>
                    <p className="description">{ component.description }</p>
                    <ul>
                        <li>added: <span>{ new Date(component.date_added).toLocaleDateString() }</span></li>
                        <li>path: <span>{ component.file_path }</span></li>
                    </ul>
                    {
                        clickCallback === undefined ?
                        <div className="buttonCon">
                            <NavLink to={`/edit/component/${component._id}`}>
                                <button className="btnStyle1 btnStyle1--auto-width">edit</button>
                            </NavLink >
                            <button className="btnStyle1 btnStyle1--auto-width btnStyle1--danger">deregister</button>
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="blockCon componentRow componentRow__standard"
                onClick={() => {
                    if(clickCallback !== undefined) clickCallback();
                    else navigate(`/edit/component/${component._id}`);
                }}>
                <div className="componentRow__standard__image">
                    { componentImg }
                </div>
                <div className="componentRow__standard__body">
                    <div className="componentRow__standard__body__col">
                        <p className="title">{ component.name } - <span>{ component.file_path }</span></p>
                        <ul>
                            <li>created: <span>{ new Date(component.date_added).toLocaleDateString() }</span></li>
                        </ul>
                    </div>
                    {
                        clickCallback === undefined ?
                        <div className="componentRow__standard__body__col layout__flex">
                            <NavLink to={`/edit/component/${component._id}`}>
                                <CoreIcon icon={faEdit} style={'transparent'}/>
                            </NavLink>
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default ComponentRow;