import React from "react";
import { BoardState, TICKS_INFO, TStore, useStore } from "../store";
import { Slider } from "./Slider";

interface Props {
  className: string;
}

const selector = ({
  setupEngine,
  step,
  ticksPerSecond,
  setTicksPerSecond,
  boardSize,
  density,
  similarity,
  boardState,
  toogleRun,
}: TStore) => ({
  setupEngine,
  step,
  ticksPerSecond,
  setTicksPerSecond,
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
    ticksPerSecond,
    setTicksPerSecond,
    boardSize,
    density,
    similarity,
    boardState,
    toogleRun,
  } = useStore(selector);

  return (
    <div className={className}>
      <div className="flex flex-wrap space-x-2 justify-between">
        <button className="flex-1 btn" onClick={setupEngine}>
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
          className={`flex-1 btn ${boardState === BoardState.Running ? "bg-green-600 hover:bg-red-700" : ""}`}
          onClick={toogleRun}
          disabled={
            boardState === BoardState.Empty ||
            boardState === BoardState.Finished
          }
        >
          {boardState === BoardState.Running ? "Stop" : "Run"}
        </button>
      </div>
      <div className="mt-4 flex flex-col space-y-4">
        {/* Ticks per second: min-> 5 seconds per tick... max -> 10 ticks per second*/}
        <Slider
          title="Ticks per second"
          min={0}
          max={TICKS_INFO.max * 2}
          value={TICKS_INFO.max}
          showValue={ticksPerSecond}
          onChange={setTicksPerSecond}
        />
        <Slider title="Board size" />
        <Slider title="Density" />
        <Slider title="Similarity wanted" />
      </div>
    </div>
  );
};
