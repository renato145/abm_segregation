import create from "zustand";
import { SegregationEngine } from "engine-wasm";

export enum BoardState {
  Empty,
  Stopped,
  Running,
  Finished,
}

export type TStore = {
  engine?: SegregationEngine;
  ticksPerSecond: number;
  setTicksPerSecond: (x: number) => void;
  boardSize: number;
  density: number;
  similarity: number;
  positions: number[][];
  modelTypes: string[];
  boardState: BoardState;
  setupEngine: () => void;
  step: () => void;
  toogleRun: () => void;
};

export const TICKS_INFO = {
  min: 0.2, // 5 seconds for 1 tick
  max: 10, // 10 ticks per second
};

export const useStore = create<TStore>((set, get) => ({
  ticksPerSecond: 1,
  setTicksPerSecond: (x) => {
    const ticksPerSecond =
      x <= TICKS_INFO.max
        ? +(
            TICKS_INFO.min +
            (x / TICKS_INFO.max) * (1 - TICKS_INFO.min)
          ).toFixed(1)
        : x - TICKS_INFO.max;
    set({ ticksPerSecond });
  },
  boardSize: 20,
  density: 0.65,
  similarity: 30,
  positions: [],
  modelTypes: [],
  boardState: BoardState.Empty,
  setupEngine: () => {
    set(({ boardSize, density, similarity }) => {
      const engine = new SegregationEngine(
        boardSize,
        boardSize,
        density,
        similarity
      );
      const positions = engine.get_positions();
      const modelTypes = engine.get_agent_types();
      return {
        engine,
        positions,
        modelTypes,
        boardState: BoardState.Stopped,
      };
    });
  },
  step: () => {
    const engine = get().engine;
    if (engine === undefined) return;
    engine.step();
    set({ positions: engine.get_positions() });
  },
  toogleRun: () =>
    set(({ boardState }) => ({
      boardState:
        boardState === BoardState.Stopped
          ? BoardState.Running
          : boardState === BoardState.Running
          ? BoardState.Stopped
          : boardState,
    })),
}));
