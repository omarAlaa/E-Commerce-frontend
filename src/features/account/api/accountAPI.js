import api from "../../../app/config/axios"

export const changeUsername = (newUsername) =>
    api.patch('/api/users/changeUsername', { newUsername })

export const changePassword = (newPassword) =>
    api.patch('/api/users/changePassword', { newPassword })

export const deleteAccount = () =>
    api.delete('/api/users/deleteAccount')