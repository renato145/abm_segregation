import React from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TStore } from "../store";

interface Props {
  title: string;
  plotData: TStore["plotData"];
  datakey: keyof TStore["plotData"][0];
}

export const LinePlot: React.FC<Props> = ({ title, plotData, datakey }) => {
  return (
    <div className="p-2 bg-gray-400 bg-opacity-60 rounded ">
      <p className="font-bold text-gray-700 text-center">{title}</p>
      <ResponsiveContainer
        className="mt-1.5 bg-white w-full rounded"
        height={200}
      >
        <LineChart
          data={plotData}
          margin={{ top: 10, right: 10, bottom: 5, left: 5 }}
        >
          <Line
            dataKey={datakey}
            stroke="#5e665e"
            strokeWidth={2}
            dot={false}
          />
          <CartesianGrid stroke="#ccc" strokeWidth={0.5} />
          <XAxis fontSize={11} height={35} tickSize={4}>
            <Label
              value="Time"
              position="insideBottom"
              fontSize={12}
              offset={4}
            />
          </XAxis>
          <YAxis
            fontSize={11}
            width={20}
            tickSize={4}
            tickFormatter={(x: number) => x.toFixed(1)}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
