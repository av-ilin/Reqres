import styles from "./Home.module.scss";

import Button from "../../ui/button/Button";
import Form from "./form/Form";
import Loader from "../../ui/loader/Loader";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ReqresApi from "../../../api/ReqresApi";

const Home = () => {
    const per_page = 8;
    const username = useSelector((state) => state.username);
    const dispatch = useDispatch();

    const [colors, setColors] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pagination, setPagination] = useState([{ n: 1, active: true }]);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [formInitColor, setFormInitColor] = useState(undefined);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        fetchColors();
    }, [page]);

    useEffect(() => {
        changePagination();
    }, [page, totalPages]);

    async function fetchColors() {
        setIsLoad(true);
        const { response: data, message } = await ReqresApi.getResource(
            page,
            per_page
        );
        if (data !== undefined) {
            setTotalPages(data.total_pages);
            setColors(data.data);
        }
        dispatch({ type: "ADD_NOTICE", payload: message });
        setIsLoad(false);
    }

    async function deleteColor(i) {
        setIsLoad(true);
        const { response, message } = await ReqresApi.delResource(colors[i].id);
        if (response !== undefined) {
            const newColors = Object.assign([], colors);
            newColors.splice(i, 1);
            setColors(newColors);
        }
        dispatch({ type: "ADD_NOTICE", payload: message });
        setIsLoad(false);
    }

    function changePagination() {
        const pag = [];
        let start = page - 2;
        let end = page + 2;
        if (page < 3) {
            start = 1;
            end = Math.min(start + 4, totalPages);
        }
        if (page > totalPages - 2) {
            end = totalPages;
            start = Math.max(totalPages - 4, 1);
        }

        for (let i = start; i <= end; i++)
            pag.push({
                n: i,
                active: i === page,
            });

        setPagination(pag);
    }

    return (
        <div className={styles.container}>
            <Loader width={64} height={64} center isActive={isLoad} />
            <div
                className={styles.home}
                style={{
                    filter: isOpenForm ? "blur(5px)" : "",
                    pointerEvents: isLoad || isOpenForm ? "none" : "",
                }}
            >
                <div className={styles.tools}>
                    <h1>{username}</h1>
                    <Button
                        text="Create"
                        bgColor="#3699FF"
                        onClick={() => setIsOpenForm(true)}
                        disabled={isLoad}
                    />
                </div>
                <div
                    className={styles["table-wrap"]}
                    style={{
                        overflow: isLoad ? "hidden" : " ",
                    }}
                >
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
                                <tr key={color.id}>
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
                                            disabled={isLoad}
                                            width={32}
                                            height={24}
                                            onClick={() => {
                                                setFormInitColor(i);
                                                setIsOpenForm(true);
                                            }}
                                        />
                                        <Button
                                            text={
                                                <i className="fa fa-trash"></i>
                                            }
                                            bgColor="red"
                                            disabled={isLoad}
                                            width={32}
                                            height={24}
                                            onClick={() => deleteColor(i)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.pagination}>
                    <div
                        className={styles["pagination-item"]}
                        onClick={() => setPage(1)}
                    >
                        &#8701;
                    </div>

                    {pagination.map(({ n, active }) => (
                        <div
                            key={n}
                            className={
                                styles["pagination-item"] +
                                (active
                                    ? " " + styles["pagination-item--active"]
                                    : "")
                            }
                            onClick={() => setPage(n)}
                        >
                            {n}
                        </div>
                    ))}

                    <div
                        className={styles["pagination-item"]}
                        onClick={() => setPage(totalPages)}
                    >
                        &#8702;
                    </div>
                </div>
            </div>
            {isOpenForm ? (
                <Form
                    setIsOpenFrom={setIsOpenForm}
                    setFormInitColor={setFormInitColor}
                    setColors={setColors}
                    colors={colors}
                    iColor={formInitColor}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default Home;
