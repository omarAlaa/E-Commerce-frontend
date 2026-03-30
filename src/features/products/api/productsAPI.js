import api from "../../../app/config/axios"

export const fetchProducts = () => {
    return api.get('/api/products/allProducts')
}

export const fetchProduct = (productId) => {
    return api.get(`/api/products/${productId}`)
}

export const fetchNewArrivals = () => {
    return api.get('/api/products/newArrivals')
}

export const fetchPopularProducts = () => {
    return api.get('/api/products/popularProducts')
}

export const fetchCategoryProducts = async (category) => {
    return await api.get(`/api/products/categoryProducts/${category}`)
}

export const addProduct = async (data) => {
    return await api.post('/api/products/', data)
}

export const updateProduct = async (productId, data) => {
    return await api.put(`/api/products/${productId}`, data)
}

export const deleteProduct = async (id) => {
    await api.delete(`/api/products/${id}`)
}