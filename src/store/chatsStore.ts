import { IChatsSlice } from "@/constants/interfaces";
import { create } from "zustand";

export const useChatsStore = create<IChatsSlice>((set) => ({
  chats: [
    {
      id: "asd",
      title: "Бронирование столика",
      messages: [],
    },
  ],
  addChatMessage: (chatId, message) =>
    set((state) => {
      if (!state.chats.some((chat) => chat.id === chatId)) {
        return state;
      }

      return {
        chats: state.chats.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, message] }
            : chat,
        ),
      };
    }),
  updateMessageStatus: (chatId, messageId, status) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((message) =>
                message.messageId === messageId
                  ? { ...message, status }
                  : message,
              ),
            }
          : chat,
      ),
    })),
}));
