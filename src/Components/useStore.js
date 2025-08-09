import { create } from "zustand"
import axios from "axios"

export const useStore = create((set, get) => ({
    cart: undefined,
    categories: undefined,
    snackbar: undefined,
    user: JSON.parse(localStorage.getItem('user')),
    fetchCart: async () => {
        if (get().user) {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart/get/${get().user.id}`)
                set({ cart: res.data })
            } catch (error) {
                set({ snackBar: { visible: true, success: false, text: 'Error fetching cart' } })
                setTimeout(() => { set({ snackBar: { ...get().snackBar, visible: false } }) }, 5000)
            }
        } else {
            set({ cart: JSON.parse(localStorage.getItem('cart')) })
        }
    },
    fetchCategories: async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`)
        set({ categories: res.data })
    },
    addToCart: async (product) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/cart/add`, { userId: get().user ? get().user.id : '', oldCart: get().cart, product })
            set({ cart: res.data.userCart, snackBar: { visible: true, success: true, text: 'Product added to cart' } })
            if (!get().user) {
                localStorage.setItem('cart', JSON.stringify(res.data.userCart))
            }
        } catch (error) {
            set({ snackBar: { visible: true, success: false, text: error.status === 403 ? 'Product already in cart' : 'Error occured, please try again later' } })
        }
        setTimeout(() => { set({ snackBar: { ...get().snackBar, visible: false } }) }, 5000)
    },
    changeQuantity: async (title, quantity) => {
        try {
            if (get().cart.items.find(item => item.title === title).quantity + quantity !== 0) {
                const res = await axios.put(`${import.meta.env.VITE_API_URL}/cart/update`, { userId: get().user ? get().user.id : '', oldCart: get().cart, title, quantity })
                set({ cart: res.data.userCart })
                if (!get().user) {
                    localStorage.setItem('cart', JSON.stringify(res.data.userCart))
                }
            }
        } catch (error) {
            set({ snackBar: { visible: true, success: false, text: 'Error occured, please try again later' } })
            setTimeout(() => { set({ snackBar: { ...get().snackBar, visible: false } }) }, 5000)
        }
    },
    deleteFromCart: async (title) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/cart/deleteProduct`, { data: { userId: get().user ? get().user.id : '', oldCart: get().cart, title } })
            set({ cart: res.data.userCart })
            if (!get().user) {
                localStorage.setItem('cart', JSON.stringify(res.data.userCart))
            }
        } catch (error) {
            set({ snackBar: { visible: true, success: false, text: 'Error occured, please try again later' } })
            setTimeout(() => { set({ snackBar: { ...get().snackBar, visible: false } }) }, 5000)
        }
    },
    emptyCart: async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/cart/emptyCart`, { data: { userId: get().user ? get().user.id : '' } })
            set({ cart: { ...get().cart, items: [] } })
            if (!get().user) {
                localStorage.removeItem('cart')
            }
        } catch (error) {
            set({ snackBar: { visible: true, success: false, text: 'Error occured, please try again later' } })
            setTimeout(() => { set({ snackBar: { ...get().snackBar, visible: false } }) }, 5000)
        }
    },
    changeUser: (user) => {
        set({ user: user })
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }
}))