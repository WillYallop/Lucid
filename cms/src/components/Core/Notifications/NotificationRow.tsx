
interface NotificationRowProps {
    message: string
    type: 'error' | 'warning' | 'success'
}

const NotificationRow: React.FC<NotificationRowProps> = ({ message, type }) => {


    return (
        <div className={`notificationRow ${type}`}>
            <p className="title">{ type }</p>
            <p className="message">{ message }</p>
        </div>  
    );
}

export default NotificationRow;