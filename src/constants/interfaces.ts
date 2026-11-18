import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ComponentProps } from "react";
import { ImageSourcePropType } from "react-native";
import { ChatType, MessageType } from "./types";

export interface ISettingsSlice {
  appName: string;
  appIcon: string;
  mode: "light" | "dark" | "system";
  resolvedTheme: "light" | "dark";
  setMode: (mode: "light" | "dark" | "system") => void;
  setResolvedTheme: (theme: "light" | "dark") => void;
}

export interface IChatsSlice {
  currentChatIndex: number;
  chats: Array<ChatType>;
  setCurrentChatIndex: (index: number) => void;
  deleteChat: (index: number) => void;
  clearChatMessages: (index: number) => void;
  addChat: (title: string) => void;
  updateChatTitle: (index: number, title: string) => void;
  updateCurrentChatMessages: (
    updateMessages: (messages: MessageType[]) => MessageType[],
  ) => void;
}

export interface IUserSlice {
  userId: string;
  name: string;
  avatar: ImageSourcePropType | undefined;
  email: string;
}

export interface ITheme {
  colors: {
    text: string;
    background: string;
    backgroundElement: string;
    backgroundSelected: string;
    textSecondary: string;
  };
  colors1: {
    mainBackground: string;
    secondaryBackground: string;
    mainText: string;
    secondaryText: string;
    accent: string;
    border: string;
    shadow: string;
    placholderText: string;
    actionCardBackgroundColors: string[];
    actionCardArrowColors: string[];
  };
}

interface IQuickAction {
  iconName: ComponentProps<typeof MaterialCommunityIcons>["name"];
  titleUp: string;
  titleDown: string;
  colorIndex: number;
}

export interface IQuickActionsSlice {
  quickActions: IQuickAction[];
}

interface IRecentAction {
  iconName: ComponentProps<typeof MaterialCommunityIcons>["name"];
  title: string;
  details: string;
  colorIndex: number;
}

export interface IRecentActionsSlice {
  recentActions: IRecentAction[];
}
