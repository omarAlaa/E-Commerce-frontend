import styles from './ProductDetails.module.css'
import { Star } from 'lucide-react'
import Loading from '../../../../../../shared/ui/Loading/Loading'
import { addToCart } from '../../../../../cart/api/cartAPI'
import { authStore } from '../../../../../../app/store/authStore'
import { cartStore } from "../../../../../../app/store/cartStore"
import { useState } from 'react'
import { uiStore } from '../../../../../../app/store/uiStore'
import { safeStorage } from '../../../../../../app/utilities/safeStorage'

export default function ProductDetails(product) {
    const [addToCartLoading, setAddToCartLoading] = useState(false)
    const { cart, setCart } = cartStore()
    const { user } = authStore()
    const { showSnackBar } = uiStore()

    const handleAddTocart = async (product) => {
        if (cart && cart.find(item => item.product._id === product._id)) {
            showSnackBar({ visible: true, success: false, text: 'Product already in cart' })
        } else {
            let userCart
            setAddToCartLoading(true)

            try {
                if (user) {
                    const res = await addToCart(product)
                    userCart = res.data
                } else {
                    userCart = cart ? [...cart, { product, quantity: 1 }] : [{ product: product, quantity: 1 }]
                    safeStorage.set('cart', userCart)
                }

                setCart(userCart)

                showSnackBar({ visible: true, success: true, text: 'Product added to cart' })
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to add product'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setAddToCartLoading(false)
            }
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles.img_container}>
                <img className={styles.image} src={product?.image} alt="Product image" />
            </div>

            <div className={styles.details}>
                <h2>{product?.title}</h2>

                <hr />

                <div className={styles.price_add}>
                    <h2 className={styles.price}>{new Intl.NumberFormat().format(product?.price)} EGP</h2>

                    <button className={styles.add} onClick={() => handleAddTocart(product)}
                        disabled={addToCartLoading}>{addToCartLoading ? <Loading size={15} height={'100%'} /> : '+ Add'}
                    </button>
                </div>

                <hr />

                <strong>DESCRIPTION</strong>
                <p>{product?.description}</p>

                <div className={styles.rating_container}>
                    {Array.from({ length: 5 }, (_, index) =>
                        <Star key={index} fill={Math.round(product?.rate.rating) > index ? 'gold' : 'white'} />
                    )}
                    <h4 className={styles.rating}>{product?.rate.rating} ({product?.rate.count})</h4>
                </div>
            </div>

        </section>
    )
}