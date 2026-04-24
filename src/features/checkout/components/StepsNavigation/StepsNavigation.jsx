import styles from './StepsNavigation.module.css'
import { useState } from "react"
import { cartStore } from "../../../../app/store/cartStore"
import { uiStore } from "../../../../app/store/uiStore"
import { checkoutStore } from "../../store/checkoutStore"
import Loading from '../../../../shared/ui/Loading/Loading'
import { placeOrder } from "../../../orders/api/ordersAPI"
import Button from '../../../../shared/ui/Button/Button'

export default function StepsNavigation() {
    const { step, setStep, setOrderId } = checkoutStore()
    const { showSnackBar } = uiStore()
    const { setCart } = cartStore()
    const [placeOrderLoading, setPlaceOrderLoading] = useState(false)

    const handlePlaceOrder = async () => {
        setPlaceOrderLoading(true)

        try {
            const res = await placeOrder()
            setOrderId(res.data)

            showSnackBar({ visible: true, success: true, text: 'Order Placed' })

            setCart(null)

            setStep(step + 1)
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to place order'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        }
        finally {
            setPlaceOrderLoading(false)
        }
    }

    return (
        <div className={styles.navigation}>
            <Button id={step === 1 || step === 4 ? styles.hide : styles.previous}
                onClick={() => setStep(step - 1)}
            >
                {'< Previous'}
            </Button>

            <Button id={step === 3 || step === 4 ? styles.hide : styles.next}
                onClick={() => setStep(step + 1)}            >
                {'Next >'}
            </Button>

            <Button id={step === 3 ? styles.placeOrder : styles.hide}
                disabled={placeOrderLoading}
                onClick={() => { handlePlaceOrder() }}            >
                {placeOrderLoading ? <Loading size={18} height={'100%'} /> : 'Place Order'}
            </Button>
        </div>
    )
}