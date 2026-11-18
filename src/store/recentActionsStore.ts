import { IRecentActionsSlice } from "@/constants/interfaces";
import { create } from "zustand";

export const useRecentActionsStore = create<IRecentActionsSlice>(() => ({
  recentActions: [
    {
      iconName: "silverware-fork-knife",
      title: "Столик заказан",
      details: "СенЖак · Сегодня, 19:30",
      colorIndex: 0,
    },
  ],
}));
