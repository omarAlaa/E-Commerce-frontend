import Loading from '../../../shared/ui/Loading/Loading'
import { ScrollText } from 'lucide-react'
import { useState, useEffect } from 'react'
import { fetchUserOrders } from '../api/ordersAPI'

export default function UserOrdersTable() {
    const [orders, setOrders] = useState()
    const [ordersLoading, setOrdersLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        async function getUserOrders() {
            try {
                const res = await fetchUserOrders()
                setOrders(res.data)
            } catch (error) {
                setErrorMessage(error?.response?.data?.message || 'Failed to fetch orders')
            } finally {
                setOrdersLoading(false)
            }
        }

        getUserOrders()
    }, [])

    return (
        <section className="orders-section">
            <header className='upper-panel'>
                <h2>Orders</h2>
            </header>

            {ordersLoading ?
                < Loading />
                :
                !orders ?
                    < section className="no-orders">
                        <ScrollText size={80} />

                        <h2>{errorMessage}</h2>
                    </section>
                    :
                    <section className="orders">
                        {
                            orders?.map(order => <article className='order' key={order._id}>
                                {
                                    order.items.map(item => <article key={order._id + item._id} className='order-item'>
                                        <img src={item.image} alt="" width={'60px'} height={'60px'} />

                                        <article className="order-item-info">
                                            <strong className="order-item-title">{item.title}</strong>

                                            <p>Unit price: {new Intl.NumberFormat().format(item.price)} EGP</p>

                                            <p>Qty: {item.quantity}</p>
                                        </article>

                                        <p>{new Intl.NumberFormat().format(item.price * item.quantity)} EGP</p>
                                    </article>)
                                }

                                <strong id='subtotal'>Order Subtotal: {new Intl.NumberFormat().format(order.subtotal)} EGP</strong>

                                <strong className='date-id'>Order Date: {new Date(parseInt(order?._id?.substring(0, 8), 16) * 1000).toLocaleString()}</strong>

                                <strong className='date-id'>Order ID: {order._id}</strong>

                                <hr />

                            </article>
                            )
                        }
                    </section>
            }
        </section >
    )
}