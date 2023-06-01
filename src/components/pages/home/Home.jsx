import styles from "./Home.module.scss";

import Button from "../../ui/button/Button";

import { useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
    const username = useSelector((state) => state.username);
    const data = useState([]);

    const tmp = [];
    for (let i = 0; i < 16; i++) tmp.push(0);
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
                                <th>Color</th>
                                <th>Name</th>
                                <th>Year</th>
                                <th>RGB</th>
                                <th>Pantone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tmp.map((_, i) => (
                                <tr>
                                    <td>{i}</td>
                                    <td>cerulean</td>
                                    <td>2000</td>
                                    <td>#98B2D1</td>
                                    <td>15-4020</td>
                                    <td className={styles["table-buts"]}>
                                        <Button
                                            text={<i class="fa fa-pencil"></i>}
                                            bgColor="green"
                                        />
                                        <Button
                                            text={<i class="fa fa-trash"></i>}
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
