import React, { useContext } from "react";
// Context
import { PageNotificationContext, PageNotificationContextNoticationsObj } from "../../../helper/Context";

const ExampleNotification = () => {

    const { notifications, setNotifications } = useContext(PageNotificationContext);
    
    const addWarning = () => {
        setNotifications((array: Array<PageNotificationContextNoticationsObj>) => [
            ...array,
            {
                message: 'This is an example',
                type: 'warning'
            }
        ]);
    }

    return (
        <div>
            <button onClick={() => addWarning()}>TEMP ADD FALSE WARNING</button>
        </div>
    )
}

export default ExampleNotification;