import styles from "./Notification.module.scss";

import { useEffect } from "react";

const Notification = ({
    text = "Unknown notice",
    duration = 5,
    onDelete = () => {},
} = {}) => {
    const error =
        text.toLowerCase().includes("error") ||
        text.toLowerCase().includes("ошибка");

    useEffect(() => {
        setTimeout(onDelete, duration * 1e3);
    }, []);

    return (
        <div
            className={styles.notification}
            style={{
                backgroundColor: !error ? "#80ff80" : "#ff6666",
            }}
            onClick={onDelete}
        >
            {text}
        </div>
    );
};

export default Notification;
