import { create } from "zustand"

export const adminsUsersStore = create((set, get) => ({
    admins: null,
    filteredAdmins: null,
    users: null,
    filteredUsers: null,
    loading: false,
    headers: ['Email', 'Username', 'Actions'],
    snackBar: null,
    usersSearchTerm: null,
    adminsSearchTerm: null,

    setAdmins: (admins, toSearch) => {
        set({ admins, filteredAdmins: admins })

        if (toSearch && get().adminsSearchTerm?.length > 0) {
            get().searchAdmins(get().adminsSearchTerm)
        }
    },

    setUsers: (users, toSearch) => {
        set({ users, filteredUsers: users })

        if (toSearch) {
            if (get().usersSearchTerm?.length > 0) {
                get().searchUsers(get().usersSearchTerm)
            }

            if (get().adminsSearchTerm?.length > 0) {
                get().searchAdmins(get().adminsSearchTerm)
            }
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