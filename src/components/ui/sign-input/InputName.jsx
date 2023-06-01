import styles from "./SignInput.module.scss";

const InputName = ({ onChange }) => {
    return (
        <div className={styles.field}>
            <i className={styles.icon + " fa fa-user"} aria-hidden="true"></i>
            <input
                className={styles.input}
                type="text"
                placeholder="Username"
                onChange={onChange}
            />
        </div>
    );
};

export default InputName;
