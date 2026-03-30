import api from "../../../app/config/axios"

export const fetchAllOrders = () => {
    return api.get('/api/orders/')
}

export const fetchUserOrders = () => {
    return api.get('/api/orders/userOrders')
}

export const placeOrder = () => {
    return api.post('/api/orders')
}

export const updateOrder = (id, status) => {
    return api.put(`/api/orders/${id}`, { status })
}