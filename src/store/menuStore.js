import { create } from 'zustand';

const useMenuStore = create((set) => ({
  collapsed: false,
  toggleCollapsed: (nextValue) =>
    set((state) => ({
      collapsed:
        typeof nextValue === 'boolean'
          ? nextValue
          : !state.collapsed,
    })),
  hideMenu: () => set({ collapsed: false }),
}));

export default useMenuStore;
