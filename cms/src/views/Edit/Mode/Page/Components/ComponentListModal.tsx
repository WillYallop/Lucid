import React, { useEffect, useState } from 'react';
import axios from "axios";
// Components
import ComponentRow from '../../../../Components/Components/ComponentRow';
// Fumction
import getApiUrl from '../../../../../functions/getApiUrl';


interface componentListModalProps {
    addComponentCallback: (component: mod_componentModel) => void
}

const ComponentListModal: React.FC<componentListModalProps> = ({ addComponentCallback }) => {

    // -------------------------------------------------------
    // Components
    // -------------------------------------------------------
    let [ skip, limit ] = [ 0 , 50 ];
    const [ components, setComponents ] = useState<Array<mod_componentModel>>([]);
    const [ showLoadMore, setShowLoadMore ] = useState(false);

    const getAllComponents = (s: number, l: number) => {
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
              query: `
                query {
                    components {
                        get_multiple ( skip: ${s}, limit: ${l} )
                        {
                            _id
                            name
                            description
                            preview_url
                            date_added
                            file_path
                        }
                    }
                }`
            }
        })
        .then((result) => {
            const allComponents: Array<mod_componentModel> = result.data.data.components.get_multiple || [];
            if(allComponents.length < limit) setShowLoadMore(false);
            else setShowLoadMore(true);
            setComponents((components) => [
                ...components,
                ...allComponents
            ]);
        })
        .catch((err) => {
            // addNotification('There was an error getting your components!', 'error');
        })
    }

    // Create results array
    const componentRows: Array<React.ReactElement> = [];
    if(components.length) {
        components.forEach((component) => {
            componentRows.push(<ComponentRow key={component._id} component={component} expanded={false} clickCallback={() => { addComponentCallback(component) }}/>)
        });
    } 

    // Load more
    const loadmore = () => {
        skip += components.length;
        getAllComponents(skip, limit);
    }

    useEffect(() => {
        getAllComponents(skip, limit);
        return () => {
            setComponents([]);
            setShowLoadMore(true);
        }
    }, [])



    return (
        <div className="body">
            { componentRows }
            { showLoadMore ? <button className='btnStyle1' onClick={loadmore}>load more</button> : null }
        </div>
    )
}

export default ComponentListModal;