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
    price: number;
    user_id: number;
    category_id: number;
};
const ExList = () => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [logs, setLogs] = useState<Logs[]>([]);

    //初回レンダリングでindexメソッド読み込み
    useEffect(() => {
        indexExCategory();
        indexExLog();
    }, []);

    //ExCategory------------------------------------------------
    const indexExCategory = async () => {
        try {
            const response = await fetch("/api/ex-categories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("支出カテゴリ取得エラー");
            }
            setCategories(await response.json());
            console.log(categories);
        } catch (error) {
            console.error(error);
        }
    };
    const storeExCategory = async (title:string) => {
        try {
            const response = await fetch("/api/ex-categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });
            if (!response.ok) {
                throw new Error("支出カテゴリ追加エラー");
            }
            indexExCategory();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteExCategory = async (id: number) => {
        console.log(id);
        console.log(`/api/ex-categories/${id}`);

        try {
            const response = await fetch(`/api/ex-categories/${id}`, {
                method: "DELETE",
                headers:{
                    "Content-Type":"application/json",
                },
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("支出カテゴリ削除エラー");
            }
            setCategories(categories.filter((category) => category.id !== id));
            indexExCategory();
        } catch (error) {
            console.error(error);
        }
    };

    //ExLog-----------------------------------------------
    const indexExLog = async () => {
        try {
            const response = await fetch("/api/ex-logs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("支出記録取得エラー");
            }
            setLogs(await response.json());
            console.log(logs);
        } catch (error) {
            console.error(error);
        }
    };
    const storeExLog = async (log:Omit<Logs,"id">) => {
        try {
            const response = await fetch("/api/logs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ log }),
            });
            if (!response.ok) {
                throw new Error("支出追加エラー");
            }
            indexExLog();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteExLog = async (id: number) => {
        console.log(id);
        try {
            const response = await fetch(`/api/ex-logs/${id}`, {
                method: "DELETE",
                headers:{
                    "Content-Type":"application/json",
                },
            });
            if (!response.ok) {
                throw new Error("支出ログ削除エラー");
            }
            setLogs(logs.filter((log) => log.id !== id));
            indexExLog();
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
                                onClick={() => deleteExCategory(category.id)}
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
                                    <button className="bg-red-500 text-white p-1 rounded-md"
                                    onClick={() => deleteExLog(log.id)}>削除</button>

                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default ExList;
