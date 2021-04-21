import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";
import { TStore, useStore } from "../store";

interface Props {
  className?: string;
}

const selector = ({
  nAgents: n_agents,
  nUnhappy: n_unhappy,
  plotData,
}: TStore) => ({
  n_agents,
  n_unhappy,
  plotData,
});

export const Plots: React.FC<Props> = ({ className }) => {
  const { n_agents, n_unhappy, plotData } = useStore(selector);
  // plotData[0].similarNearbyRatio

  return (
    <div className={className}>
      <div className="p-2 bg-gray-400 bg-opacity-60 rounded ">
        <p className="font-bold text-gray-700 text-center">Global similarity</p>
        <ResponsiveContainer
          className="mt-1.5 bg-white w-full rounded"
          height={200}
        >
          <LineChart
            data={plotData}
            margin={{ top: 10, right: 10, bottom: 5, left: 5 }}
          >
            <Line
              dataKey="similarNearbyRatio"
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
      {/* <div>
        <p>Plot 1: Percent similar (# agents) (% similar)</p>
        <p># agents: {n_agents}</p>
        <p>history: {similar_nearby_ratio_history.join(", ")}</p>
      </div>
      <div>
        <p>Plot 2: Number-unhappy (num-unhappy) (%unhappy)</p>
        <p>num-unhappy: {n_unhappy}</p>
        <p>history: {n_unhappy_history.join(", ")}</p>
      </div> */}
    </div>
  );
};

//   <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
//     <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//     <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//     <XAxis dataKey="name" />
//     <YAxis />
//     <Tooltip />
//   </LineChart>
// );
