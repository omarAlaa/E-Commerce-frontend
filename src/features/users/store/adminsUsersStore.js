import { create } from "zustand"

export const adminsUsersStore = create((set, get) => ({
    admins: null,
    filteredAdmins: null,

    users: null,
    filteredUsers: null,

    loading: false,

    headers: ['Email', 'Username', 'Actions'],

    usersSearchTerm: null,

    adminsSearchTerm: null,

    isAdminsChanged: false,
    setIsAdminsChanged: () => { set({ isAdminsChanged: !get().isAdminsChanged }) },

    setAdmins: (admins) => {
        set({ admins, filteredAdmins: admins })

        if (get().adminsSearchTerm?.length > 0) {
            get().searchAdmins(get().adminsSearchTerm)
        }
    },

    setUsers: (users) => {
        set({ users, filteredUsers: users })

        if (get().usersSearchTerm?.length > 0) {
            get().searchUsers(get().usersSearchTerm)
        }

        if (get().adminsSearchTerm?.length > 0) {
            get().searchAdmins(get().adminsSearchTerm)
        }
    },

    searchAdmins: (term) => {
        set({
            filteredAdmins: get().admins.filter(admin => admin.email.toLowerCase().includes(term.toLowerCase()) || admin.userName.toLowerCase().includes(term.toLowerCase())),
            adminsSearchTerm: term
        })
    },

    searchUsers: (term) => {
        set({
            filteredUsers: get().users.filter(user => user.email.toLowerCase().includes(term.toLowerCase()) || user.userName.toLowerCase().includes(term.toLowerCase())),
            usersSearchTerm: term
        })
    },
}))