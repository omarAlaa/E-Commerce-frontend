import './AppBar.css'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ShoppingCart, LogOut, LogIn, CircleUser } from 'lucide-react'
import Cart from './Cart'
import { useStore } from './useStore'

export default function AppBar() {

    const [showComp, setShowComp] = useState()
    const { cart, fetchCart, categories, fetchCategories, changeUser, user } = useStore()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchCart()
    }, [])

    function handleLogout() {
        changeUser(undefined)
        navigate('/login')
    }

    return (
        <header className='app-bar'>
            <article className="name-categories">
                <Link to='/' className='link' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <h2>E-Store</h2>
                </Link>
                {user?.role !== 'admin' && <article className="dropdown-container">
                    <button className="categories" onClick={() => setShowComp('categories')}>CATEGORIES</button>
                    {showComp === 'categories' && <section className='modal' onClick={() => setShowComp()}>
                        <ul className='options' style={{ left: '100px' }}>
                            {categories?.map((category) => <Link key={category._id} to={`/${category.name}`} className='link' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                <li>{category.name}</li>
                            </Link>)}
                        </ul>
                    </section>}
                </article>}
            </article>
            <section className='cart-options'>
                {user?.role !== 'admin' && <article className="cart" onClick={() => setShowComp('cart')} >
                    <div title='Cart'><ShoppingCart className='icon' color='black' />
                        {cart?.items?.length > 0 && <div className="items-count">{cart?.items.length}</div>}
                    </div>
                </article>}
                {showComp === 'cart' && <div className='modal' onClick={() => setShowComp()}>
                    <article className="cart-container" onClick={e => e.stopPropagation()}>
                        <Cart />
                    </article>
                </div>}
                <article className="dropdown-container">
                    <div title='Options'><CircleUser className='icon' color='black' size={28} onClick={() => setShowComp('options')} /></div>
                    {showComp === 'options' && <section className='modal' onClick={() => setShowComp()}>
                        <ul className='options'>
                            {!user ? <>
                                <Link to='/login' className='link'>
                                    <li><LogIn /> Login</li>
                                </Link>
                                <Link to='/register' className='link'>
                                    <li><CircleUser /> Sign Up</li>
                                </Link></> :
                                <>
                                    <Link to={user.role === 'user' ? '/manageAccount' : '/manageProducts'} className='link'>
                                        <li><CircleUser />{user.role === 'user' ? 'Profile' : 'Panel'}</li>
                                    </Link>
                                    <li onClick={handleLogout}><LogOut />Logout</li></>}
                        </ul>

                    </section>}
                </article>
            </section>
        </header>
    )
}