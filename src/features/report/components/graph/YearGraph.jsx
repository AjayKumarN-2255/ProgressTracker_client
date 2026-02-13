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

// Format month from ISO date
const formatMonth = (dateStr) =>
  new Date(dateStr).toLocaleString("en-US", { month: "short" });

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-sm font-bold text-gray-800">
          Avg Score: {payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

function YearGraph({ graphData }) {
  const chartData =
    graphData?.map((item) => ({
      month: formatMonth(item._id),
      score: item.avg_project_score
    })) || [];

  return (
    <div className="w-full h-full bg-white p-2 shadow-sm border border-gray-50">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              tick={{ fill: "#111827", fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "#111827" }}
            />

            {/* Y Axis */}
            <YAxis
              domain={[-10, 10]}
              ticks={[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]}
              tick={{ fill: "#111827", fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "#111827" }}
            />

            {/* Zero reference line */}
            <ReferenceLine
              y={0}
              stroke="#6b7280"
              strokeDasharray="4 4"
            />

            <Tooltip content={<CustomTooltip />} cursor={false} />

            {/* Line */}
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
      ) : (
        <div className="flex flex-col items-center justify-center h-full space-y-2">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
            📊
          </div>
          <p className="text-gray-400 text-sm font-medium">No data found</p>
        </div>
      )}
    </div>
  );
}

export default YearGraph;
