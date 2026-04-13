import styles from './Checkout.module.css'
import ShippingAddress from '../../components/ShippingAddress/ShippingAddress'
import ReviewOrder from '../../components/ReviewOrder/ReviewOrder'
import Payment from '../../components/Payment/Payment'
import OrderConfirmed from '../../components/OrderConfirmed/OrderConfirmed'
import Snackbar from '../../../../shared/ui/SnackBar/SnackBar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartStore } from '../../../../app/store/cartStore'
import { fetchCart } from '../../../cart/api/cartAPI'
import { authStore } from '../../../../app/store/authStore'
import { uiStore } from '../../../../app/store/uiStore'
import Steps from '../../components/Steps/Steps'
import { checkoutStore } from '../../store/checkoutStore'
import StepsNavigation from '../../components/StepsNavigation/StepsNavigation'

export default function Checkout() {
    const { step, setStep } = checkoutStore()
    const { cart, setCart, setCartFetched, cartFetched } = cartStore()
    const { user } = authStore()
    const { showSnackBar, snackBar } = uiStore()
    const navigate = useNavigate()

    useEffect(() => {
        const getCart = async () => {
            try {
                const res = await fetchCart()
                const userCart = res.data
                setCart(userCart)
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to fetch your items'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setCartFetched(true)
            }
        }

        if (!cartFetched && user) {
            getCart()
        }
    }, [])

    useEffect(() => {
        if (!user || (cartFetched && !cart)) {
            navigate('/')
        }
    }, [cartFetched])

    const handleBackToStore = () => {
        setStep(1)

        navigate('/')
    }

    return (
        <>
            {
                user &&
                <main className={styles.main}>
                    <button className={styles.backStore}
                        onClick={handleBackToStore}>
                        {'< Back to Store'}
                    </button>

                    <Steps />

                    {
                        step === 1 ? <ShippingAddress />
                            :
                            step === 2 ?
                                <ReviewOrder />
                                :
                                step === 3 ?
                                    <Payment />
                                    :
                                    <OrderConfirmed />
                    }

                    <StepsNavigation />
                </main>
            }

            <Snackbar {...snackBar} />
        </>
    )
}