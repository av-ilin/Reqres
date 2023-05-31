import styles from "./SignIn.module.scss";

import InputEmail from "../../ui/sign-input/InputEmail";
import InputPassword from "../../ui/sign-input/InputPassword";
import SignButton from "../../ui/sign-button/SignButton";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onInputPassword = (event) => setPassword(event.target.value);
    const onInputLogin = (event) => setLogin(event.target.value);

    function onEnter() {
        console.log(login);
        console.log(password);
        dispatch({ type: "SET_TOKEN", payload: "ok" });
        navigate("/");
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.sign}>
                <img src="images/icon_sign.svg" alt="login icon" />
                <h2>Sign In</h2>
                <InputEmail onChange={onInputLogin} />
                <InputPassword onChange={onInputPassword} />
                <SignButton onClick={onEnter} />
            </div>
        </div>
    );
};

export default SignIn;
