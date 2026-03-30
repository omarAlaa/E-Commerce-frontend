import { create } from "zustand"
import { safeStorage } from "../utilities/safeStorage"

export const authStore = create((set) => ({
    user: safeStorage.get('user'),

    setUser: (user) => {
        set({ user })
        safeStorage.set('user', user)
    },

    logout: () => {
        set({ user: null })
        safeStorage.remove('user')
    }
}))