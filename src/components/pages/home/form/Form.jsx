import styles from "./Form.module.scss";

import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";

import { useState, useEffect } from "react";
import ReqresApi from "../../../../api/ReqresApi";
import Loader from "../../../ui/loader/Loader";

const Form = ({
    setIsOpenFrom,
    setFormInitColor,
    setColors,
    colors,
    iColor = undefined,
} = {}) => {
    const init =
        iColor === undefined
            ? {
                  id: undefined,
                  name: "",
                  year: "",
                  color: "",
                  pantone_value: "",
              }
            : colors[iColor];
    const [name, setName] = useState(init.name);
    const [year, setYear] = useState(init.year);
    const [rgb, setRgb] = useState(init.color);
    const [pantone, setPantone] = useState(init.pantone_value);
    const [disButton, setDisButton] = useState(true);
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        checkInput();
    }, [name, year, rgb, pantone]);

    async function createColor() {
        setIsLoad(true);
        const color = { name, year, color: rgb, pantone_value: pantone };
        const response = await ReqresApi.createResource(color);
        if (response === undefined) setIsLoad(false);
        else {
            const newColors = Object.assign([], colors);
            newColors.push({ id: response.id, ...color });
            setColors(newColors);
            setIsOpenFrom(false);
        }
    }

    async function updateColor() {
        setIsLoad(true);
        const color = {};
        if (name !== init.name) color.name = name;
        if (year !== init.year) color.year = year;
        if (rgb !== init.color) color.color = rgb;
        if (pantone !== init.pantone_value) color.pantone_value = pantone;
        const response = await ReqresApi.updResource(init.id, color);

        if (response === undefined) setIsLoad(false);
        else {
            const newColors = Object.assign([], colors);
            newColors[iColor] = { ...newColors[iColor], ...color };
            setIsOpenFrom(false);
            setFormInitColor(undefined);
            setColors(newColors);
        }
    }

    function onCreate() {
        if (!checkInput()) return;
        if (init.id === undefined) createColor();
        else updateColor();
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
            <Button
                text="OK"
                onClick={onCreate}
                disabled={disButton || isLoad}
            />
            <Button
                text={<i className="fa fa-times"></i>}
                width={24}
                height={24}
                disabled={isLoad}
                dlcStyles={{
                    position: "absolute",
                    top: "-12px",
                    right: "-12px",
                }}
                onClick={() => setIsOpenFrom(false)}
            />
        </div>
    );
};

export default Form;
