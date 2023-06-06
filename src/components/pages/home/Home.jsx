import styles from "./Home.module.scss";

import Button from "../../ui/button/Button";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ReqresApi from "../../../api/ReqresApi";

const Home = () => {
    const per_page = 10;
    const username = useSelector((state) => state.username);
    const [colors, setColors] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, settotalPages] = useState(1);
    const [pagination, setPagination] = useState([{ n: 1, active: true }]);

    useEffect(() => {
        fetchColors();
    }, [page]);

    useEffect(() => {
        changePagination();
    }, [page, totalPages]);

    async function fetchColors() {
        const data = await ReqresApi.getResource(page, per_page);
        settotalPages(data.total_pages);
        setColors(data.data);
    }

    function changePagination() {
        const pag = [];
        let start, end;
        switch (page) {
            case 1:
            case 2:
                start = 1;
                end = Math.min(start + 4, totalPages);
                break;
            case totalPages - 1:
            case totalPages:
                end = totalPages;
                start = Math.max(totalPages - 4, 1);
                break;
            default:
                start = page - 2;
                end = page + 2;
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
                                <tr key={i}>
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
                <div className={styles.pagination}>
                    <div
                        className={styles["pagination-item"]}
                        onClick={() => {
                            setPage(1);
                        }}
                    >
                        <i className="fa fa-chevron-left"></i>
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
                            onClick={() => {
                                setPage(n);
                            }}
                        >
                            {n}
                        </div>
                    ))}

                    <div
                        className={styles["pagination-item"]}
                        onClick={() => {
                            setPage(totalPages);
                        }}
                    >
                        <i className="fa fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
