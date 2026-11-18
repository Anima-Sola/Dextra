import { IQuickActionsSlice } from "@/constants/interfaces";
import { create } from "zustand";

export const useQuickActionsStore = create<IQuickActionsSlice>(() => ({
  quickActions: [
    {
      iconName: "silverware-fork-knife",
      titleUp: "Найти столик",
      titleDown: "в ресторане",
      colorIndex: 0,
    },
    {
      iconName: "airplane",
      titleUp: "Купить",
      titleDown: "билеты",
      colorIndex: 1,
    },
    {
      iconName: "bed",
      titleUp: "Бронировать",
      titleDown: "отель",
      colorIndex: 2,
    },
    {
      iconName: "ticket-confirmation-outline",
      titleUp: "Купить билеты",
      titleDown: "на событие",
      colorIndex: 3,
    },
    {
      iconName: "search-web",
      titleUp: "Найти в",
      titleDown: "интернете",
      colorIndex: 0,
    },
  ],
}));
