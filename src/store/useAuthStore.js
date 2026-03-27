import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const AUTH_STORAGE_KEY = 'app-session-persist';

const initialState = {
  isAuthenticated: false,
  userEmail: null,
  username: null,
  userProfile: null,
  accessToken: null,
  refreshToken: null,
  isRefreshTokenModalOpen: false,
};

let isRefreshingPromise = null;

const syncLegacySession = ({ access, refresh, email, username, profile }) => {
  if (access) {
    localStorage.setItem('token', access);
  } else {
    localStorage.removeItem('token');
  }

  if (refresh) {
    localStorage.setItem('refreshToken', refresh);
  } else {
    localStorage.removeItem('refreshToken');
  }

  if (email || username || profile) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        email: email || null,
        username: username || null,
        rol: profile || null,
      })
    );
  } else {
    localStorage.removeItem('user');
  }
};

const requestNewTokens = async (currentRefreshToken) => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          access: 'new_dev_access',
          refresh: currentRefreshToken || 'new_dev_refresh',
        }),
      1000
    )
  );
};

const useAuthStore = create()(
  persist(
    (set, get) => ({
      ...initialState,

      login: (session) => {
        syncLegacySession(session);
        set({
          isAuthenticated: true,
          userEmail: session.email || null,
          username: session.username || null,
          userProfile: session.profile || null,
          accessToken: session.access || null,
          refreshToken: session.refresh || null,
          isRefreshTokenModalOpen: false,
        });
      },

      logout: () => {
        syncLegacySession({});
        set({ ...initialState });
      },

      setRefreshTokenModalOpen: (isOpen) => set({ isRefreshTokenModalOpen: isOpen }),

      refreshTokenAction: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          get().logout();
          return;
        }

        if (isRefreshingPromise) {
          return isRefreshingPromise;
        }

        isRefreshingPromise = (async () => {
          try {
            const tokens = await requestNewTokens(refreshToken);
            syncLegacySession({
              access: tokens.access,
              refresh: tokens.refresh || refreshToken,
              email: get().userEmail,
              username: get().username,
              profile: get().userProfile,
            });
            set({
              accessToken: tokens.access,
              refreshToken: tokens.refresh || refreshToken,
              isRefreshTokenModalOpen: false,
            });
          } catch (error) {
            get().logout();
            throw error;
          } finally {
            isRefreshingPromise = null;
          }
        })();

        return isRefreshingPromise;
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userEmail: state.userEmail,
        username: state.username,
        userProfile: state.userProfile,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

export default useAuthStore;
