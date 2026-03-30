import './ManageOrders.css'
import AppBar from '../../../../shared/layout/AppBar/AppBar'
import UserPanel from '../../../../shared/layout/UserPanel/UserPanel'
import AllOrdersTable from '../../components/AllOrdersTable'
import { uiStore } from '../../../../app/store/uiStore'
import SnackBar from '../../../../shared/ui/SnackBar/SnackBar'

export default function ManageOrders() {
    const { snackBar } = uiStore()

    return (
        <>
            <AppBar />

            <main className="manage-orders-main">
                <UserPanel page={'orders'} />

                <hr id='hide-hr' />

                <section className='manage-orders-body'>
                    <header className='upper-panel'><h2>Orders</h2></header>

                    <AllOrdersTable />
                </section>
            </main>

            <SnackBar {...snackBar} />
        </>
    )
}