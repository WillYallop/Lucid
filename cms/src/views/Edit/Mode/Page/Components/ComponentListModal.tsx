import React, { useEffect, useState } from 'react';
// Components
import ComponentRow from '../../../../Components/Components/ComponentRow';
// data
import { getMultipleComponents } from '../../../../../data/components';


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

        getMultipleComponents({
            __args: {
                skip: s, 
                limit: l
            },
            _id: true,
            name: true,
            file_name: true,
            file_path: true,
            description: true,
            preview_url: true,
            date_added: true,
            date_modified: true,
            content_types: {
                _id: true,
                name: true,
                type: true,
                parent: true,
                config: {
                    min: true,
                    max: true,
                    default: true,
                }
            }
        },
        (response) => {
            const allComponents: Array<mod_componentModel> = response.data.data.components.get_multiple || [];
            if(allComponents.length < limit) setShowLoadMore(false);
            else setShowLoadMore(true);
            setComponents((components) => [
                ...components,
                ...allComponents
            ]);
        },
        (err) => {
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