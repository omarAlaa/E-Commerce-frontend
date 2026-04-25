import styles from './ReviewOrder.module.css'
import { cartStore } from "../../../../app/store/cartStore"

export default function ReviewOrder() {
    const { cart } = cartStore()

    return (
        <article className={styles.container}>
            <div className={styles.order}>
                {
                    cart?.map(item => <div key={item.product._id} className={styles.item}>
                        <img className={styles.image} src={item.product.image} alt="" loading='lazy' />

                        <div className={styles.info}>
                            <strong className={styles.title}>{item.product.title}</strong>

                            <p>Price: {new Intl.NumberFormat().format(item.product.price)} EGP</p>

                            <p>Qty: {item.quantity}</p>
                        </div>

                        <p>{new Intl.NumberFormat().format(item.product.price * item.quantity)} EGP</p>
                    </div>)
                }

                <strong className={styles.subtotal}>Order Subtotal: {new Intl.NumberFormat().format(cart?.reduce((sum, item) => {
                    return sum + (item.product.price * item.quantity)
                }, 0))} EGP</strong>
            </div>
        </article>
    )
}