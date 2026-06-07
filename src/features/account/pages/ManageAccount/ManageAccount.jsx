import styles from './ManageAccount.module.css'
import AppBar from '../../../../shared/layout/AppBar/AppBar'
import UserPanel from '../../../../shared/layout/UserPanel/UserPanel'
import SnackBar from '../../../../shared/ui/SnackBar/SnackBar'
import { uiStore } from '../../../../app/store/uiStore'
import ChangeUsernameForm from '../../components/ChangeUsernameForm'
import ChangePasswordForm from '../../components/ChangePasswordForm'
import DeleteAccountSection from '../../components/DeleteAccountSection'

export default function ManageAccount() {
    const { snackBar } = uiStore()

    return (
        <>
            <AppBar />

            <main className={styles.main}>
                <UserPanel page={'account'} />

                <section className={styles.section}>
                    <header className={styles.header}>
                        <h2>Account</h2>
                    </header>

                    <ChangeUsernameForm />

                    <hr />

                    <ChangePasswordForm />

                    <hr />

                    <DeleteAccountSection />
                </section>
            </main>

            <SnackBar {...snackBar} />
        </>
    )
}