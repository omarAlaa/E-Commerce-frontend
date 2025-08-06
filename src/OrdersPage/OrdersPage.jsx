import './OrdersPage.css'
import AppBar from '../Components/AppBar'
import UserPanel from '../Components/UserPanel'
import { useState, useEffect } from 'react'
import Orders from './Components/Orders'
import { useStore } from '../Components/useStore'

export default function OrdersPage() {
    const [orders, setOrders] = useState()
    const { user } = useStore()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/orders/${user?.id}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [])

    return (
        <>
            <AppBar />
            <main className='orders-main'>
                <UserPanel page={'orders'} />
                <hr id='hide-hr' />
                <Orders orders={orders} />
            </main>
        </>
    )
}