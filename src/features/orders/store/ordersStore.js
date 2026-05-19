import { create } from "zustand"

export const ordersStore = create((set, get) => ({
    orders: null,
    filteredOrders: null,
    orderToReview: null,

    setOrderToReview: (order) => set({ orderToReview: order }),

    searchTerm: null,
    statusFilter: null,

    resetSearchParams: () => { set({ searchTerm: null, statusFilter: null }) },

    setOrders: (orders) => {
        set({ orders, filteredOrders: orders })

        if (get().searchTerm) {
            get().searchOrders(get().searchTerm)
            return
        }

        if (get().statusFilter) {
            get().searchOrders(get().statusFilter, 'status')
        }
    },

    searchOrders: (term, type) => {
        if (type === 'status') {
            set({ statusFilter: term === 'All orders' ? null : term })

            if (get().searchTerm?.length > 0) {
                if (term === 'All orders') {
                    set({ filteredOrders: get().orders.filter(order => order._id.toLowerCase().includes(get().searchTerm.toLowerCase())) })
                    return
                }

                set({ filteredOrders: get().orders.filter(order => order.status === get().statusFilter && order._id.toLowerCase().includes(get().searchTerm.toLowerCase())) })
                return
            }

            if (term === 'All orders') {
                set({ filteredOrders: get().orders })
                return
            }

            set({ filteredOrders: get().orders.filter(order => order.status === term) })
        } else {
            set({ searchTerm: term })

            if (get().statusFilter) {
                set({ filteredOrders: get().orders.filter(order => order.status === get().statusFilter && order._id.toLowerCase().includes(term.toLowerCase())) })
                return
            }

            set({ filteredOrders: get().orders.filter(order => order._id.toLowerCase().includes(term.toLowerCase())) })
        }
    }
}))