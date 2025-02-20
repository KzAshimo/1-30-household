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
    created_at: Date;
};

const ExList = () => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [logs, setLogs] = useState<Logs[]>([]);

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
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                支出カテゴリ
            </h2>
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="bg-white shadow-md rounded-lg p-4 mb-2"
                >
                    <h2 className="text-lg font-bold border-b pb-2 text-gray-800 mb-3">
                        {category.title}
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
