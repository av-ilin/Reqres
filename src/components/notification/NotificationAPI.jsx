import Notification from "./Notification";

import { useSelector } from "react-redux";
import { useEffect } from "react";

const NotificationAPI = () => {
    const notifications = useSelector((state) => state.notifications);

    useEffect(() => {
        console.log(notifications);
    }, [notifications]);

    return <Notification />;
};

export default NotificationAPI;
