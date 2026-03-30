import api from "../../../app/config/axios"

export const fetchCategories = () => {
    return api.get('/api/categories')
}

export const addCategory = (newCategory) => {
    return api.post('/api/categories', { name: newCategory })
}

export const deleteCategory = (id) =>
    api.delete(`/api/categories/${id}`)