import styles from "./Input.module.scss";

const Input = ({
    label = "Input",
    value = "",
    onChange = () => {},
    disabled = false,
} = {}) => {
    return (
        <div className={styles.wrap}>
            <input
                type="text"
                className={styles.input}
                placeholder=" "
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            <label htmlFor="input" className={styles.label}>
                {label}
            </label>
        </div>
    );
};

export default Input;
