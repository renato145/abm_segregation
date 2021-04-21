import React from "react";
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
  const lastRead =
    plotData.length > 0 ? plotData[plotData.length - 1] : undefined;

  return (
    <div className={className}>
      <div className="flex flex-col">
        <LinePlot
          title="Global similarity"
          plotData={plotData}
          datakey="similarNearbyRatio"
          tooltipLabel="Similarity"
          yAxisDecimals={1}
        >
          <div className="flex flex-wrap justify-between mt-2 px-2 text-sm font-bold">
            <p>Number of agents: {n_agents}</p>
            {lastRead !== undefined ? (
              <p>
                Current similarity: {lastRead["similarNearbyRatio"].toFixed(2)}
              </p>
            ) : null}
          </div>
        </LinePlot>
        <LinePlot
          className="mt-4"
          title="Number-unhappy"
          plotData={plotData}
          datakey="nUnhappy"
          tooltipLabel="# Unhappy"
          yAxisDecimals={0}
        >
          <div className="flex flex-wrap justify-between mt-2 px-2 text-sm font-bold">
            <p>Number of unhappy: {n_unhappy}</p>
            <p>Unhappy / Total: {(n_unhappy / n_agents).toFixed(2)}</p>
          </div>
        </LinePlot>
      </div>
    </div>
  );
};
