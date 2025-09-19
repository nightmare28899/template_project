import { create } from 'zustand';

const useMenuStore = create((set) => ({
    collapsed: false,
    toggleCollapsed: () => set((state) => {
        const newCollapsed = !state.collapsed;
        return { collapsed: newCollapsed };
    }),
    hideMenu: () => set(({ collapsed: false })),
}));

export default useMenuStore;
