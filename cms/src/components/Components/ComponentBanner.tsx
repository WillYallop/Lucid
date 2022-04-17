import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Icons
import { faTh } from '@fortawesome/free-solid-svg-icons';

interface largeComponentRowProps {
    component: mod_componentModel
}

const ComponentBanner: React.FC<largeComponentRowProps> = ({ component }) => {
    if(component != undefined) {
        return (
            <div className='componentRowBanner blockCon'>
                <div className="imgCon">
                    {
                        component.preview_url ?
                        <img src={component.preview_url}/>
                        : 
                        <FontAwesomeIcon icon={faTh}/>
                    }
                </div>
                <div className='textarea'>
                    <h2>{ component.name }</h2>
                    { component.description ? <p>{ component.description }</p> : null }
                </div>
            </div>
        )
    } 
    else {
        return (
            <></>
        )
    }
}

export default ComponentBanner;