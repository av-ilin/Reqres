import styles from "./Home.module.scss";

import Button from "../../ui/button/Button";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ReqresApi from "../../../api/ReqresApi";

const Home = () => {
    const username = useSelector((state) => state.username);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        fetchColors();
    }, []);

    async function fetchColors() {
        const data = await ReqresApi.getResource(1, 5);
        setColors(data.data);
    }

    return (
        <div className={styles.container}>
            <div className={styles.home}>
                <div className={styles.tools}>
                    <h1>{username}</h1>
                    <Button text="Create" bgColor="#3699FF" />
                </div>
                <div className={styles["table-wrap"]}>
                    <table className={styles["table"]}>
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Name</th>
                                <th>Year</th>
                                <th>RGB</th>
                                <th>Pantone</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {colors.map((color, i) => (
                                <tr>
                                    <td>
                                        <div
                                            style={{
                                                backgroundColor: color.color,
                                            }}
                                        />
                                    </td>
                                    <td>{color.name}</td>
                                    <td>{color.year}</td>
                                    <td>{color.color}</td>
                                    <td>{color.pantone_value}</td>
                                    <td className={styles["table-buts"]}>
                                        <Button
                                            text={
                                                <i className="fa fa-pencil"></i>
                                            }
                                            bgColor="green"
                                        />
                                        <Button
                                            text={
                                                <i className="fa fa-trash"></i>
                                            }
                                            bgColor="red"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;
