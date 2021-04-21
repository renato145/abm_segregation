import React from "react";

interface Props {
  className?: string
}

export const Plots: React.FC<Props> = ({className}) => {
  return (
    <div className={className}>
      <p>Plot 1: Percent similar (# agents) (% similar)</p>
      <p>Plot 2: Number-unhappy (num-unhappy) (%unhappy)</p>
    </div>
  );
};