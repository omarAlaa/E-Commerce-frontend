import './ManageAdminsUsers.css'
import AppBar from '../Components/AppBar'
import UserPanel from '../Components/UserPanel'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SnackBar from '../Components/SnackBar'
import Table from '../Components/Table'
import Loading from '../Components/Loading'

export default function ManageAdminsUsers() {
    const [adminsAndUsers, setAdminsAndUsers] = useState()
    const [snackBar, setSnackBar] = useState()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/usersAndAdmins`)
            .then(res => res.json())
            .then(data => setAdminsAndUsers(data))
    }, [snackBar?.text])

    async function remove(email, role) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/deleteUser/${email}`)
            setSnackBar({ visible: true, success: true, text: `${role} deleted` })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: 'Error occured, please try again later' })
        }
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    async function makeAdmin(email) {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/changeRole`, { email: email, newRole: 'admin' })
            setSnackBar({ visible: true, success: true, text: 'Admin added' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: 'Error occured, please try again later' })
        }
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    return (
        <>
            <AppBar />
            <main className="manage-admins-users-main">
                <UserPanel page='admins-users' />
                <hr id='hide-hr' />
                <section className="manage-admins-users-body">
                    <header className='upper-panel'><h2>Admins/Users</h2></header>
                    {adminsAndUsers ?
                        <>
                            <Table title='Admins' headers={['email', 'userName', 'action']} rows={adminsAndUsers?.admins} actions={['Remove']} remove={remove} />
                            <hr id='users-admins-hr' />
                            <Table title='Users' headers={['email', 'userName', 'action']} rows={adminsAndUsers?.users} actions={['Make Admin', 'Remove']} remove={remove} makeAdmin={makeAdmin} />
                        </>
                        : <Loading />}
                </section>
                <SnackBar {...snackBar} />
            </main>
        </>
    )
}