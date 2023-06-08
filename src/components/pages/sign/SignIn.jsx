import styles from "./Sign.module.scss";

import InputEmail from "../../ui/sign-input/InputEmail";
import InputPassword from "../../ui/sign-input/InputPassword";
import SignButton from "../../ui/sign-button/SignButton";
import Loader from "../../ui/loader/Loader";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReqresApi from "../../../api/ReqresApi";

const SignIn = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disButton, setDisButton] = useState(true);
    const [isLoad, setIsLoad] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        validInput();
    }, [email, password]);

    async function login() {
        setIsLoad(true);
        const user = { email, password };
        const { answer: response, message } = await ReqresApi.signIn(user);
        console.log("Token", response);
        if (response !== undefined) {
            dispatch({ type: "SET_TOKEN", payload: response.token });
            navigate("/");
        }
        dispatch({ type: "ADD_NOTICE", payload: message });
        setIsLoad(false);
    }

    function onEnter() {
        if (!validInput()) return;
        login();
    }

    function validInput() {
        setError("");
        let err = "";
        if (!/^[\w-\.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email))
            err = "Invalid Email!";
        if (!/.{8}/.test(password)) err = "Invalid Password!";

        if (err) {
            setError(err);
            setDisButton(true);
            return false;
        }
        setDisButton(false);
        return true;
    }

    const onInputPassword = (event) => setPassword(event.target.value);
    const onInputLogin = (event) => setEmail(event.target.value);

    return (
        <div className={styles.wrap}>
            <div className={styles.sign + " " + styles.in}>
                <Loader
                    width={30}
                    height={30}
                    top={10}
                    left={10}
                    isActive={isLoad}
                />

                <img src="images/icon_sign.svg" alt="login icon" />
                <h2>Sign In</h2>
                <InputEmail onChange={onInputLogin} />
                <InputPassword onChange={onInputPassword} />
                <Link className={styles.ref} to="/sign-up">
                    Create an account
                </Link>
                <p className={styles.info}>{error}</p>
                <SignButton onClick={onEnter} disabled={disButton} />
            </div>
        </div>
    );
};

export default SignIn;
