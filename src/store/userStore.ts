import { IUserSlice } from "@/constants/interfaces";
import { create } from "zustand";
import avatarUser from "../../assets/images/Icons/avatarUser.png";

export const useUserStore = create<IUserSlice>((set) => ({
  name: "John Doe",
  email: "email@gmail.com",
  avatar: avatarUser,
}));
