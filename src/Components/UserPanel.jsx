import './UserPanel.css'
import { Link } from 'react-router-dom'
import { ClipboardCheck, AlignJustify, PackageCheck, Users, UserCog, CircleUser } from 'lucide-react'
import { useStore } from '../Components/useStore'
import { useState, useEffect } from 'react'

export default function UserPanel(props) {

    const { user } = useStore()
    const [showMobPanel, setShowMobPanel] = useState(false)

    return (
        <main className='user-panel-main'>
            <div className="menu-icon" title='Panel' onClick={() => setShowMobPanel(true)}>
                <AlignJustify />
            </div>
            <div className={showMobPanel ? 'show panel' : 'hide panel'} onClick={() => setShowMobPanel(false)}>
                <section className='side-panel' onClick={e => e.stopPropagation()}>
                    <article className='user-info'>
                        <CircleUser />
                        <h2>{user?.userName}</h2>
                    </article>
                    <hr />
                    {user?.role === 'user' ?
                        <article className='settings'>
                            <Link to='/manageAccount' className="setting" style={{ background: props.page === 'account' ? 'aqua' : undefined }}>
                                <UserCog color='blue' />
                                <h4>Account</h4>
                            </Link>
                            <Link to='/orders' className="setting" style={{ background: props.page === 'orders' ? 'aqua' : undefined }}>
                                <ClipboardCheck color='green' />
                                <h4>Orders</h4>
                            </Link>
                        </article>
                        :
                        <article className='settings'>
                            <Link to='/manageProducts' className="setting" style={{ background: props.page === 'products' ? 'aqua' : undefined }}>
                                <PackageCheck color='green' />
                                <h4>Manage Products</h4>
                            </Link>
                            <Link to='/manageOrders' className="setting" style={{ background: props.page === 'orders' ? 'aqua' : undefined }}>
                                <ClipboardCheck color='limegreen' />
                                <h4>Manage Orders</h4>
                            </Link>
                            <Link to='/manageAdminsUsers' className="setting" style={{ background: props.page === 'admins-users' ? 'aqua' : undefined }}>
                                <Users color='blue' />
                                <h4>Manage Admins/Users</h4>
                            </Link>
                            <Link to='/manageAccount' className="setting" style={{ background: props.page === 'account' ? 'aqua' : undefined }}>
                                <UserCog color='blue' />
                                <h4>Account</h4>
                            </Link>
                        </article>}
                    <hr />
                </section>
            </div>
        </main>
    )
}