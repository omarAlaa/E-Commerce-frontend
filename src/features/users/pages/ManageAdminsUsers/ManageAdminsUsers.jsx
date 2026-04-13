import styles from './ManageAdminsUsers.module.css'
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

            <main className={styles.main}>
                <UserPanel page='admins-users' />

                <hr className={styles.divider} />

                <section className={styles.body}>
                    <header className={styles.header}>
                        <h2>Admins/Users</h2>
                    </header>

                    <AdminsTable />

                    <hr className={styles.tablesDivider} />

                    <UsersTable />
                </section>
            </main>

            <SnackBar {...snackBar} />
        </>
    )
}