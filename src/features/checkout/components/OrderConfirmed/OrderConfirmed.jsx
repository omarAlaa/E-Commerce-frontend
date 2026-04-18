import styles from './OrderConfirmed.module.css'
import { PackageCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { checkoutStore } from '../../store/checkoutStore'
import Button from '../../../../shared/ui/Button/Button'

export default function OrderConfirmed() {
    const navigate = useNavigate()
    const { orderId, setStep } = checkoutStore()

    const handleGoToMyOrders = () => {
        setStep(1)
        navigate('/orders')
    }

    return (
        <section className={styles.section}>
            <PackageCheck color='blue' size={60} />

            <strong>Thank you for your order!</strong>

            <p>Your order id is #{orderId}. You can track your order status in your orders</p>

            <Button id={styles.orders}
                onClick={handleGoToMyOrders}>
                Go to my orders
            </Button>
        </section>
    )
}