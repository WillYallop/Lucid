import { ReactElement, useContext } from "react";
// Context
import { PageNotificationContext } from "../../../helper/Context";


const NotificationPopup: React.FC = () => {

    const { notifications, setNotifications } = useContext(PageNotificationContext);

    if(!notifications) return null;
    const notificationElements: Array<ReactElement> = [];
    notifications.forEach((notif) => {
        notificationElements.push(
            <div 
                className={`notificationPopupRow ${notif.type}`}
                key={notificationElements.length + 1}>
                <p>{ notif.message }</p>
            </div>
        )
    });

    return (
        <div className="notificationPopup">
            { notificationElements } 
        </div>
    )
}

export default NotificationPopup;