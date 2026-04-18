import api from "../../../app/config/axios"

export const fetchCategories = () => {
    return api.get('/api/categories')
}

export const addCategory = (newCategory, imageURL) => {
    return api.post('/api/categories', { name: newCategory, imageURL })
}

export const deleteCategory = (id) =>
    api.delete(`/api/categories/${id}`)