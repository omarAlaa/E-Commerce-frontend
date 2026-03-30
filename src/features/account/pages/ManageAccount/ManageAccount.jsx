import './ManageAccount.css'
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

            <main className='manage-account-main'>
                <UserPanel page={'account'} />

                <hr id='hide-hr' />

                <section className="manage-account-section">
                    <header className='upper-panel'>
                        <h2>Account</h2>
                    </header>

                    <section className="manage-account">
                        <ChangeUsernameForm />

                        <hr />

                        <ChangePasswordForm />

                        <hr />

                        <DeleteAccountSection />
                    </section>
                </section>

                <SnackBar {...snackBar} />
            </main>
        </>
    )
}