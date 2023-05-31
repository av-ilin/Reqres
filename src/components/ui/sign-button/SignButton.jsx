import styles from "./SignButton.module.scss";

const SignButton = ({ onClick }) => {
    return (
        <div className={styles.button} onClick={onClick}>
            <span>Enter</span>
            <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
        </div>
    );
};

export default SignButton;
