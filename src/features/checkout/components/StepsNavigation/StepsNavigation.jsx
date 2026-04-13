import styles from './StepsNavigation.module.css'
import { useState } from "react"
import { cartStore } from "../../../../app/store/cartStore"
import { uiStore } from "../../../../app/store/uiStore"
import { checkoutStore } from "../../store/checkoutStore"
import Loading from '../../../../shared/ui/Loading/Loading'
import { placeOrder } from "../../../orders/api/ordersAPI"

export default function StepsNavigation() {
    const { step, setStep, setOrderId } = checkoutStore()
    const { showSnackBar } = uiStore()
    const { setCart } = cartStore()
    const [placeOrderLoading, setPlaceOrderLoading] = useState(false)

    const handlePlaceOrder = async () => {
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
    }

    return (
        <div className={styles.navigation}>
            <button className={styles.button}
                onClick={() => setStep(step - 1)}
                style={{ display: step === 1 || step === 4 ? 'none' : 'block' }}
            >
                {'< Previous'}
            </button>

            <button className={styles.next}
                onClick={() => setStep(step + 1)}
                style={{ display: step === 3 || step === 4 ? 'none' : 'block' }}
            >
                {'Next >'}
            </button>

            <button className={styles.placeOrder}
                disabled={placeOrderLoading}
                onClick={async () => {
                    setPlaceOrderLoading(true)
                    await handlePlaceOrder()
                    setPlaceOrderLoading(false)
                }}
                style={{ display: step === 3 ? 'block' : 'none' }}
            >
                {placeOrderLoading ? <Loading size={15} height={'100%'} /> : 'Place Order'}
            </button>
        </div>
    )
}