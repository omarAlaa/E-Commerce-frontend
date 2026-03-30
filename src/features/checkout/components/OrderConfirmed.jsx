import { PackageCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { checkoutStore } from '../store/checkoutStore'

export default function OrderConfirmed() {
    const navigate = useNavigate()
    const { orderId, setStep } = checkoutStore()

    const handleGoToMyOrders = () => {
        setStep(1)
        navigate('/orders')
    }

    return (
        <section className="order-confirmed-section">
            <PackageCheck color='blue' size={60} />

            <strong>Thank you for your order!</strong>

            <p>Your order id is #{orderId}. You can track your order status in your orders</p>

            <button className='nav-button'
                onClick={handleGoToMyOrders}>
                Go to my orders
            </button>
        </section>
    )
}