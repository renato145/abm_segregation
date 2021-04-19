import create from "zustand";
import { SegregationEngine } from "engine-wasm";

export type TStore = {
  engine?: SegregationEngine;
  boardSize: number;
  density: number;
  similarity: number;
  positions: Array<number>[];
  modelTypes: string[];
  setupEngine: () => void;
};

export const useStore = create<TStore>((set, get) => ({
  boardSize: 20,
  density: 0.65,
  similarity: 30,
  positions: Array(),
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
}));
