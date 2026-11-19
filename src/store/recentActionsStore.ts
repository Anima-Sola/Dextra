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
    {
      iconName: "airplane",
      title: "Билет куплен",
      details: "Москва - Минеральные воды · 07.07.2027, 10:30",
      colorIndex: 1,
    },
    {
      iconName: "bed",
      title: "Номер забронирован",
      details: "Балчуг · 01.01.2027 - 10.01.2027",
      colorIndex: 2,
    },
    {
      iconName: "ticket-confirmation-outline",
      title: "Билет куплен",
      details: "Мельница · 03.02.2027, 18:30",
      colorIndex: 3,
    },
    {
      iconName: "search-web",
      title: "Результаты поиска",
      details: "Смотреть",
      colorIndex: 0,
    },
    {
      iconName: "infinity",
      title: "Все активности",
      details: "Список",
      colorIndex: 1,
    },
  ],
}));
