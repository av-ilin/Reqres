import styles from "./Sign.module.scss";

import InputEmail from "../../ui/sign-input/InputEmail";
import InputPassword from "../../ui/sign-input/InputPassword";
import InputName from "../../ui/sign-input/InputName";
import SignButton from "../../ui/sign-button/SignButton";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const navigate = useNavigate();

    const onInputUsername = (event) => setUsername(event.target.value);
    const onInputEmail = (event) => setEmail(event.target.value);
    const onInputPassword = (event) => setPassword(event.target.value);
    const onInputRepassword = (event) => setRepassword(event.target.value);

    function onEnter() {
        if (password != repassword) {
            setError("password not like");
            return;
        }

        console.log(username);
        console.log(email);
        console.log(password);
        console.log(repassword);
        navigate("/");
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.sign + " " + styles.up}>
                <img src="images/icon_sign.svg" alt="login icon" />
                <h2>Sign Up</h2>
                <InputName onChange={onInputUsername} />
                <InputEmail onChange={onInputEmail} />
                <InputPassword onChange={onInputPassword} />
                <InputPassword onChange={onInputRepassword} />
                <Link className={styles.ref} to="/sign-in">
                    Return to Sign In
                </Link>
                <p className={styles.info}>{error}</p>
                <SignButton onClick={onEnter} />
            </div>
        </div>
    );
};

export default SignUp;
