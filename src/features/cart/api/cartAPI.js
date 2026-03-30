import api from "../../../app/config/axios"

export const fetchCart = () => {
    return api.get('api/cart/')
}

export const addToCart = (product) => {
    return api.post(`/api/cart/${product._id}`)
}

export const changeQuantity = (productId, quantity) => {
    return api.put(`/api/cart/${productId}`, { quantity })
}

export const deleteFromCart = (productId) => {
    return api.delete(`/api/cart/deleteProduct/${productId}`)
}

export const emptyCart = () =>
    api.delete('/api/cart/empty')