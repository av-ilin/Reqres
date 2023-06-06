import styles from "./Form.module.scss";

import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";

import { useState, useEffect } from "react";
import ReqresApi from "../../../../api/ReqresApi";

const Form = ({ iName = "", iYear = "", iRgb = "", iPantone = "" } = {}) => {
    const [error, setError] = useState(iName);
    const [name, setName] = useState(iYear);
    const [year, setYear] = useState(iRgb);
    const [rgb, setRgb] = useState(iPantone);
    const [pantone, setPantone] = useState("");

    async function createColor() {
        const response = await ReqresApi.createResource();
        console.log(response);
    }

    function onCreate() {
        setError("");
        let err = "";
        if (!/^\d{2}-\d{4}$/.test(pantone)) err = "Invalid Paantone!";
        if (!/^\#[a-fA-F0-9]{6}$/.test(rgb)) err = "Invalid RGB!";
        if (!/^\d{4}$/.test(year)) err = "Invalid Year!";
        if (name == "") err = "Invalid Name!";

        if (err) {
            setError(err);
            return;
        }
    }

    const onInput = (set) => {
        return (event) => set(event.target.value);
    };
    return (
        <div className={styles.form}>
            <Input
                label="Name, e.g. blue"
                value={name}
                onChange={onInput(setName)}
            />
            <Input
                label="Year, e.g. 2023"
                value={year}
                onChange={onInput(setYear)}
            />
            <Input
                label="RGB, e.g. #ffffff"
                value={rgb}
                onChange={onInput(setRgb)}
            />
            <Input
                label="Pantone, e.g. 13-2123"
                value={pantone}
                onChange={onInput(setPantone)}
            />
            <p className={styles.error}>{error}</p>
            <Button text="OK" onClick={onCreate} />
        </div>
    );
};

export default Form;
