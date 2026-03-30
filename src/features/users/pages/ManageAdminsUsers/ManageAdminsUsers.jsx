import './ManageAdminsUsers.css'
import AppBar from '../../../../shared/layout/AppBar/AppBar'
import UserPanel from '../../../../shared/layout/UserPanel/UserPanel'
import AdminsTable from '../../Components/AdminsTable'
import UsersTable from '../../Components/UsersTable'
import SnackBar from '../../../../shared/ui/SnackBar/SnackBar'
import { uiStore } from '../../../../app/store/uiStore'

export default function ManageAdminsUsers() {
    const { snackBar } = uiStore()

    return (
        <>
            <AppBar />

            <main className="manage-admins-users-main">
                <UserPanel page='admins-users' />

                <hr id='hide-hr' />

                <section className="manage-admins-users-body">
                    <header className='upper-panel'><h2>Admins/Users</h2></header>

                    <AdminsTable />

                    <hr id='users-admins-hr' />

                    <UsersTable />
                </section>
            </main>

            <SnackBar {...snackBar} />
        </>
    )
}