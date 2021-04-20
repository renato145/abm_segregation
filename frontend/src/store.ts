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
  setBoardSize: (x: number) => void;
  density: number;
  setDensity: (x: number) => void;
  similarity: number;
  setSimilarity: (x: number) => void;
  positions: number[][];
  modelTypes: string[];
  boardState: BoardState;
  setupEngine: () => void;
  step: () => void;
  toogleRun: () => void;
};

export const TICKS_INFO = {
  min: 0.2, // 5 seconds for 1 tick
  max: 20, // 20 ticks per second
  default: 5,
};

export const BOARD_SIZE_DEFAULTS = {
  min: 4,
  max: 30,
  default: 15,
};

export const DENSITY_DEFAULTS = {
  min: 0.1,
  max: 0.99,
  default: 0.6,
};

export const SIMILARITY_DEFAULTS = {
  min: 0,
  max: 1,
  default: 0.3,
};

export const useStore = create<TStore>((set, get) => ({
  ticksPerSecond: TICKS_INFO.default,
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
  boardSize: BOARD_SIZE_DEFAULTS.default,
  setBoardSize: (x) => set({ boardSize: x }),
  density: DENSITY_DEFAULTS.default,
  setDensity: (x) => set({ density: x }),
  similarity: SIMILARITY_DEFAULTS.default,
  setSimilarity: (x) =>
    set(({ engine }) => {
      if (engine !== undefined) engine.set_similarity(x);
      return { similarity: x };
    }),
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
    const finished = engine.step();
    set(({ boardState }) => ({
      positions: engine.get_positions(),
      boardState: finished ? BoardState.Finished : boardState,
    }));
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
