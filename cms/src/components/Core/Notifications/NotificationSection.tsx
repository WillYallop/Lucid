import { ReactElement, useContext } from "react";
// Components
import NotificationRow from "./NotificationRow";

const NotificationSection: React.FC = () => {

    // if(!notifications) return null;

    // const notificationElements: Array<ReactElement> = [];
    // notifications.forEach((notif) => {
    //     notificationElements.push(<NotificationRow key={notifications.length + 1} message={notif.message} type={notif.type}/>)
    // });

    return (
        <div className="notificationContainer">
            {/* { notificationElements } */}
        </div>
    );
}

export default NotificationSection;