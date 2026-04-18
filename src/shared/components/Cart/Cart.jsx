import styles from './Cart.module.css'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cartStore } from '../../../app/store/cartStore'
import { authStore } from '../../../app/store/authStore'
import CartProducts from './CartProducts'
import Button from '../../ui/Button/Button'

export default function Cart() {
    const { user } = authStore()
    const { cart } = cartStore()

    return (
        <section className={styles.container}>
            {
                cart?.length > 0 ? <>
                    <h1 className={styles.header}>Your Cart</h1>

                    <CartProducts />

                    <hr />

                    <h3 className={styles.subtotal}>Subtotal</h3>

                    <div className={styles.checkoutContainer}>
                        <h3 className={styles.subtotal}>
                            {Intl.NumberFormat().format(cart.reduce((sum, item) => {
                                return sum + (item.product.price * item.quantity)
                            }, 0))} EGP</h3>

                        <Link to={user ? '/checkout' : '/login'}>
                            <Button id={styles.checkout}>Checkout</Button>
                        </Link>
                    </div>
                </>
                    :
                    <div className={styles.emptyCart}>
                        <h1 className={styles.message}>Your cart is empty</h1>

                        <ShoppingCart size={170} />
                    </div>}
        </section>
    )
}