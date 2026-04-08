import styles from './UserPanel.module.css'
import { ClipboardCheck, AlignJustify, PackageCheck, Users, UserCog, CircleUser } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authStore } from '../../../app/store/authStore'

export default function UserPanel(props) {

    const { user } = authStore()
    const [mobPanel, setMobPanel] = useState('hide')

    return (
        <main className={styles.main}>
            <div className={styles.menuIcon} title='Panel' onClick={() => setMobPanel('show')}>
                <AlignJustify />
            </div>

            <div className={mobPanel === 'show' ? styles.showPanel : mobPanel === 'close' ? styles.closePanel : styles.pcPanel}
                onAnimationEnd={() => { if (mobPanel === 'close') setMobPanel('hide') }}
                onClick={() => setMobPanel('close')}>
                <section className={styles.sidePanel} onClick={e => e.stopPropagation()}>
                    <div className={styles.userInfo}>
                        <CircleUser />

                        <h2 className={styles.userName}>{user?.userName}</h2>
                    </div>

                    <hr />

                    {
                        user?.role === 'user' ?
                            <div className={styles.settings}>
                                <Link to='/manageAccount' className={styles.setting} style={{ background: props.page === 'account' ? 'aqua' : undefined }}>

                                    <UserCog color='blue' />

                                    <h4>Account</h4>
                                </Link>

                                <Link to='/orders' className={styles.setting} style={{ background: props.page === 'orders' ? 'aqua' : undefined }}>
                                    <ClipboardCheck color='green' />

                                    <h4>Orders</h4>
                                </Link>
                            </div>
                            :
                            <div className={styles.settings}>
                                <Link to='/manageProducts' className={styles.setting} style={{ background: props.page === 'products' ? 'aqua' : undefined }}>
                                    <PackageCheck color='green' />

                                    <h4>Manage Products</h4>
                                </Link>

                                <Link to='/manageOrders' className={styles.setting} style={{ background: props.page === 'orders' ? 'aqua' : undefined }}>
                                    <ClipboardCheck color='limegreen' />

                                    <h4>Manage Orders</h4>
                                </Link>

                                <Link to='/manageAdminsUsers' className={styles.setting} style={{ background: props.page === 'admins-users' ? 'aqua' : undefined }}>
                                    <Users color='blue' />

                                    <h4>Manage Admins/Users</h4>
                                </Link>

                                <Link to='/manageAccount' className={styles.setting} style={{ background: props.page === 'account' ? 'aqua' : undefined }}>
                                    <UserCog color='blue' />

                                    <h4>Account</h4>
                                </Link>
                            </div>
                    }

                    <hr />

                </section>
            </div>
        </main>
    )
}