import styles from "./SignInput.module.scss";

const InputEmail = ({ onChange }) => {
    return (
        <div className={styles.field}>
            <i className={styles.icon + " fa fa-user"} aria-hidden="true"></i>
            <input
                className={styles.input}
                type="email"
                placeholder="Email"
                onChange={onChange}
            />
        </div>
    );
};

export default InputEmail;
