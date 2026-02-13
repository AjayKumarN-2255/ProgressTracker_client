import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: payload[0].value >= 0 ? '#6366f1' : '#f43f5e' }}
          />
          <p className="text-sm font-bold text-gray-800">
            Score: {payload[0].value}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

function MonthGraph({ graphData }) {
  const chartData =
    graphData[0]?.projects?.map((proj) => ({
      name: proj.projectName,
      score: proj.totalScore
    })) || [];

  return (
    <div className="w-full h-full bg-white p-2 shadow-sm border border-gray-50">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            {/* X Axis */}
            <XAxis
              dataKey="name"
              tick={{
                fill: "#111827",   // black text
                fontSize: 11,
                fontWeight: 500
              }}
              tickLine={false}
              axisLine={{
                stroke: "#111827",
                strokeWidth: 1
              }}
            />

            {/* Y Axis */}
            <YAxis
              domain={[-10, 10]}
              ticks={[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]}
              tick={{
                fill: "#111827",
                fontSize: 11,
                fontWeight: 500
              }}
              tickLine={false}
              axisLine={{
                stroke: "#111827",
                strokeWidth: 1
              }}
            />

            <ReferenceLine
              y={0}
              stroke="#111827"
              strokeDasharray="4 4"
              strokeWidth={1}
            />

            <Tooltip content={<CustomTooltip />} cursor={false} />

            <Bar dataKey="score" barSize={80}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.score < 0 ? "#ffccd1" : "#ccfed8"}
                />
              ))}
            </Bar>

          </BarChart>
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

export default MonthGraph;