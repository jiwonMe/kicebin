import { User } from 'firebase/auth';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(devtools((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),
    removeUser: () => set(() => ({ user: null })),
  })),
  {
    name: 'user',
    storage: createJSONStorage(() => localStorage),
  })
);
