import styles from '../../../shared/components/Table/Table.module.css'
import { adminsUsersStore } from '../store/adminsUsersStore'
import { useState, useEffect } from 'react'
import Loading from '../../../shared/ui/Loading/Loading'
import ConfirmModal from '../../../shared/ui/ConfirmModal/ConfirmModal'
import { fetchUsers, removeUser, makeAdmin } from '../api/adminsUsersAPI'
import { uiStore } from '../../../app/store/uiStore'

export default function UsersTable() {
    const { setUsers, setAdmins, users, admins, headers, filteredUsers, searchUsers } = adminsUsersStore()
    const { showSnackBar } = uiStore()
    const [actionUser, setActionUser] = useState()
    const [action, setAction] = useState()
    const [fetchLoading, setFetchLoading] = useState(true)

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetchUsers()
                setUsers(res.data)
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to fetch users'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setFetchLoading(false)
            }
        }

        getUsers()
    }, [])

    const handleMakeAdmin = async (userId) => {
        try {
            const res = await makeAdmin(userId)

            setAdmins([res.data, ...admins])

            setUsers(users.filter(user => user._id !== userId), true)

            showSnackBar({ visible: true, success: true, text: 'Admin added' })
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to add admin'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        }
    }

    const handleRemoveUser = async (userId) => {
        try {
            await removeUser(userId)

            setUsers(users.filter(user => user._id !== userId), true)

            showSnackBar({ visible: true, success: true, text: 'User removed' })
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to remove user'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        }
    }

    return (
        <>
            <div className={styles.header}>
                <strong>Users</strong>

                <div className={styles.searchSection}>
                    <input className={styles.input} type="text" name="search" id="search" placeholder="Search" onChange={e => searchUsers(e.target.value)} />
                </div>
            </div>

            {fetchLoading ?
                <Loading />
                :
                !filteredUsers ?
                    <section className="no-items">
                        <h2>Error occured, please try again later</h2>
                    </section>
                    :
                    filteredUsers.length === 0 ?
                        <section className="no-items">
                            <h2>No users found</h2>
                        </section>
                        :
                        <section className={styles.container}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>{headers.map(header => <td key={header}>{header}</td>)}</tr>
                                </thead>

                                <tbody>
                                    {filteredUsers.map(user => <tr key={user._id}>
                                        <td>{user.email}</td>

                                        <td>{user.userName}</td>

                                        <td>
                                            <button onClick={() => {
                                                setActionUser(user)
                                                setAction('Make admin: ')
                                            }} className={styles.whiteBttn}>Make Admin</button>

                                            <button className={styles.redBttn}
                                                onClick={() => {
                                                    setActionUser(user)
                                                    setAction('Remove user: ')
                                                }} >Remove</button>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </section>}

            {actionUser && <ConfirmModal
                close={() => setActionUser()}
                message={action + actionUser.userName + ' ?'}
                action={async () => { action.substring(0, 6) === 'Remove' ? await handleRemoveUser(actionUser._id) : await handleMakeAdmin(actionUser._id) }} />}
        </>
    )
}