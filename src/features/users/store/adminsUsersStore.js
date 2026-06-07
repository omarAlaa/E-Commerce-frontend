import { create } from "zustand"

export const adminsUsersStore = create((set, get) => ({
    headers: ['Email', 'Username', 'Actions'],

    isAdminsChanged: false,
    setIsAdminsChanged: () => { set({ isAdminsChanged: !get().isAdminsChanged }) },
}))