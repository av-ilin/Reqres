import styles from "./SignInput.module.scss";

const InputPassword = ({ onChange }) => {
    return (
        <div className={styles.field}>
            <i className={styles.icon + " fa fa-lock"} aria-hidden="true"></i>
            <input
                className={styles.input}
                type="password"
                placeholder="Password"
                onChange={onChange}
            />
        </div>
    );
};

export default InputPassword;
