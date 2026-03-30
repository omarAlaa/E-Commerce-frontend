import { create } from "zustand"

export const checkoutStore = create((set) => ({
    step: 1,
    orderId: null,

    setStep: (step) => set({ step }),

    setOrderId: (orderId) => set({ orderId })
}))