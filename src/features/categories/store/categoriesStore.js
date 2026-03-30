import { create } from "zustand"

export const categoriesStore = create((set) => ({
    categories: null,
    categoriesFetched: false,
    showCatModal: false,

    setCategories: (categories) => set({ categories }),

    setCategoriesFetched: (isFetched) => set({ categoriesFetched: isFetched }),

    setShowCatModal: (flag) => set({ showCatModal: flag })
}))