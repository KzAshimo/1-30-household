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
    users: {
        name: string;
    };
};

const IncomeTotal = () => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [logs, setLogs] = useState<Logs[]>([]);

    useEffect(() => {
        incomeExCategory();
        incomeExLog();
    }, []);

    //ExCategory------------------------------------------------
    const incomeExCategory = async () => {
        try {
            const response = await fetch("/api/in-categories", {
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
    const incomeExLog = async () => {
        try {
            const response = await fetch("/api/in-logs", {
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

    const totalPrice = categories.map((category) => {
        const total = logs
            .filter((log) => log.category_id === category.id)
            .reduce((sum, log) => sum + log.price, 0);
        return { ...category, total };
    });

    return (
        <div className="p-6 bg-gray-100">
            {/* 総合の合計金額 */}
            <div className="mb-6 text-center">
                <p className="text-2xl font-bold text-gray-800">
                    収入合計:{" "}
                    <span className="text-blue-600">
                        ¥
                        {totalPrice
                            .reduce((sum, category) => sum + category.total, 0)
                            .toLocaleString()}
                    </span>
                </p>
            </div>

            {/* カテゴリごとの合計金額 */}
            <div className="flex flex-wrap gap-4 justify-center">
                {totalPrice.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white p-5 rounded-lg shadow-md w-64 border border-gray-200"
                    >
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            {category.title}
                        </h2>
                        <p className="text-lg text-gray-600">
                            合計:{" "}
                            <span className="font-semibold text-blue-500">
                                ¥{category.total.toLocaleString()}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default IncomeTotal;
