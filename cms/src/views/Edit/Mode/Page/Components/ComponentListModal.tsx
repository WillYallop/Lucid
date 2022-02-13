import React, { useEffect, useState } from 'react';
import axios from "axios";
// Components
import ComponentRow from '../../../../Components/Components/ComponentRow';
// Fumction
import getApiUrl from '../../../../../functions/getApiUrl';


interface componentListModalProps {
    addComponentCallback: (component: mod_pageModelComponent) => void
}

const ComponentListModal: React.FC<componentListModalProps> = ({ addComponentCallback }) => {

    // -------------------------------------------------------
    // Components
    // -------------------------------------------------------
    let [ skip, limit ] = [ 0 , 50 ];
    const [ components, setComponents ] = useState<Array<mod_pageModelComponent>>([]);
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
                            file_name
                            file_path
                            description
                            preview_url
                            date_added
                            date_modified
                            content_types {
                                _id
                                name
                                type
                                parent
                                config {
                                    min
                                    max
                                    default
                                }
                            }
                        }
                    }
                }`
            }
        })
        .then((result) => {
            const allComponents: Array<mod_pageModelComponent> = result.data.data.components.get_multiple || [];
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