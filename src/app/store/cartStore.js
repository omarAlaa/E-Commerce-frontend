import { create } from "zustand"

export const cartStore = create((set) => ({
    cart: null,
    cartFetched: false,

    setCart: (cart) => set({ cart }),

    setCartFetched: (isFetched) => set({ cartFetched: isFetched })
}))