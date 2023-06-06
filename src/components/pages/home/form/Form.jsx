import styles from "./Form.module.scss";

import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";

import { useState, useEffect } from "react";
import ReqresApi from "../../../../api/ReqresApi";
import Loader from "../../../ui/loader/Loader";

const Form = ({ iName = "", iYear = "", iRgb = "", iPantone = "" } = {}) => {
    const [error, setError] = useState("");
    const [name, setName] = useState(iName);
    const [year, setYear] = useState(iYear);
    const [rgb, setRgb] = useState(iRgb);
    const [pantone, setPantone] = useState(iPantone);
    const [disButton, setDisButton] = useState(true);
    const [disInput, setDisInput] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        checkInput();
    }, [name, year, rgb, pantone]);

    async function createColor() {
        setDisButton(true);
        setDisInput(true);
        setIsLoad(true);
        const color = { name, year, rgb, pantone };
        const response = await ReqresApi.createResource(color);
        if (response === undefined) {
            setDisButton(false);
            setDisInput(false);
            setIsLoad(false);
        }
        setIsLoad(false);
        setDisButton(true);
    }

    function onCreate() {
        if (!checkInput()) return;
        createColor();
    }

    function checkInput() {
        setError("");
        let err = "";
        if (!/^\d{2}-\d{4}$/.test(pantone)) err = "Invalid Pantone!";
        if (!/^\#[a-fA-F0-9]{6}$/.test(rgb)) err = "Invalid RGB!";
        if (!/^\d{4}$/.test(year)) err = "Invalid Year!";
        if (!/\S/.test(name) || name === "") err = "Invalid Name!";

        if (err) {
            setError(err);
            setDisButton(true);
            return false;
        }
        setDisButton(false);
        return true;
    }

    const onInput = (set) => {
        return (event) => {
            set(event.target.value);
        };
    };

    return (
        <div className={styles.form}>
            <Loader top={5} left={5} isActive={isLoad} />
            <Input
                label="Name, e.g. blue"
                value={name}
                onChange={onInput(setName)}
                disabled={disInput}
            />
            <Input
                label="Year, e.g. 2023"
                value={year}
                onChange={onInput(setYear)}
                disabled={disInput}
            />
            <Input
                label="RGB, e.g. #ffffff"
                value={rgb}
                onChange={onInput(setRgb)}
                disabled={disInput}
            />
            <Input
                label="Pantone, e.g. 13-2123"
                value={pantone}
                onChange={onInput(setPantone)}
                disabled={disInput}
            />
            <p className={styles.error}>{error}</p>
            <Button text="OK" onClick={onCreate} disabled={disButton} />
        </div>
    );
};

export default Form;
