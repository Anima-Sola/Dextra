import { Platform } from "react-native";

export const lightTheme = {
  colors: {
    text: "#000000",
    background: "#ffffff",
    backgroundElement: "#F0F0F3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
  },
  colors1: {
    mainBackground: "#F8F9FF",
    secondaryBackground: "#FFFFFF",

    mainText: "#11152F",
    secondaryText: "#444B69",

    accent: "#6255FF",

    border: "#E2E5F5",

    shadow: "#7780C5",

    placholderText: "#8188A7",

    actionCardBackgroundColors: ["#FFF0E9", "#E8F1FF", "#F0E9FF", "#E2F7F1"],
    actionCardArrowColors: ["#F56B35", "#2785F5", "#8C56F4", "#34B888"],

    onlineDot: "#49C987",
  },
};

export const darkTheme = {
  colors: {
    text: "#ffffff",
    background: "#000000",
    backgroundElement: "#212225",
    backgroundSelected: "#2E3135",
    textSecondary: "#B0B4BA",
  },
  colors1: {
    mainBackground: "#111216",
    secondaryBackground: "#212225",

    mainText: "#F4F4F5",
    secondaryText: "#B0B4BA",

    accent: "#9B93FF",

    border: "#34363B",

    shadow: "#000000",

    placholderText: "#8A8F98",

    actionCardBackgroundColors: ["#332722", "#222D3D", "#2D263B", "#20332D"],

    actionCardArrowColors: ["#F56B35", "#2785F5", "#8C56F4", "#34B888"],

    onlineDot: "#49C987",
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
});
