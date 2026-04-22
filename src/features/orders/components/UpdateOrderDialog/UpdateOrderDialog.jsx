import styles from './UpdateOrderDialog.module.css'
import Loading from '../../../../shared/ui/Loading/Loading'
import { useState } from 'react'
import { ordersStore } from "../../store/ordersStore"
import { updateOrder } from '../../api/ordersAPI'
import { uiStore } from '../../../../app/store/uiStore'
import Button from '../../../../shared/ui/Button/Button'
import Modal from '../../../../shared/ui/Modal/Modal'
import Select from '../../../../shared/ui/Select/Select'

export default function UpdateOrderDialog() {
    const { setOrders, orders, orderToReview, setOrderToReview } = ordersStore()
    const { showSnackBar } = uiStore()
    const [updateLoading, setUpdateLoading] = useState(false)
    const [status, setStatus] = useState()
    const updateDisabled = updateLoading || orderToReview?.status === status || !status
    const statuses = ['paid', 'shipped', 'delivered']

    const handleUpdateOrder = async (orderId) => {
        setUpdateLoading(true)

        try {
            const res = await updateOrder(orderId, status)


            const updatedOrders = orders.map(order => order._id === orderId ? res.data : order)
            setOrders(updatedOrders, true)

            if (status !== 'cancelled') {
                setOrderToReview(res.data)
            }

            showSnackBar({ visible: true, success: true, text: `Order ${status}` })
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
                <Modal onClose={() => {
                    setOrderToReview()
                    setStatus()
                }}>
                    <strong className={styles.orderId}>Order Id: {orderToReview._id}</strong>

                    <hr />

                    {
                        orderToReview.items.map(product => <div key={product._id} className={styles.product}>
                            <img className={styles.image} src={product.image} alt="" width={'40px'} height={'40px'} />

                            <div className={styles.info}>
                                <strong className={styles.title}>{product.title}</strong>

                                <p>price: {Intl.NumberFormat().format(product.price)} EGP</p>

                                <p>Quantity: {product.quantity}</p>

                                <p>Total: {Intl.NumberFormat().format(product.quantity * product.price)} EGP</p>
                            </div>
                        </div>)
                    }

                    <hr />

                    <strong className={styles.subtotal}>Subtotal: {new Intl.NumberFormat().format(orderToReview.subtotal)} EGP</strong>

                    <strong>Order Date: {new Date(parseInt(orderToReview._id.substring(0, 8), 16) * 1000).toLocaleString()}</strong>

                    <div className={styles.oneRow}>
                        <strong>Status:</strong>

                        <Select name="status" id="status" defaultValue={''} onChange={e => setStatus(e.target.value)} >
                            <option value="" disabled>Change status</option>

                            {statuses.map(status => <option value={status} key={status}>{status}</option>)}
                        </Select>
                    </div>

                    <div className={styles.actionsBttns}>
                        <Button id={!updateDisabled ? styles.updateBttn : styles.disabled}
                            disabled={updateDisabled}
                            onClick={() => { handleUpdateOrder(orderToReview._id) }}
                            style={{ cursor: updateDisabled ? 'not-allowed' : 'pointer' }}
                        >
                            {updateLoading ? <Loading size={15} height={'100%'} /> : 'Update'}
                        </Button>

                        <Button id={styles.closeBttn} onClick={() => {
                            setOrderToReview()
                            setStatus()
                        }}>
                            Close
                        </Button>
                    </div>
                </Modal>
            }
        </>
    )
}