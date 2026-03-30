import { create } from "zustand"

export const uiStore = create((set) => ({
    snackBar: null,

    showSnackBar: (snackBar) => {
        set({ snackBar })
        setTimeout(() => { set({ snackBar: { visible: false } }) }, 5000)
    },
}))