import React from "react";
import { BoardState, TStore, useStore } from "../store";

interface Props {
  className: string;
}

const selector = ({
  setupEngine,
  step,
  boardSize,
  density,
  similarity,
  boardState,
  toogleRun,
}: TStore) => ({
  setupEngine,
  step,
  boardSize,
  density,
  similarity,
  boardState,
  toogleRun,
});

export const Controls: React.FC<Props> = ({ className }) => {
  const {
    setupEngine,
    step,
    boardSize,
    density,
    similarity,
    boardState,
    toogleRun,
  } = useStore(selector);

  return (
    <div className={className}>
      <div className="flex flex-wrap space-x-2 justify-between">
        <button
          className="flex-1 btn"
          onClick={setupEngine}
        >
          Setup
        </button>
        <button
          className="flex-1 btn"
          onClick={step}
          disabled={boardState !== BoardState.Stopped}
        >
          1-step
        </button>
        <button
          className={`flex-1 btn ${boardState ? "bg-green-600" : ""}`}
          onClick={toogleRun}
          disabled={
            boardState === BoardState.Empty ||
            boardState === BoardState.Finished
          }
        >
          Run
        </button>
      </div>
      <p className="mt-4">Board size = {boardSize}</p>
      <p>Density slider = {density}</p>
      <p>% Similarity wanted slider = {similarity}</p>
    </div>
  );
};
