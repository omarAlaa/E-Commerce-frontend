import { Trash2 } from 'lucide-react'
import Loading from '../Components/Loading'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SnackBar from '../Components/SnackBar'
import Table from '../Components/Table'

export default function UpdateOrderDialog() {

    const [updateLoading, setUpdateLoading] = useState(false)
    const [orders, setOrders] = useState()
    const [snackBar, setSnackBar] = useState()
    const [dialogOrder, setDialogOrder] = useState()
    const [orderToDelete, setOrderToDelete] = useState()
    const [dltLoading, setDltLoading] = useState(false)
    const [ordersChange, setOrdersChange] = useState(false)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/allOrders`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [ordersChange])

    async function cancel(id) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/cancelOrder/${id}`)
            setOrdersChange(!ordersChange)
            setSnackBar({ visible: true, success: true, text: 'Order Canceled' })
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
            setOrdersChange(!ordersChange)
            setSnackBar({ visible: true, success: true, text: 'Order updated' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: 'Error occured, please try again later' })
        }
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    return (
        <>
            {orders ?
                <Table headers={['_id', 'action']} rows={orders} actions={['Review', 'Cancel']} cancel={product => setOrderToDelete(product)} review={(order) => setDialogOrder(order)} />
                : <Loading />}
            {dialogOrder &&
                <section className='modal' onClick={() => setDialogOrder()}>
                    <article className='dialog-order' onClick={e => e.stopPropagation()}>
                        <strong style={{ color: 'blue' }}>Order Id: {dialogOrder._id}</strong>
                        <hr />
                        {dialogOrder.items.map(product => <article key={product._id} className='cart-product'>
                            <img src={product.image} alt="" width={'40px'} height={'40px'} />
                            <article className="cart-product-info">
                                <strong>{product.title}</strong>
                                <p>Total: {Intl.NumberFormat().format(product.quantity * product.price)} EGP</p>
                                <div id='quantity'>
                                    Qty:
                                    <div onClick={() => changeQuantity(product, -1)} className="cart-icons" id='quantity-icons'>-</div>
                                    {product.quantity}
                                    <div onClick={() => changeQuantity(product, 1)} className="cart-icons" id='quantity-icons'>+</div>
                                </div>
                            </article>
                            <div onClick={() => deleteItem(product)} className="cart-icons"><Trash2 /></div>
                        </article>)}
                        <hr />
                        <strong style={{ color: 'green' }}>Subtotal: {Intl.NumberFormat().format(dialogOrder.subtotal)} EGP</strong>
                        <article className="manage-order-buttons">
                            <button id='update-button' disabled={updateLoading} onClick={async () => {
                                setUpdateLoading(true)
                                await updateOrder()
                                setUpdateLoading(false)
                            }}>{updateLoading ? <Loading size={15} height={'100%'} /> : 'Update'}</button>
                            <button onClick={() => setDialogOrder()}>Close</button>
                        </article>
                    </article>
                </section>
            }
            {orderToDelete && <section className="modal" onClick={() => setOrderToDelete()}>
                <article className="dialog-product" onClick={e => e.stopPropagation()}>
                    <strong>{'Cancel order with ID: ' + orderToDelete._id + ' ?'}</strong>
                    <div className="confirm-bttns">
                        <button className="delete-bttn"
                            onClick={async () => {
                                setDltLoading(true)
                                await cancel(orderToDelete._id)
                                setDltLoading(false)
                                setOrderToDelete()
                            }}
                        >{dltLoading ? <Loading size={15} height={'100%'} /> : 'Yes'}</button>
                        <button className="cancel-bttn" onClick={() => setOrderToDelete()}>No</button>
                    </div>
                </article>
            </section>}
            <SnackBar {...snackBar} />
        </>
    )
}