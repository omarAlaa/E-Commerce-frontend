import { create } from "zustand"

export const productsStore = create((set, get) => ({
    productsModified: false,
    modifyProducts: () => { set({ productsModified: !get().productsModified }) },
}))