import { useState, useEffect, useContext } from "react";
// Context
import { 
    PageNotificationContext, PageNotificationContextNoticationsObj,
    ModalContext,
    LoadingContext
} from "../../helper/Context";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";
import ComponentList from "./Components/ComponentList";
import SidebarMeta from "../../components/Layout/Sidebar/SidebarMeta";
import SidebarButton from "../../components/Layout/Sidebar/SidebarBtn";
import RegisterComponentForm from "./Components/RegisterComponentForm";
import SidebarLayout from "../../components/Layout/Sidebar/SidebarLayout";
// Functions
import getApiUrl from "../../functions/getApiUrl";
// Icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// data
import { getUnregisteredComponents } from '../../data/components';


interface unregisteredComponentsData {
    totals: {
        unregistered: number
        registered: number
    }
    unregistered: Array<{
        file_name: string
        path_name: string
    }>
}
const defaultUnregisteredComponents: unregisteredComponentsData = {
    totals: {
        unregistered: 0,
        registered: 0
    },
    unregistered: []
}


const Components: React.FC = () => {
    const { loadingState, setLoadingState } = useContext(LoadingContext);

    // -------------------------------------------------------
    // Notification 
    // -------------------------------------------------------
    const { notifications, setNotifications } = useContext(PageNotificationContext);
    const addNotification = (message: string, type: 'error' | 'warning' | 'success') => {
        setNotifications((array: Array<PageNotificationContextNoticationsObj>) => [
            ...array,
            {
                message: message,
                type: type
            }
        ]);
    }

    // -------------------------------------------------------
    // Modal 
    // -------------------------------------------------------
    const { modalState, setModalState } = useContext(ModalContext);
    const openAddComponentModal = () => {
        setModalState({
            ...modalState,
            state: true,
            title: 'register a component',
            size: 'standard',
            body: 'configure your newly registered component.',
            element: <RegisterComponentForm/>
        });
    }

    // -------------------------------------------------------
    // Unregistered components
    // -------------------------------------------------------
    const [ unregisteredComponents, setUnregisteredComponents ] = useState<unregisteredComponentsData>(defaultUnregisteredComponents);
    const getUnregisteredComponentsHandler = () => {
        setLoadingState(true);
        getUnregisteredComponents({
            __args: {},
            unregistered: {
                file_name: true,
                file_path: true
            },
            totals: {
                unregistered: true,
                registered: true
            }
        },
        (response) => {
            const res: unregisteredComponentsData = response.data.data.components.get_unregistered || {};
            setUnregisteredComponents(() => {
                return {
                    ...unregisteredComponents,
                    ...res
                }
            });
            if(res.totals.unregistered > 0) {
                addNotification(`you have ${res.totals.unregistered} unregistered components!`, 'warning');
            }
            setLoadingState(false);
        },
        () => {
            addNotification('there was an error getting your unregistered components!', 'error');
        })
    }

    // -------------------------------------------------------
    //  Layout Expand - TODO - make persistent
    // -------------------------------------------------------
    const [ componentLayoutExpanded, setComponentLayoutExpanded ] = useState(false);


    // -------------------------------------------------------
    // 
    // -------------------------------------------------------
    useEffect(() => {
        getUnregisteredComponentsHandler();
        return () => {
            setUnregisteredComponents(defaultUnregisteredComponents);
            setNotifications((array: Array<PageNotificationContextNoticationsObj>) => []);
        }
    }, []);

    // Sidebar data
    const sidebarMetaData = [
        {
            key: 'unregistered:',
            data: unregisteredComponents.totals.unregistered
        },
        {
            key: 'registered:',
            data: unregisteredComponents.totals.registered
        }
    ];

    const siderbar = (
        <>
            { 
                unregisteredComponents.totals.unregistered > 0
                ?
                <SidebarButton 
                    text="register a component"
                    action={openAddComponentModal}
                    icon={faPlus}/>
                : null
            }

            <SidebarLayout
            title="layout">
                <button 
                    className={`btnStyle1 typography__left ${ componentLayoutExpanded ? 'btnStyle1--not-active' : '' }`}
                    style={{marginBottom: '5px'}}
                    onClick={() => setComponentLayoutExpanded(false)}>
                    compact
                </button>
                <button 
                    className={`btnStyle1 typography__left ${ !componentLayoutExpanded ? 'btnStyle1--not-active' : '' }`}
                    onClick={() => setComponentLayoutExpanded(true)}>
                    expanded
                </button>
            </SidebarLayout>
            <SidebarMeta rows={sidebarMetaData}/>
        </>
    )

    return (
        <DefaultPage
        title="components"
        body="manage all of your components!"
        sidebar={siderbar}>
            {/* Component List */}
            <ComponentList
            expanded={componentLayoutExpanded}/>
        </DefaultPage>
    );
}

export default Components;