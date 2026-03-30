import { cartStore } from "../../../app/store/cartStore"

export default function ReviewOrder() {
    const { cart } = cartStore()

    return (
        <article className="review-order">
            <section className="review-order-section">
                {
                    cart?.map(item => <article key={item.product._id} className='order-item'>
                        <img src={item.product.image} alt="" width={'60px'} height={'60px'} />

                        <article className="order-item-info">
                            <strong className="order-item-title">{item.product.title}</strong>

                            <p>Unit Price: {new Intl.NumberFormat().format(item.product.price)} EGP</p>

                            <p>Qty: {item.quantity}</p>
                        </article>

                        <p>{new Intl.NumberFormat().format(item.product.price * item.quantity)} EGP</p>
                    </article>)
                }

                <strong id='subtotal'>Order Subtotal: {new Intl.NumberFormat().format(cart?.reduce((sum, item) => {
                    return sum + (item.product.price * item.quantity)
                }, 0))} EGP</strong>
            </section>
        </article>
    )
}