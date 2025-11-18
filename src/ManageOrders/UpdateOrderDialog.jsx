import { Trash2 } from 'lucide-react'
import Loading from '../Components/Loading'
import { useState } from 'react'

export default function UpdateOrderDialog(props) {

    const [updateLoading, setUpdateLoading] = useState(false)

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
            <strong style={{ color: 'green' }}>Subtotal: {Intl.NumberFormat().format(props.dialogOrder.subtotal)} EGP</strong>
            <article className="manage-order-buttons">
                <button id='update-button' disabled={updateLoading} onClick={async () => {
                    setUpdateLoading(true)
                    await props.updateOrder()
                    setUpdateLoading(false)
                }}>{updateLoading ? <Loading size={15} height={'100%'} /> : 'Update'}</button>
                <button onClick={props.emptyDialogOrder}>Close</button>
            </article>
        </article>
    )
}



