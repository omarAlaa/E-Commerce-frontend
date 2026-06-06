import api from "../../../app/config/axios"

export const fetchProducts = (search, filteredCategory, page) => {
    return api.get(`/api/products/allProducts`, {
        params: {
            search,
            filteredCategory,
            page,
        },
    });
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

export const fetchCategoryProducts = async (category, page) => {
    return await api.get(`/api/products/categoryProducts/${category}/${page}`)
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