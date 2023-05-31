import styles from "./SignIn.module.scss";

import InputEmail from "../../ui/input/InputEmail";
import InputPassword from "../../ui/input/InputPassword";

const SignIn = () => {
    return (
        <div className={styles.wrap}>
            <div className={styles.sign}>
                <img src="images/icon_sign.svg" alt="login icon" />
                <h2>Sign In</h2>
                <InputEmail />
                <InputPassword />
            </div>
        </div>
    );
};

export default SignIn;
