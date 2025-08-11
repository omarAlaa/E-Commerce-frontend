import './Cart.css'
import { Trash2, ShoppingCart } from 'lucide-react'
import { useStore } from './useStore'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Cart() {
    const { cart, fetchCart, changeQuantity, deleteFromCart, emptyCart, user } = useStore()

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <main className="cart-main">
            {cart?.items?.length > 0 ? <>
                <h1>Your Cart</h1>
                <hr />
                {cart?.items?.map(product => <article key={product._id} className='cart-product'>
                    <img src={product.image} alt="" width={'40px'} height={'40px'} />
                    <article className="cart-product-info">
                        <strong>{product.title}</strong>
                        <p>Total: {Intl.NumberFormat().format(product.quantity * product.price)} EGP</p>
                        <div id='quantity'>
                            Qty:
                            <div onClick={() => changeQuantity(product.title, -1)} className="cart-icons" id='quantity-icons'>-</div>
                            {product.quantity}
                            <div onClick={() => changeQuantity(product.title, 1)} className="cart-icons" id='quantity-icons'>+</div>
                        </div>
                    </article>
                    <div onClick={() => deleteFromCart(product.title)} className="cart-icons"><Trash2 /></div>
                </article>)}
                <button onClick={emptyCart}>Empty your cart</button>
                <hr />
                <h3>Subtotal</h3>
                <div className="checkout">
                    <h3>{Intl.NumberFormat().format(cart?.subtotal)} EGP</h3>
                    <Link to={user ? '/checkout' : '/login'}><button className='cart-button'>Checkout</button></Link>
                </div>
            </> : <section className='empty-cart'>
                <h1>Your cart is empty</h1>
                <ShoppingCart size={170} />
            </section>}
        </main>
    )
}