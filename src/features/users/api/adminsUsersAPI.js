import api from "../../../app/config/axios"

export const fetchAdmins = () => {
    return api.get('/api/users/admins')
}

export const fetchUsers = () => {
    return api.get('/api/users/users')
}

export const makeAdmin = (userId) => {
    return api.patch(`/api/users/makeAdmin/${userId}`)
}

export const removeAdmin = (adminId) =>
    api.delete(`/api/users/deleteUser/${adminId}`)

export const removeUser = (userId) =>
    api.delete(`/api/users/deleteUser/${userId}`)