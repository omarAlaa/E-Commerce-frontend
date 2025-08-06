export default function ReviewOrder(props) {

    return (
        <section className="review-order-section">
            {props.cart?.items?.map(item => <article key={item._id + item._id} className='order-item'>
                <img src={item.image} alt="" width={'60px'} height={'60px'} />
                <article className="order-item-info">
                    <strong className="order-item-title">{item.title}</strong>
                    <p>Unit Price: {new Intl.NumberFormat().format(item.price)} EGP</p>
                    <p>Qty: {item.quantity}</p>
                </article>
                <p>{new Intl.NumberFormat().format(item.price * item.quantity)} EGP</p>
            </article>)}
            <strong id='subtotal'>Order Subtotal: {new Intl.NumberFormat().format(props.cart?.subtotal)} EGP</strong>
        </section>
    )
}