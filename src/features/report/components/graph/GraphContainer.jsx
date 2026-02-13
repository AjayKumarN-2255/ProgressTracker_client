import useManageGraph from "../../hooks/useManageGraph";
import useFetch from "../../../../hooks/useFetch";
import MonthGraph from "./MonthGraph";
import YearGraph from "./YearGraph";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function GraphContainer({ userId }) {
    const {
        view,
        setView,
        years,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        graphData,
        cuId,
        setcuId
    } = useManageGraph(userId);

    const { data: users } = useFetch('/user', { params: { role: 'employee' } });

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">

            {/* 🔝 Top Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                {/* ⬅️ User & Project */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {!userId && (
                        <select
                            value={cuId || ""}
                            onChange={(e) => setcuId(e.target.value)}
                            className="w-full sm:w-[220px] px-4 py-2 border rounded-lg text-gray-700"
                        >
                            <option value="" disabled>Select User</option>
                            {users.map((u) => (
                                <option key={u._id} value={u._id}>{u.name}</option>
                            ))}
                        </select>
                    )}

                    {/* <select
                        value={selectedProject || ""}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        className="w-full sm:w-[220px] px-4 py-2 border rounded-lg text-gray-700"
                        disabled={!projects.length}
                    >
                        <option value="" disabled>Select Project</option>
                        {projects.map((p) => (
                            <option key={p._id} value={p._id}>{p.name}</option>
                        ))}
                    </select> */}
                </div>

                {/* ➡️ Monthly / Yearly Toggle */}
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setView("monthly")}
                        className={`flex-1 md:flex-none px-5 py-2 rounded-lg font-medium text-sm transition-all ${view === "monthly"
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-700 border border-gray-300"
                            }`}
                    >
                        Monthly
                    </button>

                    <button
                        onClick={() => setView("yearly")}
                        className={`flex-1 md:flex-none px-5 py-2 rounded-lg font-medium text-sm transition-all ${view === "yearly"
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-700 border border-gray-300"
                            }`}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* 📅 Month / Year selectors */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mb-6">
                {view === "monthly" && (
                    <>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            className="w-full sm:w-auto px-4 py-2 border rounded-lg text-gray-700"
                        >
                            {months.map((m, idx) => (
                                <option key={idx} value={idx}>{m}</option>
                            ))}
                        </select>

                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="w-full sm:w-auto px-4 py-2 border rounded-lg text-gray-700"
                        >
                            {years.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </>
                )}

                {view === "yearly" && (
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="w-full sm:w-auto px-4 py-2 border rounded-lg text-gray-700"
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                )}
            </div>

            {/* 📊 Chart Section */}
            <div className="w-full">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    {view === "monthly" ? "Monthly Performance" : "Yearly Performance"}
                </h2>

                <div className="w-full min-h-[400px] md:h-[550px] border-2 border-dashed border-gray-300 rounded-lg">
                    {graphData?.length > 0 ? (
                        view === "monthly" ? (
                            <MonthGraph graphData={graphData} />
                        ) : (
                            <YearGraph graphData={graphData} />
                        )
                    ) : !userId && !cuId ? (
                        <div className="flex items-center justify-center h-full text-gray-400 text-sm font-medium">
                            Select user & project to view data
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full space-y-2">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                                📊
                            </div>
                            <p className="text-gray-400 text-sm font-medium">
                                No data found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GraphContainer;
