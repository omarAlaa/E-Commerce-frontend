import { create } from "zustand"

export const productsStore = create((set, get) => ({
    products: null,
    filteredProducts: null,

    productsChange: false,
    changeProducts: () => { set({ productsChange: !get().productsChange }) },

    setProducts: (products) => { set({ products, filteredProducts: products }) },

    setFilteredProducts: (products) => set({ filteredProducts: products }),
}))