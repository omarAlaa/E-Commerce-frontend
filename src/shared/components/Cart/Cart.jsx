import styles from './Cart.module.css'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cartStore } from '../../../app/store/cartStore'
import { authStore } from '../../../app/store/authStore'
import CartProducts from './CartProducts'
import Button from '../../ui/Button/Button'
import Loading from '../../ui/Loading/Loading'

export default function Cart() {
    const { user } = authStore()
    const { cart, cartFetched, isCartFetchLoading } = cartStore()

    return (
        <section className={styles.container}>
            {
                isCartFetchLoading ?
                    <>
                        <h1 className={styles.header}>Your Cart</h1>
                        <Loading />
                    </>
                    :
                    cart ?
                        <>
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
                        cartFetched ?
                            <div className={styles.emptyCart}>
                                <h1 className={styles.message}>Your cart is empty</h1>

                                <ShoppingCart size={170} />
                            </div>
                            :
                            <div className={styles.emptyCart}>
                                <h1 className={styles.message}>Error occured, please try again later</h1>

                                <ShoppingCart size={170} />
                            </div>
            }
        </section>
    )
}