import './ManageAccountPage.css'
import AppBar from '../Components/AppBar'
import UserPanel from '../Components/UserPanel'
import { useState } from 'react'
import axios from 'axios'
import SnackBar from '../Components/SnackBar'
import Loading from '../Components/Loading'
import { useStore } from '../Components/useStore'
import { useNavigate } from 'react-router-dom'

export default function ManageAccountPage() {
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [actionPending, setActionPending] = useState()
    const [snackBar, setSnackBar] = useState()
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [dltModal, setDltModal] = useState(false)
    const usernameDisabled = actionPending === 'username' || !newUsername
    const passwordDisabled = actionPending === 'password' || newPassword?.length < 8 || confirmPassword?.length < 8
    const shortPasswords = (newPassword.length < 8 || confirmPassword.length < 8) && (newPassword || confirmPassword)
    const { changeUser, user } = useStore()
    const navigate = useNavigate()

    async function changeUsername(e) {
        e.preventDefault()
        setActionPending('username')
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/changeUsername/${user.id}`, { newUsername })
            setNewUsername('')
            changeUser({ ...user, userName: newUsername })
            setSnackBar({ visible: true, success: true, text: 'Username changed' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: error.status === 401 ? 'Username taken' : error })
        }
        setActionPending(null)
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    async function changePassword(e) {
        e.preventDefault()
        setActionPending('password')
        try {
            if (newPassword === confirmPassword) {
                await axios.put(`${import.meta.env.VITE_API_URL}/changePassword/${user.id}`, { newPassword })
                setNewPassword('')
                setConfirmPassword('')
                setSnackBar({ visible: true, success: true, text: 'Password changed' })
            } else {
                throw error.status === 404
            }
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: error.status === 500 ? 'Error occured, please try again later' : 'Passwords dont match' })
        }
        setActionPending(null)
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
                        <form onSubmit={changeUsername} className="change-username">
                            <input autoComplete='on' value={newUsername} type="text" name="username" id="username" placeholder='New Username' onChange={e => setNewUsername(e.target.value)} />
                            <button disabled={usernameDisabled} style={{ cursor: usernameDisabled ? 'not-allowed' : 'pointer' }}>{actionPending === 'username' ? <Loading size={15} height={'100%'} /> : 'Change'}</button>
                        </form>
                        <hr />
                        <h2>Change Password</h2>
                        <form onSubmit={changePassword} >
                            <section className="change-username">
                                <input value={newPassword} type="password" name="password" id="password" placeholder='New Password' onChange={e => setNewPassword(e.target.value)} />
                                <input value={confirmPassword} type="password" name="confirm-password" id="confirm-password" placeholder='Confirm Password' onChange={e => setConfirmPassword(e.target.value)} />
                                <button type='submit' disabled={passwordDisabled} style={{ cursor: passwordDisabled ? 'not-allowed' : 'pointer' }}>{actionPending === 'password' ? <Loading size={15} height={'100%'} /> : 'Change'}</button>
                            </section>
                            <div className='password-short' style={{ display: shortPasswords ? 'block' : 'none' }}>
                                Both passwords must be at least 8 characters
                            </div>
                        </form>
                        <hr />
                        <h2 id='delete-account-text'>Delete Account</h2>
                        <p>Once you delete your account all your data will be removed.</p>
                        <button id='delete-account-button' onClick={() => setDltModal(true)}
                            disabled={deleteLoading}>{deleteLoading ? <Loading size={15} height={'100%'} /> : 'Delete Account'}</button>
                        {dltModal && <section className='modal' onClick={() => setDltModal(false)}>
                            <article className='dialog-product' onClick={e => e.stopPropagation()}>
                                <strong>Are you sure you want to delete your account ?</strong>
                                <div className='confirm-bttns'>
                                    <button className='delete-bttn' onClick={async () => {
                                        setDeleteLoading(true)
                                        await deleteAccount()
                                        setDeleteLoading(false)
                                    }}>{deleteLoading ? <Loading size={15} height={'100%'} /> : 'Yes'}</button>
                                    <button className='cancel-bttn' onClick={() => setDltModal(false)}>No</button>
                                </div>
                            </article>
                        </section>}
                    </section>
                </section>
                <SnackBar {...snackBar} />
            </main>
        </>
    )
}