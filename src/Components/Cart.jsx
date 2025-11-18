import './Cart.css'
import Loading from './Loading'
import { Trash2, ShoppingCart } from 'lucide-react'
import { useStore } from './useStore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Cart() {
    const { cart, fetchCart, changeQuantity, deleteFromCart, emptyCart, user } = useStore()
    const [decItemId, setDecItemId] = useState()
    const [incItemId, setIncItemId] = useState()
    const [delItemId, setDelItemId] = useState()
    const [emptyLoading, setEmptyLoading] = useState(false)

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
                            <div onClick={async () => {
                                setDecItemId(product._id)
                                await changeQuantity(product.title, -1)
                                setDecItemId(null)
                            }} className="cart-icons" id='quantity-icons'>{decItemId === product._id ? <Loading size={15} height={'100%'} /> : '-'}</div>
                            {product.quantity}
                            <div onClick={async () => {
                                setIncItemId(product._id)
                                await changeQuantity(product.title, 1)
                                setIncItemId(null)
                            }} className="cart-icons" id='quantity-icons'>{incItemId === product._id ? <Loading size={15} height={'100%'} /> : '+'}</div>
                        </div>
                    </article>
                    <div onClick={async () => {
                        setDelItemId(product._id)
                        await deleteFromCart(product.title)
                        setDelItemId(null)
                    }} className="cart-icons">{delItemId === product._id ? <Loading size={25} height={'100%'} /> : <Trash2 />}</div>
                </article>)}
                <button onClick={async () => {
                    setEmptyLoading(true)
                    await emptyCart()
                    setEmptyLoading(false)
                }} disabled={emptyLoading}>{emptyLoading ? <Loading size={15} height={'100%'} /> : 'Empty your cart'}</button>
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