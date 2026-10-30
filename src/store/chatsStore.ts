import { IChatsSlice } from "@/constants/interfaces";
import { create } from "zustand";

export const useChatsStore = create<IChatsSlice>((set) => ({
  currentChatIndex: 0,
  chats: [
    {
      title: "Новый чат",
      messages: [],
    },
  ],
  setCurrentChatIndex: (index) => set({ currentChatIndex: index }),
  deleteChat: (index) =>
    set((state) => {
      return {
        chats: state.chats.filter((_, chatIndex) => chatIndex !== index),
      };
    }),
  clearChatMessages: (index) =>
    set((state) => {
      return {
        chats: state.chats.map((chat, chatIndex) =>
          chatIndex === index ? { ...chat, messages: [] } : chat,
        ),
      };
    }),
  addChat: (title) =>
    set((state) => ({
      chats: [...state.chats, { title, messages: [] }],
    })),
  updateChatTitle: (index, title) =>
    set((state) => ({
      chats: state.chats.map((chat, chatIndex) =>
        chatIndex === index ? { ...chat, title } : chat,
      ),
    })),
  updateCurrentChatMessages: (updateMessages) =>
    set((state) => ({
      chats: state.chats.map((chat, key) =>
        key === state.currentChatIndex
          ? { ...chat, messages: updateMessages(chat.messages) }
          : chat,
      ),
    })),
}));

/*
chats: [
    {
      title: "Первый чат",
      messages: [
        {
          _id: 1,
          text: "Чат 1. Чего ты хочешь? Требуй, получишь!!!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "John Doe",
            avatar: avatarAI,
          },
        },
      ],
    },
  ],
*/
