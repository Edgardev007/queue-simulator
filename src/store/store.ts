// store.ts
import create from 'zustand'

interface State {
  count: boolean;
  increase: () => void;
  decrease: () => void;
}

const useStore = create<State>(set => ({
  count: false,
  increase: () => set(state => ({ count: true})),
  decrease: () => set(state => ({ count: false}))
}));

export default useStore;
