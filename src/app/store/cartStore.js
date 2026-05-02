import { create } from "zustand"

export const cartStore = create((set) => ({
    cart: null,
    setCart: (cart) => set({ cart }),

    isCartFetchLoading: true,
    setIsCartFetchLoading: (isCartFetchLoading) => { set({ isCartFetchLoading }) },

    cartFetched: false,
    setCartFetched: (isFetched) => set({ cartFetched: isFetched })
}))