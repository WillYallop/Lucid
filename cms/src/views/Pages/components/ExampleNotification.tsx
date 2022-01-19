import React, { useContext, useEffect } from "react";
// Context
import { PageNotificationContext, PageNotificationContextNoticationsObj } from "../../../helper/Context";

const ExampleNotification = () => {

    const { notifications, setNotifications } = useContext(PageNotificationContext);
    
    useEffect(() => {
        return () => {
            setNotifications((array: Array<PageNotificationContextNoticationsObj>) => []);
        }
    }, []);

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