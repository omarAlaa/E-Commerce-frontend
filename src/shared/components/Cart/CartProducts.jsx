import styles from './Cart.module.css'
import Loading from '../../ui/Loading/Loading'
import { changeQuantity, deleteFromCart, emptyCart } from '../../../features/cart/api/cartAPI'
import { cartStore } from '../../../app/store/cartStore'
import { authStore } from '../../../app/store/authStore'
import { uiStore } from "../../../app/store/uiStore"
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { safeStorage } from "../../../app/utilities/safeStorage"
import { Link } from "react-router-dom"
import Button from '../../ui/Button/Button'

export default function CartProducts() {
    const { cart, setCart } = cartStore()
    const { showSnackBar } = uiStore()
    const { user } = authStore()
    const [changeItemId, setChangeItemId] = useState()
    const [delItemId, setDelItemId] = useState()
    const [emptyLoading, setEmptyLoading] = useState(false)

    const handleChangeQuantity = async (productId, quantity) => {
        if (cart.find(item => item.product._id === productId).quantity + quantity !== 0) {
            setChangeItemId(productId + quantity)
            let updatedCart

            try {
                if (user) {
                    const res = await changeQuantity(productId, quantity)
                    updatedCart = res.data
                } else {
                    updatedCart = cart.map(item => item.product._id === productId ? { product: item.product, quantity: item.quantity + quantity } : item)
                    safeStorage.set('cart', updatedCart)
                }

                setCart(updatedCart)
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to change quantity'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setChangeItemId(null)
            }
        }
    }

    const handleDeleteFromCart = async (productId) => {
        setDelItemId(productId)
        let updatedCart

        try {
            if (user) {
                const res = await deleteFromCart(productId)
                updatedCart = res.data
            } else {
                updatedCart = cart.filter(item => item.product._id !== productId)

                if (updatedCart.length > 0) {
                    safeStorage.set('cart', updatedCart)
                } else {
                    setCart(null)
                    safeStorage.remove('cart')
                    return
                }
            }

            setCart(updatedCart)
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to delete product'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        } finally {
            setDelItemId(null)
        }
    }

    const handleEmptyCart = async () => {
        setEmptyLoading(true)

        try {
            if (user) {
                await emptyCart()
            } else {
                safeStorage.remove('cart')
            }

            setCart(null)
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to empty cart'
            showSnackBar({ visible: true, success: false, text: errorMessage })
            return
        } finally {
            setEmptyLoading(false)
        }
    }

    return (
        <>
            {
                cart?.map(item =>
                    <div key={item.product._id}>
                        <hr />

                        <article className={styles.product}>
                            <img className={styles.image} src={item.product.image} alt="Product image" />

                            <div className={styles.info}>
                                <Link className={styles.title} to={`/product/${item.product._id}`}>
                                    <strong>{item.product.title}</strong>
                                </Link>

                                <p>{Intl.NumberFormat().format(item.product.price)} EGP</p>

                                <div className={styles.quantity_totalPrice}>
                                    <div className={styles.quantityContainer}>
                                        <div onClick={async () => { handleChangeQuantity(item.product._id, -1) }}
                                            className={styles.quantity}
                                        >
                                            {changeItemId === item.product._id + '-1' ? <Loading size={15} /> : '-'}
                                        </div>

                                        {item.quantity}

                                        <div onClick={async () => { await handleChangeQuantity(item.product._id, 1) }}
                                            className={styles.quantity}
                                        >
                                            {changeItemId === item.product._id + '1' ? <Loading size={15} /> : '+'}
                                        </div>
                                    </div>

                                    <p>{Intl.NumberFormat().format(item.quantity * item.product.price)} EGP</p>
                                </div>
                            </div>

                            <div onClick={async () => { handleDeleteFromCart(item.product._id) }}
                                className={styles.delete}
                            >
                                {delItemId === item.product._id ? <Loading size={25} /> : <Trash2 />}
                            </div>
                        </article>
                    </div>
                )
            }

            <Button id={styles.emptyCartBttn} onClick={async () => { handleEmptyCart() }}
                disabled={emptyLoading}>
                {emptyLoading ? <Loading size={18} height={'100%'} /> : 'Empty your cart'}
            </Button>
        </>
    )
}