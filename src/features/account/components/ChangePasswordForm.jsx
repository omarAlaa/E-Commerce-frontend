import styles from '../pages/ManageAccount/ManageAccount.module.css'
import { changePassword } from '../api/accountAPI'
import { uiStore } from "../../../app/store/uiStore"
import Loading from "../../../shared/ui/Loading/Loading"
import { useState } from "react"
import Input from "../../../shared/ui/Input/Input"

export default function ChangePasswordForm() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [changePasswordLoading, setChangePasswordLoading] = useState(false)
    const { showSnackBar } = uiStore()

    const passwordDisabled = changePasswordLoading || newPassword?.length < 8 || confirmPassword?.length < 8
    const isShortPasswords = (newPassword.length < 8 || confirmPassword.length < 8) && (newPassword || confirmPassword)

    const handleChangePassword = async (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            showSnackBar({ visible: true, success: false, text: `Passwords don't match` })
            return
        }

        setChangePasswordLoading(true)

        try {
            await changePassword(newPassword)

            showSnackBar({ visible: true, success: true, text: `Passwords chenged` })

            setNewPassword('')
            setConfirmPassword('')
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to change password'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        } finally {
            setChangePasswordLoading(false)
        }
    }

    return (
        <>
            <h2>Change Password</h2>

            <form onSubmit={handleChangePassword} >
                <div className={styles.form}>
                    <Input value={newPassword} type="password" name="password" id="password" placeholder='New Password' onChange={e => setNewPassword(e.target.value)} />

                    <Input value={confirmPassword} type="password" name="confirm-password" id="confirm-password" placeholder='Confirm Password' onChange={e => setConfirmPassword(e.target.value)} />

                    <button className={styles.button}
                        type='submit'
                        disabled={passwordDisabled}
                        style={{ cursor: passwordDisabled ? 'not-allowed' : 'pointer' }}
                    >
                        {changePasswordLoading ? <Loading size={15} height={'100%'} /> : 'Change'}
                    </button>
                </div>

                <div className={isShortPasswords ? styles.short_password : styles.hide}>
                    Both passwords must be at least 8 characters
                </div>
            </form>
        </>
    )
}