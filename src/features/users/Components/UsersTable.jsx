import styles from '../../../shared/components/Table/Table.module.css'
import { adminsUsersStore } from '../store/adminsUsersStore'
import { useState, useEffect } from 'react'
import Loading from '../../../shared/ui/Loading/Loading'
import ConfirmModal from '../../../shared/ui/ConfirmModal/ConfirmModal'
import { fetchUsers, removeUser, makeAdmin } from '../api/adminsUsersAPI'
import { uiStore } from '../../../app/store/uiStore'
import Input from '../../../shared/ui/Input/Input'
import Button from '../../../shared/ui/Button/Button'
import NoItemsSection from '../../../shared/ui/NoItemsSection/NoItemsSection'
import Pages from '../../../shared/ui/Pages/Pages'
import { useDebouncedCallback } from 'use-debounce'

export default function UsersTable() {
    const [users, setUsers] = useState()
    const [search, setSearch] = useState()
    const { headers } = adminsUsersStore()
    const { showSnackBar } = uiStore()
    const [actionUser, setActionUser] = useState()
    const [action, setAction] = useState()
    const [fetchLoading, setFetchLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [isUsersChanged, setIsUsersChanged] = useState(false)

    useEffect(() => {
        getUsers(search)
    }, [page])

    const getUsers = async (search) => {
        setFetchLoading(true)
        setSearch(search)

        if (search) {
            setPage(1)
        }

        try {
            const res = await fetchUsers(search, page)
            setUsers(res.data.users)
            setTotalPages(res.data.totalPages)
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to fetch users'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        } finally {
            setFetchLoading(false)
        }
    }

    const handleSearch = useDebouncedCallback((search) => {
        getUsers(search)
    }, 600)

    const handleMakeAdmin = async (userId) => {
        try {
            const res = await makeAdmin(userId)

            setIsAdminsChanged()

            setIsUsersChanged(!isUsersChanged)

            showSnackBar({ visible: true, success: true, text: 'Admin added' })
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to add admin'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        }
    }

    const handleRemoveUser = async (userId) => {
        try {
            await removeUser(userId)

            setIsUsersChanged(!isUsersChanged)

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
                    <Input type="text" name="usersSearch" id="usersSearch" placeholder="Search" onChange={e => handleSearch(e.target.value)} />
                </div>
            </div>

            {fetchLoading ?
                <Loading />
                :
                !users ?
                    <NoItemsSection message={"Error occured, please try again later"} />
                    :
                    users.length === 0 ?
                        <NoItemsSection message={"No users found"} />
                        :
                        <section className={styles.container}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>{headers.map(header => <td key={header}>{header}</td>)}</tr>
                                </thead>

                                <tbody>
                                    {users.map(user => <tr key={user._id}>
                                        <td>{user.email}</td>

                                        <td>{user.userName}</td>

                                        <td>
                                            <Button onClick={() => {
                                                setActionUser(user)
                                                setAction('Make admin: ')
                                            }} id={styles.whiteBttn}>Make Admin</Button>

                                            <Button id={styles.redBttn}
                                                onClick={() => {
                                                    setActionUser(user)
                                                    setAction('Remove user: ')
                                                }} >Remove</Button>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </section>}

            <Pages page={page} totalPages={totalPages} changePage={(page) => setPage(page)} id={styles.pages} />

            {actionUser && <ConfirmModal
                close={() => setActionUser()}
                message={action + actionUser.userName + ' ?'}
                action={async () => { action.substring(0, 6) === 'Remove' ? await handleRemoveUser(actionUser._id) : await handleMakeAdmin(actionUser._id) }} />}
        </>
    )
}