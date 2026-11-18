import { ISettingsSlice } from "@/constants/interfaces";
import { create } from "zustand";

export const useSettingsStore = create<ISettingsSlice>((set) => ({
  appName: "Dextra Agent",
  appIcon: "✦",
  mode: "system",
  resolvedTheme: "light",
  setMode: (mode) => set({ mode }),
  setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
}));
