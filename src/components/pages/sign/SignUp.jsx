import styles from "./Sign.module.scss";

import InputEmail from "../../ui/sign-input/InputEmail";
import InputPassword from "../../ui/sign-input/InputPassword";
import InputName from "../../ui/sign-input/InputName";
import SignButton from "../../ui/sign-button/SignButton";
import Loader from "../../ui/loader/Loader";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReqresApi from "../../../api/ReqresApi";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [isLoad, setIsLoad] = useState(false);
    const [disButton, setDisButton] = useState(true);

    useEffect(() => {
        validInput();
    }, [email, password, repassword, username]);

    async function register() {
        setIsLoad(true);
        const user = { username, email, password };
        const { response, message } = await ReqresApi.signUp(user);
        console.log("Token", response);
        if (response !== undefined) {
            dispatch({ type: "SET_TOKEN", payload: response.token });
            dispatch({ type: "SET_USERNAME", payload: email });
            navigate("/");
        }
        dispatch({ type: "ADD_NOTICE", payload: message });
        setIsLoad(false);
    }

    function onEnter() {
        if (!validInput()) return;
        register();
    }

    function validInput() {
        setError("");
        let err = "";
        if (password !== repassword) err = "Passwords don't match!";
        if (!/.{8}/.test(password)) err = "Invalid Password!";
        if (!/^[\w-\.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email))
            err = "Invalid Email!";
        if (username === "") err = "Invalid UserName";

        if (err) {
            setError(err);
            setDisButton(true);
            return false;
        }
        setDisButton(false);
        return true;
    }

    const onInputUsername = (event) => setUsername(event.target.value);
    const onInputEmail = (event) => setEmail(event.target.value);
    const onInputPassword = (event) => setPassword(event.target.value);
    const onInputRepassword = (event) => setRepassword(event.target.value);

    return (
        <div className={styles.wrap}>
            <div
                className={styles.sign + " " + styles.up}
                style={{
                    pointerEvents: isLoad ? "none" : "",
                }}
            >
                <Loader
                    width={30}
                    height={30}
                    top={10}
                    left={10}
                    isActive={isLoad}
                />
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
                <SignButton onClick={onEnter} disabled={disButton} />
            </div>
        </div>
    );
};

export default SignUp;
