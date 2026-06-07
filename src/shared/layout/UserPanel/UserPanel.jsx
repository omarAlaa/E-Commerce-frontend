import styles from './UserPanel.module.css'
import { ClipboardCheck, AlignJustify, PackageCheck, Users, UserCog, CircleUser, LogOut } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authStore } from '../../../app/store/authStore'
import { useNavigate } from 'react-router-dom'

export default function UserPanel(props) {
    const [mobPanel, setMobPanel] = useState('hide')
    const { user, logout } = authStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <aside>
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

                    {
                        user?.role === 'user' ?
                            <div className={styles.settings}>
                                <Link to='/manageAccount' className={props.page === 'account' ? styles.selectedSetting : styles.setting}>

                                    <UserCog color='blue' />

                                    <h4>Account</h4>
                                </Link>

                                <Link to='/orders' className={props.page === 'orders' ? styles.selectedSetting : styles.setting}>
                                    <ClipboardCheck color='green' />

                                    <h4>Orders</h4>
                                </Link>
                            </div>
                            :
                            <div>
                                <div className={styles.settings}>
                                    <Link to='/manageProducts' className={props.page === 'products' ? styles.selectedSetting : styles.setting}>
                                        <PackageCheck color='green' />

                                        <h4>Products</h4>
                                    </Link>

                                    <Link to='/manageOrders' className={props.page === 'orders' ? styles.selectedSetting : styles.setting}>
                                        <ClipboardCheck color='limegreen' />

                                        <h4>Orders</h4>
                                    </Link>

                                    <Link to='/manageAdminsUsers' className={props.page === 'admins-users' ? styles.selectedSetting : styles.setting}>
                                        <Users color='blue' />

                                        <h4>Admins/Users</h4>
                                    </Link>

                                    <Link to='/manageAccount' className={props.page === 'account' ? styles.selectedSetting : styles.setting}>
                                        <UserCog color='blue' />

                                        <h4>Account</h4>
                                    </Link>
                                </div>

                                <div className={styles.logout} onClick={handleLogout}>
                                    <LogOut />
                                    <h4>Logout</h4>
                                </div>
                            </div>
                    }
                </section>
            </div>
        </aside>
    )
}