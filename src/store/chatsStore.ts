import { IChatsSlice } from "@/constants/interfaces";
import avatarAI from "../../assets/images/Icons/avatarAI.png";
import { create } from "zustand";

export const useChatsStore = create<IChatsSlice>((set) => ({
  currentChatIndex: 0,
  chats: [
    {
      title: "Первый чат",
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "John Doe",
            avatar: avatarAI,
          },
        },
      ],
    },
    {
      title: "Второй чат",
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Michael Kors",
            avatar: avatarAI,
          },
        },
      ],
    },
  ],
  setCurrentChatIndex: (index) => set({ currentChatIndex: index }),
}));
