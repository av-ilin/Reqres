import styles from "./Form.module.scss";

import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";

import { useState, useEffect } from "react";
import ReqresApi from "../../../../api/ReqresApi";
import Loader from "../../../ui/loader/Loader";

const Form = ({
    setIsOpenFrom,
    upd = false,
    init = { id: undefined, name: "", year: "", rgb: "", pantone: "" },
} = {}) => {
    const [name, setName] = useState(init.name);
    const [year, setYear] = useState(init.year);
    const [rgb, setRgb] = useState(init.rgb);
    const [pantone, setPantone] = useState(init.pantone);
    const [disButton, setDisButton] = useState(true);
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        checkInput();
    }, [name, year, rgb, pantone]);

    async function createColor() {
        setDisButton(true);
        setIsLoad(true);
        const color = { name, year, rgb, pantone };
        const response = await ReqresApi.createResource(color);
        if (response === undefined) {
            setDisButton(false);
            setIsLoad(false);
        } else setIsOpenFrom(false);
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
                disabled={isLoad}
            />
            <Input
                label="Year, e.g. 2023"
                value={year}
                onChange={onInput(setYear)}
                disabled={isLoad}
            />
            <Input
                label="RGB, e.g. #ffffff"
                value={rgb}
                onChange={onInput(setRgb)}
                disabled={isLoad}
            />
            <Input
                label="Pantone, e.g. 13-2123"
                value={pantone}
                onChange={onInput(setPantone)}
                disabled={isLoad}
            />
            <p className={styles.error}>{error}</p>
            <Button text="OK" onClick={onCreate} disabled={disButton} />
        </div>
    );
};

export default Form;
