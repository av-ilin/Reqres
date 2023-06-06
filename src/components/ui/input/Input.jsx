import styles from "./Input.module.scss";

const Input = ({ label = "Input", value = "", onChange = () => {} } = {}) => {
    return (
        <div className={styles.wrap}>
            <input
                type="text"
                className={styles.input}
                placeholder=" "
                // value={value}
                onChange={onChange}
            />
            <label htmlFor="input" className={styles.label}>
                {label}
            </label>
        </div>
    );
};

export default Input;
