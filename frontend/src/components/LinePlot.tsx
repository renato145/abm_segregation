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
  tooltipLabel: string;
  yAxisDecimals: number;
  className?: string;
}

export const LinePlot: React.FC<Props> = ({
  title,
  plotData,
  datakey,
  tooltipLabel,
  yAxisDecimals,
  className,
  children,
}) => {
  return (
    <div className={className}>
      <div className="px-2 lg:px-4 pt-2 pb-2 lg:pb-4 bg-gray-400 bg-opacity-60 rounded ">
        <p className="font-bold text-gray-700 text-center">{title}</p>
        <ResponsiveContainer
          className="mt-1.5 bg-white w-full rounded"
          minHeight={150}
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
              tickFormatter={(x: number) => x.toFixed(yAxisDecimals)}
            />
            <Tooltip
              content={
                <CustomTooltip
                  tooltipLabel={tooltipLabel}
                  valueDecimals={yAxisDecimals}
                />
              }
            />
          </LineChart>
        </ResponsiveContainer>
        {children}
      </div>
    </div>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
  tooltipLabel,
  valueDecimals,
}: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value as number;

    return (
      <div className="px-2 py-1 text-sm font-bold bg-gray-700 text-white bg-opacity-75 rounded shadow">
        <p>Time: {label}</p>
        <p>
          {tooltipLabel}: {value.toFixed(valueDecimals)}
        </p>
      </div>
    );
  }
  return null;
};
