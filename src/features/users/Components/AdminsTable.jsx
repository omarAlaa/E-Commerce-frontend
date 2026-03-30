import '../../../shared/components/Table/Table.css'
import { adminsUsersStore } from '../store/adminsUsersStore'
import { useState, useEffect } from 'react'
import Loading from '../../../shared/ui/Loading/Loading'
import ConfirmModal from '../../../shared/ui/ConfirmModal/ConfirmModal'
import { fetchAdmins, removeAdmin } from '../api/adminsUsersAPI'
import { uiStore } from '../../../app/store/uiStore'

export default function AdminsTable() {
    const { setAdmins, admins, headers, filteredAdmins, searchAdmins } = adminsUsersStore()
    const { showSnackBar } = uiStore()
    const [adminToRemove, setAdminToRemove] = useState()
    const [fetchLoading, setFetchLoading] = useState(true)

    useEffect(() => {
        const getAdmins = async () => {
            try {
                const res = await fetchAdmins()
                setAdmins(res.data)
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to fetch admins'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setFetchLoading(false)
            }
        }

        getAdmins()
    }, [])

    const handleRemoveAdmin = async (adminId) => {
        try {
            await removeAdmin(adminId)
            setAdmins(admins.filter(admin => admin._id !== adminId), true)

            showSnackBar({ visible: true, success: true, text: 'Admin removed' })
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to remove admin'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        }
    }

    return (
        <>
            <div className="table-header">
                <strong>Admins</strong>

                <div className="search-section">
                    <input type="text" name="search" id="search" placeholder="Search" onChange={e => searchAdmins(e.target.value)} />
                </div>
            </div>

            {fetchLoading ?
                <Loading />
                :
                !filteredAdmins ?
                    <section className="no-items">
                        <h2>Error occured, please try again later</h2>
                    </section>
                    :
                    filteredAdmins.length === 0 ?
                        <section className="no-items">
                            <h2>No admins found</h2>
                        </section>
                        :
                        <section className='table-container'>
                            <table>
                                <thead>
                                    <tr>{headers.map(header => <td key={header}>{header}</td>)}</tr>
                                </thead>

                                <tbody>
                                    {filteredAdmins.map(admin => <tr key={admin._id}>
                                        <td className='long-data'>{admin.email}</td>

                                        <td>{admin.userName}</td>

                                        <td><button onClick={() => { setAdminToRemove(admin) }}>Remove</button></td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </section>
            }

            {adminToRemove && <ConfirmModal
                close={() => setAdminToRemove()}
                message={'Remove admin: ' + adminToRemove.userName + ' ?'}
                action={async () => { await handleRemoveAdmin(adminToRemove._id) }} />}
        </>
    )
}