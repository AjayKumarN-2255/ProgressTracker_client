import useManageGraph from "../../hooks/useManageGraph";
import MonthGraph from "./MonthGraph";
import YearGraph from "./YearGraph";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function GraphContainer({ userId }) {

    const { view, setView, years,
        selectedMonth, setSelectedMonth,
        selectedYear, setSelectedYear, graphData } = useManageGraph(userId);

    return (
        <div className="w-full mx-auto p-6">
            {/* Toggle Buttons */}
            <div className="flex justify-end mb-4">
                <div className="flex gap-3">
                    <button
                        onClick={() => setView("monthly")}
                        className={`px-5 py-2 rounded-lg font-medium shadow-lg transition-all text-sm ${view === "monthly"
                            ? "bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-700"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        Monthly
                    </button>

                    <button
                        onClick={() => setView("yearly")}
                        className={`px-5 py-2 rounded-lg font-medium shadow-lg transition-all text-sm ${view === "yearly"
                            ? "bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-700"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* Month/Year Selectors */}
            <div className="flex justify-end gap-3 mb-6">
                {view === "monthly" && (
                    <>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            className="px-4 py-2 border rounded-lg text-gray-700"
                        >
                            {months.map((m, idx) => (
                                <option key={idx} value={idx}>
                                    {m}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="px-4 py-2 border rounded-lg text-gray-700"
                        >
                            {years.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                {view === "yearly" && (
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="px-4 py-2 border rounded-lg text-gray-700"
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Chart Container */}
            <div className="w-full max-w-7xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    {view === "monthly" ? "Monthly Performance" : "Yearly Performance"}
                </h2>

                <div className="w-full h-[550px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-lg">
                    {view === "monthly" ? (
                        <MonthGraph graphData={graphData} />
                    ) : (
                        <YearGraph graphData={graphData} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default GraphContainer;
