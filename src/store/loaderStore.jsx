import { create } from 'zustand';

const useMenuStore = create((set) => ({
    loader: false,
    showLoader: () => set({ loader: true }),
    hideLoader: () => set({ loader: false }),
}));

export default useMenuStore;
