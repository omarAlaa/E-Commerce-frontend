import api from "../../../app/config/axios"

export const fetchAdmins = (search, page) => {
    return api.get(`/api/users/admins`, {
        params: {
            search,
            page,
        },
    })
}

export const fetchUsers = (search, page) => {
    return api.get(`/api/users/users`, {
        params: {
            search,
            page,
        },
    })
}

export const makeAdmin = (userId) => {
    return api.patch(`/api/users/makeAdmin/${userId}`)
}

export const removeAdmin = (adminId) =>
    api.delete(`/api/users/deleteUser/${adminId}`)

export const removeUser = (userId) =>
    api.delete(`/api/users/deleteUser/${userId}`)