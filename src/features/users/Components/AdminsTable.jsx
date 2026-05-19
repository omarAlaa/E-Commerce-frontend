import styles from '../../../shared/components/Table/Table.module.css'
import { adminsUsersStore } from '../store/adminsUsersStore'
import { useState, useEffect } from 'react'
import Loading from '../../../shared/ui/Loading/Loading'
import ConfirmModal from '../../../shared/ui/ConfirmModal/ConfirmModal'
import { fetchAdmins, removeAdmin } from '../api/adminsUsersAPI'
import { uiStore } from '../../../app/store/uiStore'
import Input from '../../../shared/ui/Input/Input'
import Button from '../../../shared/ui/Button/Button'
import NoItemsSection from '../../../shared/ui/NoItemsSection/NoItemsSection'
import Pages from '../../../shared/ui/Pages/Pages'

export default function AdminsTable() {
    const { setAdmins, admins, headers, filteredAdmins, searchAdmins, isAdminsChanged, setIsAdminsChanged, resetSearchParams } = adminsUsersStore()
    const { showSnackBar } = uiStore()
    const [adminToRemove, setAdminToRemove] = useState()
    const [fetchLoading, setFetchLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()

    useEffect(() => {
        resetSearchParams()
    }, [])

    useEffect(() => {
        setFetchLoading(true)

        const getAdmins = async () => {
            try {
                const res = await fetchAdmins(page)
                setAdmins(res.data.admins)
                setTotalPages(res.data.totalPages)
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to fetch admins'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setFetchLoading(false)
            }
        }

        getAdmins()
    }, [page, isAdminsChanged])

    const handleRemoveAdmin = async (adminId) => {
        try {
            await removeAdmin(adminId)
            setIsAdminsChanged()

            showSnackBar({ visible: true, success: true, text: 'Admin removed' })
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to remove admin'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        }
    }

    return (
        <>
            <div className={styles.header}>
                <strong>Admins</strong>

                <div className={styles.searchSection}>
                    <Input type="text" name="adminsSearch" id="adminsSearch" placeholder="Search" onChange={e => searchAdmins(e.target.value)} />
                </div>
            </div>

            {fetchLoading ?
                <Loading />
                :
                !filteredAdmins ?
                    <NoItemsSection message={"Error occured, please try again later"} />
                    :
                    filteredAdmins.length === 0 ?
                        <NoItemsSection message={"No admins found"} />
                        :
                        <section className={styles.container}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>{headers.map(header => <td key={header}>{header}</td>)}</tr>
                                </thead>

                                <tbody>
                                    {filteredAdmins.map(admin => <tr key={admin._id}>
                                        <td className={styles.longData}>{admin.email}</td>

                                        <td>{admin.userName}</td>

                                        <td><Button id={styles.redBttn} onClick={() => { setAdminToRemove(admin) }}>Remove</Button></td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </section>
            }

            <Pages page={page} totalPages={totalPages} changePage={(page) => setPage(page)} id={styles.pages} />

            {adminToRemove && <ConfirmModal
                close={() => setAdminToRemove()}
                message={'Remove admin: ' + adminToRemove.userName + ' ?'}
                action={async () => { await handleRemoveAdmin(adminToRemove._id) }} />}
        </>
    )
}