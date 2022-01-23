import { ReactElement } from "react"
import { NavLink } from "react-router-dom";
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
}

const ComponentRow: React.FC<ComponentRowProps> = ({ component, expanded }) => {

    let componentImg: ReactElement;
    if(component.preview_url) componentImg = <img className="componentImg" src={component.preview_url}/>
    else componentImg = <div className="componentImg componentImg--default"><FontAwesomeIcon icon={faTh}/></div>

    if(expanded) {
        return (
            <div className="blockCon componentRow componentRow__extended">
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
                    <div className="buttonCon">
                        <NavLink to={`/edit/component/${component._id}`}>
                            <button className="btnStyle1 btnStyle1--small">Edit</button>
                        </NavLink >
                        <button className="btnStyle1 btnStyle1--small btnStyle1--danger">Deregister</button>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="blockCon componentRow componentRow__standard">
                <div className="componentRow__standard__image">
                    { componentImg }
                </div>
                <div className="componentRow__standard__body">
                    <div className="componentRow__standard__body__col">
                        <p className="title">{ component.name } - <span>{ new Date(component.date_added).toLocaleDateString() }</span></p>
                        <ul>
                            <li>path: <span>{ component.file_path }</span></li>
                        </ul>
                    </div>
                    <div className="componentRow__standard__body__col layout__flex">
                        <NavLink to={`/edit/component/${component._id}`}>
                            <CoreIcon icon={faEdit}/>
                        </NavLink >
                        <CoreIcon icon={faTrashAlt} style={'warning'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ComponentRow;