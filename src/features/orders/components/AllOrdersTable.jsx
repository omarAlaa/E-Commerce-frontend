import styles from '../../../shared/components/Table/Table.module.css'
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
import { useDebouncedCallback } from 'use-debounce'
import { Pencil, Ban } from 'lucide-react'

export default function AllOrdersTable() {
    const [orders, setOrders] = useState()
    const [search, setSearch] = useState()
    const [ordersModified, setOrdersModified] = useState(false)
    const [orderToReview, setOrderToReview] = useState()
    const [filteredStatus, setFilteredStatus] = useState()
    const { showSnackBar } = uiStore()
    const [orderIdToCancel, setOrderIdToCancel] = useState()
    const [fetchLoading, setFetchLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const headers = ['Customer', 'Email', 'Status', 'Actions']
    const statuses = ['paid', 'shipped', 'delivered', 'cancelled']

    useEffect(() => {
        getAllOrders(search)
    }, [page, filteredStatus, ordersModified])

    const getAllOrders = async (search) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        setFetchLoading(true)
        setSearch(search)

        if (search || filteredStatus) {
            setPage(1)
        }

        try {
            const res = await fetchAllOrders(search, filteredStatus, page)

            setOrders(res.data.orders)
            setTotalPages(res.data.totalPages)
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to fetch orders'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        } finally {
            setFetchLoading(false)
        }
    }

    const handleSearch = useDebouncedCallback((search) => {
        getAllOrders(search)
    }, 600)

    const handleCancelOrder = async (orderId) => {
        try {
            await updateOrder(orderId, 'cancelled')

            setOrdersModified(!ordersModified)

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
                    <Input type="text" name="search" id="search" placeholder="Search" onChange={e => handleSearch(e.target.value)} />

                    <Select name="status" id="search-status" defaultValue={''} onChange={e => setFilteredStatus(e.target.value)} >
                        <option value="" disabled >Filter status</option>

                        <option value="" >All orders</option>

                        {statuses?.map(status => <option key={status} value={status}>{status}</option>)}
                    </Select>
                </div>
            </div>

            {fetchLoading ?
                <Loading />
                :
                !orders ?
                    <NoItemsSection message={"Error occured, please try again later"} />
                    :
                    orders.length === 0 ?
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
                                    {orders.map((order) => <tr key={order._id}>
                                        <td className={styles.longData}>{order.user.userName}</td>

                                        <td className={styles.longData}>{order.user.email}</td>

                                        <td className={styles.entry}>{order.status}</td>

                                        <td>
                                            <div className={styles.bttnsGroup}>
                                                <Button id={styles.edit} onClick={() => setOrderToReview(order)} title='Review'> <Pencil color='blue' /> </Button>

                                                <Button id={order.status !== 'cancelled' ? styles.delete : styles.disabled}
                                                    onClick={() => setOrderIdToCancel(order._id)}
                                                    disabled={order.status === 'cancelled'}
                                                    title='Cancel'>
                                                    <Ban color='red' />
                                                </Button>
                                            </div>
                                        </td>

                                    </tr>)}
                                </tbody>
                            </table>
                        </section>
            }

            <Pages page={page} totalPages={totalPages} changePage={(page) => setPage(page)} id={styles.pages} />

            <UpdateOrderDialog
                setOrdersModified={() => setOrdersModified(!ordersModified)}
                orderToReview={orderToReview}
                setOrderToReview={setOrderToReview} />

            {orderIdToCancel && <ConfirmModal
                close={() => setOrderIdToCancel()}
                message={'Cancel order with ID: ' + orderIdToCancel + ' ?'}
                action={async () => { await handleCancelOrder(orderIdToCancel) }} />}
        </>
    )
}