import { create } from "zustand";

interface Count {
  count: number;
  up: () => void;
  down: () => void;
  reset: () => void;
}

export const useCount = create<Count> ((set) => ({
  count: 0,

  up: () => set((state) => ({count: state.count + 1})),
  down: () => set((state) => ({count: state.count - 1})),
  reset: () => set(({count: 0})) 
}))