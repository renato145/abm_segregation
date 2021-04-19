import React from "react";
import { TStore, useStore } from "../store";

interface Props {
  className: string;
}

const selector = ({
  setupEngine,
  step,
  boardSize,
  density,
  similarity,
}: TStore) => ({
  setupEngine,
  step,
  boardSize,
  density,
  similarity,
});

export const Controls: React.FC<Props> = ({ className }) => {
  const { setupEngine, step, boardSize, density, similarity } = useStore(
    selector
  );

  return (
    <div className={className}>
      <div className="flex flex-wrap space-x-2 justify-between">
        <button className="flex-1 btn" onClick={setupEngine}>
          Setup
        </button>
        <button className="flex-1 btn" onClick={step}>
          1-step
        </button>
        <button className="flex-1 btn">Run</button>
      </div>
      <p className="mt-4">Board size = {boardSize}</p>
      <p>Density slider = {density}</p>
      <p>% Similarity wanted slider = {similarity}</p>
    </div>
  );
};
