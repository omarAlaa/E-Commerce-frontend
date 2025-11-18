import './ManageAccountPage.css'
import AppBar from '../Components/AppBar'
import UserPanel from '../Components/UserPanel'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import axios from 'axios'
import SnackBar from '../Components/SnackBar'
import Loading from '../Components/Loading'
import { useStore } from '../Components/useStore'
import { useNavigate } from 'react-router-dom'

function ChangeUsernameButton() {
    const { pending } = useFormStatus()
    return (
        <button disabled={pending}>{pending ? <Loading size={15} height={'100%'} /> : 'Change'}</button>
    )
}

function ChangePasswordButton() {
    const { pending } = useFormStatus()
    return (
        <button disabled={pending}>{pending ? <Loading size={15} height={'100%'} /> : 'Change'}</button>
    )
}

export default function ManageAccountPage() {
    const [snackBar, setSnackBar] = useState()
    const [deleteLoading, setDeleteLoading] = useState(false)
    const { changeUser, user } = useStore()
    const navigate = useNavigate()

    async function changeUsername(data) {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/changeUsername/${user.id}`, { newUsername: data.get('username') })
            changeUser({ ...user, userName: data.get('username') })
            setSnackBar({ visible: true, success: true, text: 'Username changed' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: error.status === 401 ? 'Username taken' : 'Error occured, please try again later' })
        }
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    async function changePassword(data) {
        try {
            if (data.get('password') === data.get('confirm-password')) {
                await axios.put(`${import.meta.env.VITE_API_URL}/changePassword/${user.id}`, { newPassword: data.get('password') })
                setSnackBar({ visible: true, success: true, text: 'Password changed' })
            } else {
                throw error.status === 404
            }
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: error.status === 500 ? 'Error occured, please try again later' : 'Passwords dont match' })
        }
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    async function deleteAccount() {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/deleteAccount/${user.id}`)
            setSnackBar({ visible: true, success: true, text: 'Account deleted' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: 'Error occured, please try again later' })
        }
        setTimeout(() => {
            setSnackBar({ ...snackBar, visible: false })
            navigate('/register')
        }, 2000)

    }

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
                        <h2>Change Username</h2>
                        <form action={changeUsername} className="change-username">
                            <input autoComplete='on' type="text" name="username" id="username" placeholder='New Username' />
                            <ChangeUsernameButton />
                        </form>
                        <hr />
                        <h2>Change Password</h2>
                        <form action={changePassword} className="change-username">
                            <input type="password" name="password" id="password" placeholder='New Password' />
                            <input type="password" name="confirm-password" id="confirm-password" placeholder='Confirm Password' />
                            <ChangePasswordButton />
                        </form>
                        <hr />
                        <h2 id='delete-account-text'>Delete Account</h2>
                        <p>Once you delete your account all your data will be removed.</p>
                        <button id='delete-account-button' onClick={async () => {
                            setDeleteLoading(true)
                            await deleteAccount()
                            setDeleteLoading(false)

                        }}
                            disabled={deleteLoading}>{deleteLoading ? <Loading size={15} height={'100%'} /> : 'Delete Account'}</button>
                    </section>
                </section>
                <SnackBar {...snackBar} />
            </main>
        </>
    )
}