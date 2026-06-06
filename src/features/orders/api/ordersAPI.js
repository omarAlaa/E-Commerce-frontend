import api from "../../../app/config/axios"

export const fetchAllOrders = (search, status, page) => {
    return api.get(`/api/orders`, {
        params: {
            search,
            status,
            page,
        },
    })
}

export const fetchUserOrders = (page) => {
    return api.get(`/api/orders/userOrders/${page}`)
}

export const placeOrder = () => {
    return api.post('/api/orders')
}

export const updateOrder = (id, status) => {
    return api.put(`/api/orders/${id}`, { status })
}