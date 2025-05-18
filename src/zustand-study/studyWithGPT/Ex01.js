import { create } from 'zustand';

const useCounterStore = create((set) => ({
  count: 0, //state
  increase: () => set((state) => ({ count: state.count + 1 })), // action
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export default useCounterStore;
