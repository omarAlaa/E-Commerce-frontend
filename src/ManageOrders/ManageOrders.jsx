import './ManageOrders.css'
import AppBar from '../Components/AppBar'
import UserPanel from '../Components/UserPanel'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SnackBar from '../Components/SnackBar'
import Table from '../Components/Table'
import UpdateOrderDialog from './UpdateOrderDialog'

export default function ManageOrders() {
    const [orders, setOrders] = useState()
    const [snackBar, setSnackBar] = useState()
    const [dialogOrder, setDialogOrder] = useState()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/allOrders`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [snackBar?.text])

    async function cancel(id) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/cancelOrder/${id}`)
            setSnackBar({ visible: true, success: true, text: 'Order Deleted' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: 'Error occured, please try again later' })
        }
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    function deleteItem(product) {
        if (dialogOrder.items.length === 1) {
            setSnackBar({ visible: true, success: false, text: 'This is the last item in the order, if you want to cancel the order press cancel!' })
            setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
            return
        }
        setDialogOrder({ ...dialogOrder, items: dialogOrder.items.filter(item => item.title !== product.title), subtotal: dialogOrder.subtotal - product.price * product.quantity })
    }

    function changeQuantity(product, quantity) {
        if (product.quantity + quantity !== 0) {
            setDialogOrder({ ...dialogOrder, items: dialogOrder.items.map(item => item.title === product.title ? { ...item, quantity: item.quantity + quantity } : item), subtotal: dialogOrder.subtotal + product.price * quantity })
        }
    }

    async function updateOrder() {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/updateOrder/${dialogOrder._id}`, { dialogOrder })
            setSnackBar({ visible: true, success: true, text: 'Order updated' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: 'Error occured, please try again later' })
        }
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    return (
        <>
            <AppBar />
            <main className="manage-orders-main">
                <UserPanel page={'orders'} />
                <hr id='hide-hr' />
                <section className='manage-orders-body'>
                    <header className='upper-panel'><h2>Orders</h2></header>
                    <Table headers={['_id', 'action']} rows={orders} actions={['Review', 'Cancel']} cancel={cancel} review={(order) => setDialogOrder(order)} />
                    {dialogOrder && <UpdateOrderDialog dialogOrder={dialogOrder} changeQuantity={changeQuantity} deleteItem={deleteItem} updateOrder={updateOrder} emptyDialogOrder={() => setDialogOrder()} />}
                </section>
                <SnackBar {...snackBar} />
            </main>
        </>
    )
}