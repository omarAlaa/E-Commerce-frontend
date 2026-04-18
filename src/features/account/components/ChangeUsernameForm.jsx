import styles from '../pages/ManageAccount/ManageAccount.module.css'
import { changeUsername } from '../api/accountAPI'
import { authStore } from "../../../app/store/authStore"
import { uiStore } from "../../../app/store/uiStore"
import Loading from "../../../shared/ui/Loading/Loading"
import { useState } from "react"
import Input from "../../../shared/ui/Input/Input"
import Button from "../../../shared/ui/Button/Button"

export default function ChangeUsernameForm() {
    const [newUsername, setNewUsername] = useState('')
    const [changeUsernameLoading, setChangeUsernameLoading] = useState(false)
    const { user, setUser } = authStore()
    const { showSnackBar } = uiStore()

    const usernameDisabled = !newUsername

    const handleChangeUsername = async (e) => {
        e.preventDefault()

        if (newUsername === user.userName) {
            showSnackBar({ visible: true, success: false, text: 'Username not changed' })
            return false
        }

        setChangeUsernameLoading(true)

        try {
            const res = await changeUsername(newUsername)

            showSnackBar({ visible: true, success: true, text: 'Username changed' })

            setNewUsername('')

            setUser({ ...res.data, token: user.token })
        } catch (error) {
            const errorMessage = error.code === 'LOCAL_STORAGE_ERROR' ? 'username changed but ' + error.message : error?.response?.data?.message || 'Failed to change username'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        } finally {
            setChangeUsernameLoading(false)
        }
    }

    return (
        <>
            <h2>Change Username</h2>

            <form onSubmit={handleChangeUsername} className={styles.form}>
                <Input autoComplete='on' value={newUsername} type="text" name="username" id="username" placeholder='New Username' onChange={e => setNewUsername(e.target.value)} />

                <Button id={!usernameDisabled ? styles.changeBttn : styles.disabled} type="submit" disabled={usernameDisabled}>
                    {changeUsernameLoading ? <Loading size={18} height={'100%'} /> : 'Change'}
                </Button>
            </form>
        </>
    )
}