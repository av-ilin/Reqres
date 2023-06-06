import styles from "./Loader.module.css";

const Loader = ({
    width = 16,
    height = 16,
    top = 0,
    left = 0,
    color = "#3699ff",
    isActive = false,
}) => {
    return (
        <div
            className={styles.loader}
            style={{
                display: isActive ? "" : "none",
                width: `${width}px`,
                height: `${height}px`,
                top: `${top}px`,
                left: `${left}px`,
                "--color-loader": color,
            }}
        >
            <div className={styles.inner}></div>
            <div className={styles.inner}></div>
            <div className={styles.inner}></div>
        </div>
    );
};

export default Loader;
