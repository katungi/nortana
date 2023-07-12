import { create } from 'zustand';

interface UserState {
  token: string | undefined;
  name: string | undefined;
  email: string | undefined;
  setUser: (user: UserState) => void;
}

const useUserStore = create<UserState>((set) => ({
  name: undefined,
  email: undefined,
  token: undefined,
  setUser: () => set((state) => ({
    token: state.token,
    name: state.name,
    email: state.email,
  })),
}));

export default useUserStore;
