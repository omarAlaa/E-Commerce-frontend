import './ManageAccountPage.css'
import AppBar from '../Components/AppBar'
import UserPanel from '../Components/UserPanel'
import { useState } from 'react'
import axios from 'axios'
import SnackBar from '../Components/SnackBar'
import ManageAccountBody from './Components/ManagaAccountBody'
import { useStore } from '../Components/useStore'
import { useNavigate } from 'react-router-dom'

export default function ManageAccountPage() {
    const [snackBar, setSnackBar] = useState()
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
                <ManageAccountBody changeUsername={changeUsername} changePassword={changePassword} deleteAccount={deleteAccount} />
                <SnackBar {...snackBar} />
            </main>
        </>
    )
}