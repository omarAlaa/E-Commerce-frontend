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
    const [actionUser, setActionUser] = useState()
    const [action, setAction] = useState()
    const [dltLoading, setDltLoading] = useState(false)
    const [adminsUsersChange, setAdminsUsersChange] = useState(false)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/usersAndAdmins`)
            .then(res => res.json())
            .then(data => setAdminsAndUsers(data))
    }, [adminsUsersChange])

    async function remove(user) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/deleteUser/${user.email}`)
            setAdminsUsersChange(!adminsUsersChange)
            setSnackBar({ visible: true, success: true, text: `${user.role} deleted` })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: 'Error occured, please try again later' })
        }
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    async function makeAdmin(user) {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/changeRole`, { email: user.email, newRole: 'admin' })
            setAdminsUsersChange(!adminsUsersChange)
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
                            <Table title='Admins' headers={['email', 'userName', 'action']} rows={adminsAndUsers?.admins} actions={['Remove']}
                                remove={(user) => {
                                    setActionUser(user)
                                    setAction('Remove admin: ')
                                }} />
                            <hr id='users-admins-hr' />
                            <Table title='Users' headers={['email', 'userName', 'action']} rows={adminsAndUsers?.users} actions={['Make Admin', 'Remove']} remove={(user) => {
                                setActionUser(user)
                                setAction('Remove user: ')
                            }} makeAdmin={(user) => {
                                setActionUser(user)
                                setAction('Make admin: ')
                            }} />
                        </>
                        : <Loading />}
                </section>
                {actionUser &&
                    <section className='modal' onClick={() => setActionUser()}>
                        <article className='dialog-product' onClick={e => e.stopPropagation()}>
                            <strong>{action + actionUser.userName + ' ?'}</strong>
                            <div className="confirm-bttns">
                                <button className={action === 'Make admin: ' ? "add-bttn" : 'delete-bttn'}
                                    onClick={async () => {
                                        setDltLoading(true)
                                        action.substring(0, 6) === 'Remove' ? await remove(actionUser) : await makeAdmin(actionUser)
                                        setDltLoading(false)
                                        setActionUser()
                                    }}
                                >{dltLoading ? <Loading size={15} height={'100%'} /> : 'Yes'}</button>
                                <button className="cancel-bttn" onClick={() => setActionUser()}>No</button>
                            </div>
                        </article>
                    </section>}
                <SnackBar {...snackBar} />
            </main>
        </>
    )
}