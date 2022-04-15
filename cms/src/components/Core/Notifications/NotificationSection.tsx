import { ReactElement, useContext } from "react";
// Components
import NotificationRow from "./NotificationRow";
// Context
import { PageNotificationContext } from "../../../helper/Context";

const NotificationSection: React.FC = () => {
    const { notifications, setNotifications } = useContext(PageNotificationContext);

    if(!notifications) return null;

    const notificationElements: Array<ReactElement> = [];
    notifications.forEach((notif) => {
        notificationElements.push(<NotificationRow key={notificationElements.length + 1} message={notif.message} type={notif.type}/>)
    });
    
    if(notifications.length) {
        return (
            <div className="notificationContainer">
                { notificationElements }
            </div>
        )
    }
    else {
        return null;
    }
}

export default NotificationSection;