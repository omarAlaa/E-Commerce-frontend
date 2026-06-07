import styles from './AppBar.module.css'
import modalStyles from '../../ui/Modal/Modal.module.css'
import Cart from '../../components/Cart/Cart'
import { ShoppingCart, LogOut, LogIn, CircleUser } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { fetchCart } from '../../../features/cart/api/cartAPI'
import { cartStore } from '../../../app/store/cartStore'
import { authStore } from '../../../app/store/authStore'
import { uiStore } from '../../../app/store/uiStore'
import { categoriesStore } from '../../../features/categories/store/categoriesStore'
import { fetchCategories } from '../../../features/categories/api/categoriesAPI'
import { safeStorage } from '../../../app/utilities/safeStorage'

export default function AppBar() {
    const [categoriesPanel, setCategoriesPanel] = useState('hide')
    const [cartState, setCartState] = useState('hide')
    const [optionsState, setOptionstate] = useState('hide')
    const { cart, cartFetched, setCart, setCartFetched, setIsCartFetchLoading } = cartStore()
    const { user, logout } = authStore()
    const { categories, setCategories, setCategoriesFetched, categoriesFetched } = categoriesStore()
    const { showSnackBar } = uiStore()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {
        const getCategories = async () => {
            if (!categoriesFetched) {
                try {
                    const res = await fetchCategories()
                    setCategories(res.data)
                } catch (error) {
                    showSnackBar({ visible: true, success: false, text: 'Failed to fetch categories' })
                } finally {
                    setCategoriesFetched(true)
                }
            }
        }

        getCategories()
    }, [])

    useEffect(() => {
        const getCart = async () => {
            let userCart

            try {
                if (user) {
                    const res = await fetchCart()

                    userCart = res.data
                }
                else {
                    userCart = safeStorage.get('cart')
                }

                setCart(userCart)
                setCartFetched(true)
            } catch (error) {
                showSnackBar({ visible: true, success: false, text: 'Failed to fetch cart' })
                return
            } finally {
                setIsCartFetchLoading(false)
            }
        }

        if (user?.role !== 'admin' && !cartFetched) {
            getCart()
        }
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const hideModal = () => {
        categoriesPanel === 'close' ? setCategoriesPanel('hide') : cartState === 'close' ? setCartState('hide') : optionsState === 'close' && setOptionstate('hide')
    }

    return (
        <header className={styles.appBar}>
            <div className={styles.title_categories}>
                <Link to='/' className={styles.title} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    E-Store
                </Link>

                {
                    user?.role !== 'admin' &&
                    <>
                        <button className={styles.categories} onClick={() => setCategoriesPanel('open')}>Categories</button>
                        {
                            categoriesPanel !== 'hide' &&
                            <div className={categoriesPanel === 'open' ? modalStyles.modal : styles.closeCategories}
                                onAnimationEnd={hideModal}
                                onClick={() => setCategoriesPanel('close')}>
                                <ul className={categoriesPanel === 'open' ? styles.openCategories : undefined}>
                                    {
                                        categories?.map((category) =>
                                            <Link key={category._id} to={`/${category.name}`} className={styles.category}>
                                                <li>{category.name}</li>
                                            </Link>)
                                    }
                                </ul>
                            </div>
                        }
                    </>
                }
            </div>

            {user?.role !== 'admin' &&
                <div className={styles.cart_options}>
                    {
                        <div className={styles.icon} onClick={() => setCartState('open')} >
                            <div title='Cart'>
                                <ShoppingCart color='black' />
                                {cart?.length > 0 && <div className={styles.itemsCount}>{cart.length}</div>}
                            </div>
                        </div>
                    }

                    {
                        cartState !== 'hide' &&
                        <div className={cartState === 'open' ? modalStyles.modal : styles.closeCart}
                            onAnimationEnd={hideModal}
                            onClick={() => setCartState('close')}>
                            <div className={cartState === 'open' ? styles.openCart : undefined} onClick={e => e.stopPropagation()}>
                                <Cart />
                            </div>
                        </div>
                    }

                    <>
                        <div title='Options'>
                            <CircleUser className={styles.icon} color='black' size={28} onClick={() => setOptionstate('open')} />
                        </div>

                        {
                            optionsState !== 'hide' &&
                            <div className={optionsState === 'open' ? modalStyles.modal : styles.closeOptions}
                                onAnimationEnd={hideModal}
                                onClick={() => setOptionstate('close')}>
                                <ul className={optionsState === 'open' ? styles.openOptions : undefined}>
                                    {
                                        !user ?
                                            <>
                                                <Link className={styles.link} to='/login'>
                                                    <li className={styles.option}><LogIn /> Login</li>
                                                </Link>

                                                <Link className={styles.link} to='/register'>
                                                    <li className={styles.option}><CircleUser /> Sign Up</li>
                                                </Link>
                                            </>
                                            :
                                            <>
                                                <Link className={styles.link} to='/manageAccount'>
                                                    <li className={styles.option}><CircleUser />Profile</li>
                                                </Link>

                                                <li className={styles.option} onClick={handleLogout}><LogOut />Logout</li>
                                            </>
                                    }
                                </ul>
                            </div>
                        }
                    </>
                </div>}
        </header>
    )
}