import { create } from "zustand";

const apiUrl = import.meta.env.VITE_API_URL;

export const useAvatarStore = create((set) => ({
  avatar: "",
  setAvatar: (newAvatar) => set({ avatar: newAvatar }),
  getAvatar: async () => {
    const res = await fetch(`${apiUrl}/api/images`);
    const data = await res.json();
    const avatar = data.data.secure_url;
    set({ avatar: avatar });
  },
}));
