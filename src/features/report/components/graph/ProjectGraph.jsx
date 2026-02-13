import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    ReferenceLine,
    Dot
} from "recharts";

/* Format: Feb 2026 */
const formatMonthYear = (dateStr) =>
    new Date(dateStr).toLocaleString("en-US", {
        month: "short",
        year: "numeric"
    });

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    {label}
                </p>
                <p className="text-sm font-bold text-gray-800">
                    Score: {payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

function ProjectGraph({ graphData = [] }) {
    const chartData = graphData.map((item) => ({
        monthYear: formatMonthYear(item.reviewMonth),
        score: item.totalScore
    }));

    return (
        <div className="w-full h-full bg-white p-2 shadow-sm border border-gray-50">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                    {/* X Axis */}
                    <XAxis
                        dataKey="monthYear"
                        tick={{ fill: "#111827", fontSize: 11, fontWeight: 500 }}
                        tickLine={false}
                        axisLine={{ stroke: "#111827" }}
                    />

                    {/* Y Axis */}
                    <YAxis
                        domain={[-10, 10]}
                        ticks={[-10, -5, 0, 5, 10]}
                        tick={{ fill: "#111827", fontSize: 11, fontWeight: 500 }}
                        tickLine={false}
                        axisLine={{ stroke: "#111827" }}
                    />

                    {/* Zero dotted line */}
                    <ReferenceLine
                        y={0}
                        stroke="#6b7280"
                        strokeDasharray="4 4"
                    />

                    <Tooltip content={<CustomTooltip />} cursor={false} />

                    {/* Straight line */}
                    <Line
                        type="linear"
                        dataKey="score"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={({ cx, cy, payload }) => (
                            <Dot
                                cx={cx}
                                cy={cy}
                                r={4}
                                fill={payload.score < 0 ? "#dc2626" : "#16a34a"}
                            />
                        )}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ProjectGraph;
