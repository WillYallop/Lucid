import { useState, useEffect, useContext } from "react";
import axios from 'axios';

// Context
import { 
    PageNotificationContext, PageNotificationContextNoticationsObj,
    ModalContext
} from "../../helper/Context";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";
import ComponentList from "./Components/ComponentList";
import SidebarMeta from "../../components/Layout/Sidebar/SidebarMeta";
import SidebarButton from "../../components/Layout/Sidebar/SidebarBtn";
import RegisterComponentForm from "../../components/Modal/RegisterComponentForm";
// Functions
import getApiUri from "../../functions/getApiUri";
// Icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
            title: 'Register component',
            body: 'Configure your newly registered component.',
            element: <RegisterComponentForm/>
        });
    }

    // -------------------------------------------------------
    // Unregistered components
    // -------------------------------------------------------
    const [ unregisteredComponents, setUnregisteredComponents ] = useState<unregisteredComponentsData>(defaultUnregisteredComponents);
    const getUnregisteredComponents = () => {
        axios({
            url: getApiUri(),
            method: 'post',
            data: {
              query: `
                query {
                    components {
                        get_unregistered
                        {
                            unregistered {
                                file_name
                                file_path
                            }
                            totals {
                                unregistered
                                registered
                            }
                        }
                    }
                }`
            }
        })
        .then((result) => {
            const res: unregisteredComponentsData = result.data.data.components.get_unregistered || {};
            setUnregisteredComponents(() => {
                return {
                    ...unregisteredComponents,
                    ...res
                }
            });
            if(res.totals.unregistered > 0) {
                addNotification(`You have ${res.totals.unregistered} unregistered components!`, 'warning');
            }
        })
        .catch((err) => {
            console.log(err);
            addNotification('There was an error getting your unregistered components!', 'error');
        })
    }


    // -------------------------------------------------------
    // 
    // -------------------------------------------------------
    useEffect(() => {
        getUnregisteredComponents();
        return () => {
            setUnregisteredComponents(defaultUnregisteredComponents);
            setNotifications((array: Array<PageNotificationContextNoticationsObj>) => []);
        }
    }, []);

    // Sidebar data


    const siderbar = (
        <>
            <SidebarButton 
            text="Register Component"
            action={openAddComponentModal}
            icon={faPlus}/>
            <SidebarMeta rows={[
                {
                    key: 'Unregistered:',
                    data: unregisteredComponents.totals.unregistered
                },
                {
                    key: 'Registered:',
                    data: unregisteredComponents.totals.registered
                }
            ]}/>
        </>
    )

    return (
        <DefaultPage
        title="Components"
        body="Manage all of your components!"
        sidebar={siderbar}>
            {/* Component List */}
            <ComponentList/>
        </DefaultPage>
    );
}

export default Components;