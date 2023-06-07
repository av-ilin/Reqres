import styles from "./Notification.module.scss";

const Notification = ({ text = "Unknown notice", success = true } = {}) => {
    return (
        <div
            className={styles.notification}
            style={{
                backgroundColor: success
                    ? "lighten(green, 20%)"
                    : "lighten(red, 20%)",
            }}
        >
            {text}
        </div>
    );
};

export default Notification;
