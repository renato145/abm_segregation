import create from "zustand";
import { SegregationEngine, TPositions, TAgentType } from "engine-wasm";

export enum BoardState {
  Empty,
  Stopped,
  Running,
  Finished,
}

export const TICKS_INFO = {
  min: 0.2, // 5 seconds for 1 tick
  max: 20, // 20 ticks per second
  default: 5,
};

export const BOARD_SIZE_DEFAULTS = {
  min: 4,
  max: 25,
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
  default: 0.75,
};

export type TStore = {
  engine?: SegregationEngine;
  nAgents: number;
  ticksPerSecond: number;
  setTicksPerSecond: (x: number) => void;
  boardSize: number;
  setBoardSize: (x: number) => void;
  density: number;
  setDensity: (x: number) => void;
  similarity: number;
  setSimilarity: (x: number) => void;
  positions: TPositions;
  modelTypes: TAgentType;
  boardState: BoardState;
  setupEngine: () => void;
  step: () => void;
  toogleRun: () => void;
  nUnhappy: number;
  plotData: {
    similarNearbyRatio: number;
    nUnhappy: number;
  }[];
};

export const useStore = create<TStore>((set, get) => ({
  nAgents: 0,
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
      const nUnhappy = engine.n_unhappy();

      return {
        engine,
        nAgents: engine.n_agents(),
        positions: engine.get_positions(),
        modelTypes: engine.get_agent_types(),
        boardState: BoardState.Stopped,
        nUnhappy: nUnhappy,
        plotData: [
          { nUnhappy, similarNearbyRatio: engine.get_similar_nearby_ratio() },
        ],
      };
    });
  },
  step: () => {
    const engine = get().engine;
    if (engine === undefined) return;
    const { finished, similar_nearby_ratio, n_unhappy } = engine.step();
    set(({ boardState, plotData }) => ({
      positions: engine.get_positions(),
      boardState: finished ? BoardState.Finished : boardState,
      plotData: plotData.concat({
        nUnhappy: n_unhappy,
        similarNearbyRatio: similar_nearby_ratio,
      }),
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
  nUnhappy: 0,
  plotData: [],
}));
