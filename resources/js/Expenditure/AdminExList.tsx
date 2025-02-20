import { useEffect, useState } from "react";
import "../../css/app.css";
import { usePage } from "@inertiajs/react";

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
    created_at: Date;
};

const AdminExList = () => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [logs, setLogs] = useState<Logs[]>([]);
    const [newCategory, setNewCategory] = useState<string>("");
    const [newLog, setNewLog] = useState<{
        name: string;
        text: string;
        price: number | null;
        category_id: number;
    }>({
        name: "",
        text: "",
        price: null,
        category_id: 0,
    });

    const user = usePage().props.auth.user;

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
    const storeExCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("store", { newCategory });
        try {
            const response = await fetch("/api/ex-categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newCategory, user_id: user.id }),
            });
            if (!response.ok) {
                throw new Error("支出カテゴリ追加エラー");
            }
            setNewCategory("");
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
                headers: {
                    "Content-Type": "application/json",
                },
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
            const data: Logs[] = await response.json();
            console.log(data);

            //今月のデータをフィルタリング
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth();

            const filterLogs = data.filter((log) => {
                const logDate = new Date(log.created_at);
                return (
                    logDate.getFullYear() === currentYear &&
                    logDate.getMonth() === currentMonth
                );
            });
            setLogs(filterLogs);
        } catch (error) {
            console.error(error);
        }
    };
    const storeExLog = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/ex-logs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...newLog, user_id: user.id }),
            });
            if (!response.ok) {
                throw new Error("支出追加エラー");
            }
            setNewLog({ name: "", text: "", price: 0, category_id: 0 });
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
                headers: {
                    "Content-Type": "application/json",
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
            <h2 className="text-xl font-semibold leading-tight text-gray-800 underline mb-2">
                支出
            </h2>
            {/* カテゴリフォーム */}
            <label className="">支出カテゴリ追加</label>
            <form
                onSubmit={storeExCategory}
                className="mb-4 flex items-center border-solid border-2 p-2"
            >
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="追加支出カテゴリを入力"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-teal-500"
                >
                    追加
                </button>
            </form>
            {/* ログフォーム */}
            <label className="">支出追加</label>
            <form
                onSubmit={storeExLog}
                className="mb-4 flex flex-col gap-2 border-solid border-2 p-2"
            >
                <input
                    type="text"
                    value={newLog.name}
                    onChange={(e) =>
                        setNewLog({ ...newLog, name: e.target.value })
                    }
                    placeholder="支出名を入力"
                />
                <input
                    type="text"
                    value={newLog.text}
                    onChange={(e) =>
                        setNewLog({ ...newLog, text: e.target.value })
                    }
                    placeholder="支出説明を入力"
                />
                <input
                    type="number"
                    value={newLog.price ?? ""}
                    onChange={(e) =>
                        setNewLog({ ...newLog, price: e.target.value === "" ? null : Number(e.target.value) })
                    }
                    placeholder="金額を入力"
                />
                <select
                    value={newLog.category_id}
                    onChange={(e) =>
                        setNewLog({
                            ...newLog,
                            category_id: Number(e.target.value),
                        })
                    }
                >
                    <option value="">カテゴリを選択</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-teal-500"
                >
                    追加
                </button>
            </form>
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="bg-white shadow-md rounded-lg p-4 mb-2"
                >
                    <h2 className="text-lg font-bold border-b pb-2 text-gray-800 mb-3">
                        {category.title}
                        <span>
                            {/* カテゴリ削除 */}
                            <button
                                className="bg-red-500 font-bold text-white mx-2 px-2 py-1 rounded-md hover:bg-black"
                                onClick={() => deleteExCategory(category.id)}
                            >
                                削除
                            </button>
                        </span>
                    </h2>
                    <ul className="space-y-1">
                        {logs
                            .filter((log) => log.category_id === category.id)
                            .map((log) => (
                                <li
                                    key={log.id}
                                    className="bg-gray-200 p-4 rounded-lg shadow-sm"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-800 font-medium">
                                            {
                                                new Date(log.created_at)
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                        </p>
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
                                            className="bg-red-500 text-white p-1 rounded-md hover:bg-black"
                                            onClick={() => deleteExLog(log.id)}
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
export default AdminExList;
