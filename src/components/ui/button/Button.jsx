import styles from "./Button.module.scss";

const Button = ({
    text = "Enter",
    bgColor = "black",
    textColor = "white",
    disabled = false,
    onClick = () => {},
}) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={{ backgroundColor: bgColor, color: textColor }}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
