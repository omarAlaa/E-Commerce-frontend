import styles from '../pages/UserOrders/UserOrders.module.css'
import Loading from '../../../shared/ui/Loading/Loading'
import { ScrollText } from 'lucide-react'
import { useState, useEffect } from 'react'
import { fetchUserOrders } from '../api/ordersAPI'
import NoItemsSection from '../../../shared/ui/NoItemsSection/NoItemsSection'
import Button from '../../../shared/ui/Button/Button'
import Pages from '../../../shared/ui/Pages/Pages'

export default function UserOrdersTable() {
    const [orders, setOrders] = useState()
    const [ordersLoading, setOrdersLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        async function getUserOrders() {
            setOrdersLoading(true)

            try {
                const res = await fetchUserOrders(page)
                setOrders(res.data.orders)
                setTotalPages(res.data.totalPages)
            } catch (error) {
                setErrorMessage(error?.response?.data?.message || 'Failed to fetch orders')
            } finally {
                setOrdersLoading(false)
            }
        }

        getUserOrders()
    }, [page])

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h2>Orders</h2>
            </header>

            {ordersLoading ?
                < Loading />
                :
                !orders ?
                    <NoItemsSection message={errorMessage} id={styles.noOrders}>
                        <ScrollText size={80} />
                    </NoItemsSection>
                    :
                    <section className={styles.orders} >
                        {
                            orders?.map(order => <article className={styles.order} key={order._id}>
                                {
                                    order.items.map(item => <article key={order._id + item._id} className={styles.order_item}>
                                        <img className={styles.image} src={item.image} alt="" loading='lazy' />

                                        <article className={styles.order_item_info}>
                                            <strong className={styles.order_item_title}>{item.title}</strong>

                                            <p>Price: {new Intl.NumberFormat().format(item.price)} EGP</p>

                                            <p>Qty: {item.quantity}</p>
                                        </article>

                                        <p>{new Intl.NumberFormat().format(item.price * item.quantity)} EGP</p>
                                    </article>)
                                }

                                <strong className={styles.subtotal}>Order Subtotal: {new Intl.NumberFormat().format(order.subtotal)} EGP</strong>

                                <strong>Order status: {order.status}</strong>

                                <strong className={styles.date_id}>Order Date: {new Date(parseInt(order?._id?.substring(0, 8), 16) * 1000).toLocaleString()}</strong>

                                <strong className={styles.date_id}>Order ID: {order._id}</strong>

                                <hr />

                            </article>
                            )
                        }

                        <Pages page={page} totalPages={totalPages} changePage={(page) => setPage(page)} />
                    </section>
            }
        </section >
    )
}