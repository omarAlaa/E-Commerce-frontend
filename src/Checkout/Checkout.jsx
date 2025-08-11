import './Checkout.css'
import ShippingAddress from './ShippingAddress'
import ReviewOrder from './ReviewOrder'
import Payment from './Payment'
import { useState, useEffect } from 'react'
import { useStore } from '../Components/useStore'
import axios from 'axios'
import Snackbar from '../Components/SnackBar'
import OrderConfirmed from './OrderConfirmed'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
    const [step, setStep] = useState(1)
    const { cart, fetchCart, user } = useStore()
    const [snackBar, setSnackBar] = useState()
    const [id, setId] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        fetchCart()
    }, [])

    async function placeOrder() {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/addOrder`, { userId: user.id, items: cart.items, subtotal: cart.subtotal })
            setId(res.data.id)
            setSnackBar({ visible: true, success: true, text: 'Order Placed' })
            setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
            setStep(step + 1)
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: 'Error occured, please try again later' })
            setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
        }
    }

    return (
        <main className='checkout-main'>
            <button className='back-store' onClick={() => navigate('/')}>{'< Back to store'}</button>
            <article className='steps'>
                <button className="circle" style={{ background: step === 1 ? 'blue' : 'green' }}></button>
                <p>Shipping address </p>
                <p className='line'></p>
                <button className="circle" style={{ background: step === 1 ? 'white' : step === 2 ? 'blue' : 'green' }}></button>
                <p>Review Order </p>
                <p className='line'></p>
                <button className="circle" style={{ background: step === 4 ? 'green' : step === 3 ? 'blue' : 'white' }}></button>
                <p>Payment</p>
            </article>
            {step === 1 ? <ShippingAddress /> : step === 2 ? <article className="review-order"><ReviewOrder cart={cart} /></article> : step === 3 ? <Payment /> : <OrderConfirmed id={id} />}
            <article className='steps-direction'>
                <button className='nav-button' onClick={() => setStep(step - 1)} style={{ display: step === 1 || step === 4 ? 'none' : 'block' }}>{'< Previous'}</button>
                <button className='nav-button next' onClick={() => setStep(step + 1)} style={{ display: step === 3 || step === 4 ? 'none' : 'block' }}>{'Next >'}</button>
                <button className='nav-button' onClick={placeOrder} style={{ display: step === 3 ? 'block' : 'none' }}>Place Order</button>
            </article>
            <Snackbar {...snackBar} />
        </main>
    )
}