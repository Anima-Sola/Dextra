import { useSettingsStore } from "@/store/settingsStore";
import { darkTheme, lightTheme } from "../constants/theme";

export const useTheme = () => {
  const mode = useSettingsStore((state) => state.mode);
  const resolvedTheme = useSettingsStore((state) => state.resolvedTheme);
  const themeKey = mode === "system" ? resolvedTheme : mode;
  const theme = themeKey === "dark" ? darkTheme : lightTheme;
  return theme;
};
