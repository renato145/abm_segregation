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
import { LinePlot } from "./LinePlot";

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
      <LinePlot
        title="Global similarity"
        plotData={plotData}
        datakey="similarNearbyRatio"
        tooltipLabel="Similarity"
      />
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
