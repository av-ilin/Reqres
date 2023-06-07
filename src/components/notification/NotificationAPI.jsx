import styles from "./Notification.module.scss";

import Notification from "./Notification";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const NotificationAPI = () => {
    const notifications = useSelector((state) => state.notifications);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(notifications);
    }, [notifications]);

    function onDelete(id) {
        return function () {
            dispatch({ type: "REMOVE_NOTICE", payload: id });
        };
    }

    return (
        <div className={styles.container}>
            {notifications.map((notice) => (
                <Notification
                    key={notice.id}
                    text={notice.message}
                    onDelete={onDelete(notice.id)}
                />
            ))}
        </div>
    );
};

export default NotificationAPI;
