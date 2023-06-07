import Notification from "./Notification";

import { useSelector } from "react-redux";
import { useEffect } from "react";

const NotificationAPI = () => {
    const notifications = useSelector((state) => state.notifications);

    useEffect(() => {
        console.log(notifications);
    }, [notifications]);

    return <Notification text={notifications[0]} />;
};

export default NotificationAPI;
