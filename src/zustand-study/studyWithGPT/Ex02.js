import { create } from 'zustand';

const useStoreEx02 = create((set) => ({
  countHello: 0,
  text: 'Hello',
  increase: () => set((state) => ({ countHello: state.countHello + 1 })),
}));

export default useStoreEx02;
