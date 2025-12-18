import './ManageOrders.css'
import AppBar from '../Components/AppBar'
import UserPanel from '../Components/UserPanel'
import UpdateOrderDialog from './UpdateOrderDialog'

export default function ManageOrders() {

    return (
        <>
            <AppBar />
            <main className="manage-orders-main">
                <UserPanel page={'orders'} />
                <hr id='hide-hr' />
                <section className='manage-orders-body'>
                    <header className='upper-panel'><h2>Orders</h2></header>
                    <UpdateOrderDialog />
                </section>
            </main>
        </>
    )
}