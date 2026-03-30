import Loading from '../../../shared/ui/Loading/Loading'
import { useState } from 'react'
import { ordersStore } from "../store/ordersStore"
import { updateOrder } from '../api/ordersAPI'
import { uiStore } from '../../../app/store/uiStore'

export default function UpdateOrderDialog() {
    const { setOrders, orders, orderToReview, setOrderToReview } = ordersStore()
    const { showSnackBar } = uiStore()
    const [updateLoading, setUpdateLoading] = useState(false)
    const [status, setStatus] = useState()
    const updateDisabled = updateLoading || orderToReview?.status === status || !status
    const statuses = ['paid', 'shipped', 'delivered']

    const handleUpdateOrder = async (orderId, newStatus) => {
        setUpdateLoading(true)

        try {
            const res = await updateOrder(orderId, newStatus)


            const updatedOrders = orders.map(order => order._id === orderId ? res.data : order)
            setOrders(updatedOrders, true)

            if (newStatus !== 'cancelled') {
                setOrderToReview(res.data)
            }

            showSnackBar({ visible: true, success: true, text: `Order ${newStatus}` })
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to update order'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        } finally {
            setUpdateLoading(false)
        }
    }

    return (
        <>
            {
                orderToReview &&
                <section className='modal'
                    onClick={() => {
                        setOrderToReview()
                        setStatus()
                    }}>
                    <article className='dialog-order' onClick={e => e.stopPropagation()}>
                        <strong style={{ color: 'blue' }}>Order Id: {orderToReview._id}</strong>

                        <hr />

                        {
                            orderToReview.items.map(product => <article key={product._id} className='cart-product'>
                                <img src={product.image} alt="" width={'40px'} height={'40px'} />

                                <article className="cart-product-info">
                                    <strong>{product.title}</strong>

                                    <p>Unit price: {Intl.NumberFormat().format(product.price)} EGP</p>

                                    <p>Quantity: {product.quantity}</p>

                                    <p>Total price: {Intl.NumberFormat().format(product.quantity * product.price)} EGP</p>
                                </article>
                            </article>)
                        }

                        <hr />

                        <strong style={{ color: 'green' }}>Subtotal: {new Intl.NumberFormat().format(orderToReview.subtotal)} EGP</strong>

                        <strong className='date-id'>Order Date: {new Date(parseInt(orderToReview._id.substring(0, 8), 16) * 1000).toLocaleString()}</strong>

                        <div className='one-row'>
                            <strong>Status:</strong>

                            <select className='status-select' name="status" id="status" defaultValue={''} onChange={e => setStatus(e.target.value)} >
                                <option value="" disabled>Change status</option>

                                {statuses.map(status => <option value={status} key={status}>{status}</option>)}
                            </select>
                        </div>

                        <article className="manage-order-buttons">
                            <button id='update-button'
                                disabled={updateDisabled}
                                onClick={() => { handleUpdateOrder(orderToReview._id, status) }}
                                style={{ cursor: updateDisabled ? 'not-allowed' : 'pointer' }}
                            >
                                {updateLoading ? <Loading size={15} height={'100%'} /> : 'Update'}
                            </button>

                            <button onClick={() => {
                                setOrderToReview()
                                setStatus()
                            }}>Close</button>
                        </article>
                    </article>
                </section >
            }
        </>
    )
}