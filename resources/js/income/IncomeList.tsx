import { useEffect, useState } from "react";
import "../../css/app.css";

type Categories = {
    id: number;
    title: string;
    user_id: number;
};

type Logs = {
    id: number;
    name: string;
    text: string;
    category_id: number;
    price: number;
    user_id: number;
};

const IncomeList = () => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [logs, setLogs] = useState<Logs[]>([]);

    useEffect(() => {
        indexIncomeCategory();
        indexIncomeLog();
    }, []);

    //IncomeCategory---------------------------------------
    const indexIncomeCategory = async () => {
        try {
            const response = await fetch("/api/in-categories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("収入カテゴリ取得エラー");
            }
            setCategories(await response.json());
            console.log(categories);
        } catch (error) {
            console.error(error);
        }
    };
    const storeIncomeCategory = async (title: string) => {
        try {
            const response = await fetch("/api/in-categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });
            if (!response.ok) {
                throw new Error("収入カテゴリ追加エラー");
            }
            indexIncomeLog();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteIncomeCategory = async (id: number) => {
        console.log(id);
        try {
            const response = await fetch(`/api/in-categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", //auth sanctum
            });
            if (!response.ok) {
                throw new Error("収入カテゴリ削除エラー");
            }
            setCategories(categories.filter((category) => category.id !== id));
            indexIncomeCategory();
        } catch (error) {
            console.error(Error);
        }
    };
    //IncomeLog----------------------------------------
    const indexIncomeLog = async () => {
        try {
            const response = await fetch("/api/in-logs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("収入記録取得エラー");
            }
            setLogs(await response.json());
            console.log(logs);
        } catch (error) {
            console.error(error);
        }
    };
    const storeIncomeLog = async (log: Omit<Logs, "id">) => {
        try {
            const response = await fetch("/api/in-logs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ log }),
            });
            if (!response.ok) {
                throw new Error("収入追加エラー");
            }
            indexIncomeLog();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteIncomeLog = async (id: number) => {
        console.log(id);
        try {
            const response = await fetch(`/api/in-logs/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("収入ログ削除エラー");
            }
            setLogs(logs.filter((log) => log.id !== id));
            indexIncomeLog();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                支出カテゴリ
            </h2>
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="bg-white shadow-md rounded-lg p-4 mb-6"
                >
                    <h2 className="text-lg font-bold border-b pb-2 text-gray-800 mb-3">
                        {category.title}
                        <span>
                            {/* カテゴリ削除 */}
                            <button
                                className="bg-red-500 font-bold text-white mx-2 px-2 py-1 rounded-md"
                                onClick={() =>
                                    deleteIncomeCategory(category.id)
                                }
                            >
                                削除
                            </button>
                        </span>
                    </h2>
                    <ul className="space-y-3">
                        {logs
                            .filter((log) => log.category_id === category.id)
                            .map((log) => (
                                <li
                                    key={log.id}
                                    className="bg-gray-200 p-4 rounded-lg shadow-sm"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-800 font-medium">
                                            {log.name}
                                        </p>
                                        <p className="text-gray-900 font-semibold">
                                            {log.price}円
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            {log.text}
                                        </p>
                                        {/* ログ削除 */}
                                        <button
                                            className="bg-red-500 text-white p-1 rounded-md"
                                            onClick={() =>
                                                deleteIncomeLog(log.id)
                                            }
                                        >
                                            削除
                                        </button>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default IncomeList;
