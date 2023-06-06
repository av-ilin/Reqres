import styles from "./Button.module.scss";

const Button = ({
    text = "Enter",
    bgColor = "black",
    textColor = "white",
    width = 108,
    height = 34,
    disabled = false,
    onClick = () => {},
    dlcStyles = {},
}) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={{
                backgroundColor: bgColor,
                color: textColor,
                width: `${width}px`,
                height: `${height}px`,

                ...dlcStyles,
            }}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
