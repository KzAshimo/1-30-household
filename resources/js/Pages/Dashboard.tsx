import ExList from "@/Expenditure/ExList";
import ExTotal from "@/Expenditure/ExTotal";
import IncomeList from "@/income/IncomeList";
import IncomeTotal from "@/income/IncomeTotal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Home hold
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <ExTotal/>
                        <IncomeTotal/>
                        <ExList/>
                        <IncomeList/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
