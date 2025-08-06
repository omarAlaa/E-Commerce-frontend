import { PackageCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function OrderConfirmed(props) {
    const navigate = useNavigate()

    return (
        <section className="order-confirmed-section">
            <PackageCheck color='blue' size={60} />
            <strong>Thank you for your order!</strong>
            <p>Your order id is #{props.id}. You can track your order status in your orders</p>
            <button className='nav-button' onClick={() => navigate('/orders')}>Go to my orders</button>
        </section>
    )
}