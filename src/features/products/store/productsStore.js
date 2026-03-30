import { create } from "zustand"

export const productsStore = create((set, get) => ({
    products: null,
    filteredProducts: null,
    productToUpdate: null,

    searchTerm: null,
    categoryFilter: null,

    setProducts: (products, toSearch) => {
        set({ products, filteredProducts: products })

        if (toSearch) {
            if (get().searchTerm) {
                get().searchProducts(get().searchTerm)
                return
            }

            if (get().categoryFilter) {
                get().searchProducts(get().categoryFilter, 'categories')
            }
        }
    },

    setFilteredProducts: (products) => set({ filteredProducts: products }),

    addNewProduct: (product) => {
        set({ products: [product, ...get().products], filteredProducts: [product, ...get().products] })

        if (get().searchTerm) {
            get().searchProducts(get().searchTerm)
            return
        }

        if (get().categoryFilter) {
            get().searchProducts(get().categoryFilter, 'categories')
        }
    },

    setProductToUpdate: (product) => set({ productToUpdate: product }),
    closeUpdate: () => set({ productToUpdate: null }),

    searchProducts: (term, type) => {
        if (type === 'categories') {
            set({ categoryFilter: term === 'All Products' ? null : term })

            if (get().searchTerm?.length > 0) {
                if (term === 'All Products') {
                    set({ filteredProducts: get().products.filter(product => product.title.toLowerCase().includes(get().searchTerm.toLowerCase())) })
                    return
                }

                set({ filteredProducts: get().products.filter(product => product.category === get().categoryFilter && product.title.toLowerCase().includes(get().searchTerm.toLowerCase())) })
                return
            }

            if (term === 'All Products') {
                set({ filteredProducts: get().products })
                return
            }

            set({ filteredProducts: get().products.filter(product => product.category === term) })
        } else {
            set({ searchTerm: term })

            if (get().categoryFilter) {
                set({ filteredProducts: get().products.filter(product => product.category === get().categoryFilter && product.title.toLowerCase().includes(term?.toLowerCase())) })
                return
            }

            set({ filteredProducts: get().products.filter(product => product.title.toLowerCase().includes(term.toLowerCase())) })
        }
    }
}))