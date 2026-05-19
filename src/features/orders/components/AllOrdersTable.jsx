import styles from '../../../shared/components/Table/Table.module.css'
import { ordersStore } from "../store/ordersStore"
import { useState, useEffect } from "react"
import UpdateOrderDialog from "./UpdateOrderDialog/UpdateOrderDialog"
import Loading from "../../../shared/ui/Loading/Loading"
import ConfirmModal from "../../../shared/ui/ConfirmModal/ConfirmModal"
import { fetchAllOrders, updateOrder } from "../api/ordersAPI"
import { uiStore } from "../../../app/store/uiStore"
import Input from "../../../shared/ui/Input/Input"
import Button from "../../../shared/ui/Button/Button"
import Select from "../../../shared/ui/Select/Select"
import NoItemsSection from '../../../shared/ui/NoItemsSection/NoItemsSection'
import Pages from '../../../shared/ui/Pages/Pages'

export default function AllOrdersTable() {
    const { setOrders, orders, filteredOrders, setOrderToReview, searchOrders, resetSearchParams } = ordersStore()
    const { showSnackBar } = uiStore()
    const [orderIdToCancel, setOrderIdToCancel] = useState()
    const [fetchLoading, setFetchLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const headers = ['ID', 'Status', 'Actions']
    const statuses = ['paid', 'shipped', 'delivered', 'cancelled']

    useEffect(() => {
        resetSearchParams()
    }, [])

    useEffect(() => {
        const getAllOrders = async () => {
            window.scrollTo({ top: 0, behavior: 'smooth' })

            setFetchLoading(true)

            try {
                const res = await fetchAllOrders(page)

                setOrders(res.data.orders)
                setTotalPages(res.data.totalPages)
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to fetch orders'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setFetchLoading(false)
            }
        }

        getAllOrders()
    }, [page])

    const handleCancelOrder = async (orderId) => {
        try {
            const res = await updateOrder(orderId, 'cancelled')

            const updatedOrders = orders.map(order => order._id === orderId ? res.data : order)
            setOrders(updatedOrders, true)

            showSnackBar({ visible: true, success: true, text: 'Order cancelled' })
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to cancel order'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        }
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.searchSection}>
                    <Input type="text" name="search" id="search" placeholder="Search" onChange={e => searchOrders(e.target.value)} />

                    <Select name="status" id="search-status" defaultValue={''} onChange={e => searchOrders(e.target.value, 'status')} >
                        <option value="" disabled >Filter status</option>

                        <option value="All orders" >All orders</option>

                        {statuses?.map(status => <option key={status} value={status}>{status}</option>)}
                    </Select>
                </div>
            </div>

            {fetchLoading ?
                <Loading />
                :
                !filteredOrders ?
                    <NoItemsSection message={"Error occured, please try again later"} />
                    :
                    filteredOrders.length === 0 ?
                        <NoItemsSection message={"No orders found"} />
                        :
                        <section className={styles.container}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        {headers.map(header => <td key={header}>{header}</td>)}
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredOrders.map((order) => <tr key={order._id}>
                                        <td className={styles.longData}>{order._id}</td>

                                        <td className={styles.entry}>{order.status}</td>

                                        <td>
                                            <Button id={styles.whiteBttn} onClick={() => setOrderToReview(order)}>Review</Button>

                                            <Button id={order.status !== 'cancelled' ? styles.redBttn : styles.disabled}
                                                onClick={() => setOrderIdToCancel(order._id)}
                                                disabled={order.status === 'cancelled'}>
                                                Cancel
                                            </Button>
                                        </td>

                                    </tr>)}
                                </tbody>
                            </table>
                        </section>
            }

            <Pages page={page} totalPages={totalPages} changePage={(page) => setPage(page)} id={styles.pages} />

            <UpdateOrderDialog />

            {orderIdToCancel && <ConfirmModal
                close={() => setOrderIdToCancel()}
                message={'Cancel order with ID: ' + orderIdToCancel + ' ?'}
                action={async () => { await handleCancelOrder(orderIdToCancel) }} />}
        </>
    )
}