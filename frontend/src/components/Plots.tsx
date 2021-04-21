import React from "react";
import { TStore, useStore } from "../store";

interface Props {
  className?: string;
}

const selector = ({
  n_agents,
  n_unhappy,
  similar_nearby_ratio_history,
  n_unhappy_history,
}: TStore) => ({
  n_agents,
  n_unhappy,
  similar_nearby_ratio_history,
  n_unhappy_history,
});

export const Plots: React.FC<Props> = ({ className }) => {
  const {
    n_agents,
  n_unhappy,
    similar_nearby_ratio_history,
    n_unhappy_history,
  } = useStore(selector);

  return (
    <div className={className}>
      <div>
        <p>Plot 1: Percent similar (# agents) (% similar)</p>
        <p># agents: {n_agents}</p>
        <p>history: {similar_nearby_ratio_history.join(", ")}</p>
      </div>
      <div>
        <p>Plot 2: Number-unhappy (num-unhappy) (%unhappy)</p>
        <p>num-unhappy: {n_unhappy}</p>
        <p>history: {n_unhappy_history.join(", ")}</p>
      </div>
    </div>
  );
};
