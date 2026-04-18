import styles from '../pages/ManageAccount/ManageAccount.module.css'
import { deleteAccount } from '../api/accountAPI'
import { authStore } from '../../../app/store/authStore'
import { uiStore } from '../../../app/store/uiStore'
import ConfirmModal from '../../../shared/ui/ConfirmModal/ConfirmModal'
import { useState } from "react"
import Button from '../../../shared/ui/Button/Button'

export default function DeleteAccountSection() {
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const { showSnackBar } = uiStore()
    const { logout } = authStore()

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount()

            showSnackBar({ visible: true, success: true, text: 'Account deleted' })

            logout()
        } catch (error) {
            if (error.code === 'LOCAL_STORAGE_ERROR') {
                return
            }

            const errorMessage = error?.response?.data?.message || 'Failed to delete account'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        }
    }

    return (
        <>
            <h2 className={styles.delete_account_text}>Delete Account</h2>

            <p className={styles.delete_account_text}>Once you delete your account all your data will be removed.</p>

            <Button id={styles.deleteBttn} onClick={() => setShowConfirmModal(true)}>
                Delete Account
            </Button>

            {showConfirmModal && <ConfirmModal
                close={() => setShowConfirmModal(false)}
                message={'Are you sure you want to delete your account ?'}
                action={handleDeleteAccount}
            />}
        </>
    )
}