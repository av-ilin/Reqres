import styles from "./Input.module.scss";

const InputEmail = () => {
    return (
        <div className={styles.field}>
            <i className={styles.icon + " fa fa-user"} aria-hidden="true"></i>
            <input className={styles.input} type="email" placeholder="Email" />
        </div>
    );
};

export default InputEmail;
