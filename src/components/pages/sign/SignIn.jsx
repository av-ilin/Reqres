import styles from "./Sign.module.scss";

import InputEmail from "../../ui/sign-input/InputEmail";
import InputPassword from "../../ui/sign-input/InputPassword";
import SignButton from "../../ui/sign-button/SignButton";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onInputPassword = (event) => setPassword(event.target.value);
    const onInputLogin = (event) => setEmail(event.target.value);
    function onEnter() {
        console.log(email);
        console.log(password);
        dispatch({ type: "SET_TOKEN", payload: "ok" });
        navigate("/");
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.sign + " " + styles.in}>
                <img src="images/icon_sign.svg" alt="login icon" />
                <h2>Sign In</h2>
                <InputEmail onChange={onInputLogin} />
                <InputPassword onChange={onInputPassword} />
                <Link className={styles.ref} to="/sign-up">
                    Create an account
                </Link>
                <p className={styles.info}>{error}</p>
                <SignButton onClick={onEnter} />
            </div>
        </div>
    );
};

export default SignIn;
