import './AppBar.css'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ShoppingCart, LogOut, LogIn, CircleUser } from 'lucide-react'
import Cart from './Cart'
import { useStore } from './useStore'

export default function AppBar() {
    const { cart, categories, fetchCategories, changeUser, user } = useStore()
    const navigate = useNavigate()

    useEffect(() => {
        fetchCategories()
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
                    <button className="categories">CATEGORIES</button>
                    <ul className='options' style={{ left: '100px' }}>
                        {categories?.map((category) => <Link key={category._id} to={`/${category.name.toLowerCase()}`} className='link' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <li>{category.name}</li>
                        </Link>)}
                    </ul>
                </article>}
            </article>
            <section className='cart-options'>
                {user?.role !== 'admin' && <article className="cart">
                    <ShoppingCart color='black' />
                    {cart?.items?.length > 0 && <div className="items-count">{cart?.items.length}</div>}
                    <article className="cart-container">
                        <Cart />
                    </article>
                </article>}
                <article className="dropdown-container">
                    <button><img className='profile-pic' src="https://pps.whatsapp.net/v/t61.24694-24/126462489_1178994829187791_9121617399796202963_n.jpg?ccb=11-4&oh=01_Q5AaIZsa7s_gcADaBxlgJyqWIx9fuEpATBM9i4xz1QgKNk8w&oe=67F4F4B9&_nc_sid=5e03e0&_nc_cat=111" alt="" width={'40px'} height={'40px'} /></button>
                    {!user ?
                        <ul className='options'>
                            <Link to='/login' className='link'>
                                <li><LogIn /> Login</li>
                            </Link>
                            <Link to='/register' className='link'>
                                <li><CircleUser /> Sign Up</li>
                            </Link>
                        </ul>
                        :
                        <ul className='options'>
                            <Link to={user.role === 'user' ? '/manageAccount' : '/manageProducts'} className='link'>
                                <li><img className='profile-pic' src="https://pps.whatsapp.net/v/t61.24694-24/126462489_1178994829187791_9121617399796202963_n.jpg?ccb=11-4&oh=01_Q5AaIZsa7s_gcADaBxlgJyqWIx9fuEpATBM9i4xz1QgKNk8w&oe=67F4F4B9&_nc_sid=5e03e0&_nc_cat=111" alt="" width={'24px'} height={'24px'} />{user.role === user ? 'Account' : 'Panel'}</li>
                            </Link>
                            <li onClick={handleLogout}><LogOut />Logout</li></ul>}
                </article>
            </section>
        </header>
    )
}