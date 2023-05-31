import styles from "./Input.module.scss";

const InputPassword = () => {
    return (
        <div className={styles.field}>
            <i className={styles.icon + " fa fa-lock"} aria-hidden="true"></i>
            <input
                className={styles.input}
                type="password"
                placeholder="Password"
            />
        </div>
    );
};

export default InputPassword;
