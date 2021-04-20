import React from "react";
import {
  BoardState,
  BOARD_SIZE_DEFAULTS,
  DENSITY_DEFAULTS,
  SIMILARITY_DEFAULTS,
  TICKS_INFO,
  TStore,
  useStore,
} from "../store";
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
  setBoardSize,
  density,
  setDensity,
  similarity,
  setSimilarity,
  boardState,
  toogleRun,
}: TStore) => ({
  setupEngine,
  step,
  ticksPerSecond,
  setTicksPerSecond,
  boardSize,
  setBoardSize,
  density,
  setDensity,
  similarity,
  setSimilarity,
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
    setBoardSize,
    density,
    setDensity,
    similarity,
    setSimilarity,
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
          className={`flex-1 btn ${
            boardState === BoardState.Running
              ? "bg-green-600 hover:bg-red-700"
              : ""
          } ${
            boardState === BoardState.Finished
              ? "disabled:opacity-100 disabled:bg-green-600"
              : ""
          }`}
          onClick={toogleRun}
          disabled={
            boardState === BoardState.Empty ||
            boardState === BoardState.Finished
          }
        >
          {boardState === BoardState.Finished
            ? "Finished!"
            : boardState === BoardState.Running
            ? "Stop"
            : "Run"}
        </button>
      </div>
      <div className="mt-4 flex flex-col space-y-4">
        <Slider
          title="Ticks per second"
          min={0}
          max={TICKS_INFO.max * 2}
          defaultValue={TICKS_INFO.max + TICKS_INFO.default}
          showValue={ticksPerSecond}
          onChange={setTicksPerSecond}
        />
        <Slider
          title="Board size"
          min={BOARD_SIZE_DEFAULTS.min}
          max={BOARD_SIZE_DEFAULTS.max}
          defaultValue={boardSize}
          showValue={boardSize}
          onChange={setBoardSize}
        />
        <Slider
          title="Density"
          min={DENSITY_DEFAULTS.min}
          max={DENSITY_DEFAULTS.max}
          step={0.01}
          defaultValue={density}
          showValue={density}
          onChange={setDensity}
        />
        <Slider
          title="Similarity wanted"
          min={SIMILARITY_DEFAULTS.min}
          max={SIMILARITY_DEFAULTS.max}
          step={0.01}
          defaultValue={similarity}
          showValue={similarity}
          onChange={setSimilarity}
        />
      </div>
    </div>
  );
};
