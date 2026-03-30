import styles from './Product.module.css'
import Loading from "../../ui/Loading/Loading"
import { Link } from "react-router-dom"
import { Star } from 'lucide-react'
import { useState } from 'react'
import { addToCart } from '../../../features/cart/api/cartAPI'
import { authStore } from '../../../app/store/authStore'
import { cartStore } from "../../../app/store/cartStore"
import { uiStore } from "../../../app/store/uiStore"
import { safeStorage } from "../../../app/utilities/safeStorage"

export default function Product(props) {
    const [isLoading, setIsLoading] = useState(false)
    const { cart, setCart } = cartStore()
    const { user } = authStore()
    const { showSnackBar } = uiStore()

    const handleAddTocart = async (product) => {
        if (cart?.find(item => item.product._id === product._id)) {
            showSnackBar({ visible: true, success: false, text: 'Product already in cart' })
        } else {
            let userCart
            setIsLoading(true)

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
                setIsLoading(false)
            }
        }
    }

    return (
        <article key={props?._id} className={styles.card}>
            <Link className={styles.imageContainer} to={`/product/${props?._id}`}>
                <img className={styles.image} src={props?.image} alt="Product image" />
            </Link>

            <Link className={styles.category} to={`/${props?.category}`}>
                {props?.category}
            </Link>

            <Link className={styles.title} to={`/product/${props?._id}`} title={props?.title}>
                {props?.title}
            </Link>

            <div className={styles.rating}>
                {
                    Array.from({ length: 5 }, (_, index) =>
                        <Star key={index} fill={Math.round(props?.rate.rating) > index ? 'gold' : 'white'} size={20} />)
                }

                <p className={styles.rate}>{props?.rate.rating} {`(${props?.rate.count})`}</p>
            </div>

            <div className={styles.price_addCart}>
                <strong>{Intl.NumberFormat().format(props?.price)} EGP</strong>

                <button className={styles.addToCart}
                    onClick={async () => handleAddTocart(props)}
                    disabled={isLoading}>
                    {isLoading ? <Loading size={15} height={'100%'} /> : '+ Add'}
                </button>
            </div>
        </article>
    )
}