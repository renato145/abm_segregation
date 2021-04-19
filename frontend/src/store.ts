import create from "zustand";
import { SegregationEngine } from "engine-wasm";

export type TStore = {
  engine?: SegregationEngine;
  boardSize: number;
  density: number;
  similarity: number;
  positions: number[][];
  modelTypes: string[];
  setupEngine: () => void;
  step: () => void;
};

export const useStore = create<TStore>((set, get) => ({
  boardSize: 20,
  density: 0.65,
  similarity: 30,
  positions: [],
  modelTypes: [],
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
      };
    });
  },
  step: () => {
    const engine = get().engine;
    if (engine === undefined) return;
    engine.step();
    set({ positions: engine.get_positions() });
  },
}));
