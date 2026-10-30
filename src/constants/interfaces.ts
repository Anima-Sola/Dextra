import { ImageSourcePropType } from "react-native";
import { ChatType, MessageType } from "./types";

export interface ISettingsSlice {
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
}
