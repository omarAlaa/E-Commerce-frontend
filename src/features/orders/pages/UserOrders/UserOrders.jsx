import styles from  './UserOrders.module.css'
import AppBar from '../../../../shared/layout/AppBar/AppBar'
import UserPanel from '../../../../shared/layout/UserPanel/UserPanel'
import UserOrdersTable from '../../components/UserOrdersTable'

export default function UserOrders() {

    return (
        <>
            <AppBar />

            <main className={styles.main}>
                <UserPanel page={'orders'} />

                <hr id='hide-hr' />

                <UserOrdersTable />
            </main>
        </>
    )
}