import { Trash2 } from 'lucide-react'

export default function updateOrderDialog(props) {
    return (
        <article className='dialog-order'>
            <strong style={{ color: 'blue' }}>Order Id: {props.dialogOrder._id}</strong>
            <hr />
            {props.dialogOrder.items.map(product => <article key={product._id} className='cart-product'>
                <img src={product.image} alt="" width={'40px'} height={'40px'} />
                <article className="cart-product-info">
                    <strong>{product.title}</strong>
                    <p>Total: {Intl.NumberFormat().format(product.quantity * product.price)} EGP</p>
                    <div id='quantity'>
                        Qty:
                        <div onClick={() => props.changeQuantity(product, -1)} className="cart-icons" id='quantity-icons'>-</div>
                        {product.quantity}
                        <div onClick={() => props.changeQuantity(product, 1)} className="cart-icons" id='quantity-icons'>+</div>
                    </div>
                </article>
                <div onClick={() => props.deleteItem(product)} className="cart-icons"><Trash2 /></div>
            </article>)}
            <hr />
            <strong style={{ color: 'red' }}>Subtotal: {Intl.NumberFormat().format(props.dialogOrder.subtotal)} EGP</strong>
            <article className="manage-order-buttons">
                <button id='update-button' onClick={props.updateOrder}>Update</button>
                <button onClick={props.emptyDialogOrder}>Close</button>
            </article>
        </article>
    )
}