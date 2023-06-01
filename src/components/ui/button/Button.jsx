import styles from "./Button.module.scss";

const Button = ({
    text = "Enter",
    bgColor = "black",
    textColor = "white",
    onClick = () => {},
}) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            {text}
        </button>
    );
};

export default Button;
