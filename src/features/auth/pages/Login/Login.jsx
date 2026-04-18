import styles from '../styles/LoginRegister.module.css'
import SnackBar from '../../../../shared/ui/SnackBar/SnackBar'
import Loading from '../../../../shared/ui/Loading/Loading'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../api/authAPI'
import { authStore } from '../../../../app/store/authStore'
import { cartStore } from '../../../../app/store/cartStore'
import { uiStore } from '../../../../app/store/uiStore'
import { safeStorage } from '../../../../app/utilities/safeStorage'
import Input from '../../../../shared/ui/Input/Input'
import Button from '../../../../shared/ui/Button/Button'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loginLoading, setLoginLoading] = useState(false)
    const loginDisabled = !email || !password
    const { snackBar, showSnackBar } = uiStore()
    const { cart, setCart, setCartFetched } = cartStore()
    const { setUser } = authStore()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoginLoading(true)

        try {
            const cartItems = cart?.map(item => ({ product: item.product._id, quantity: item.quantity }))

            const res = await login({ email, password, cartItems })

            navigate(res.data.user.role === 'user' ? '/' : '/manageProducts')

            setCart(res.data.cart)
            setCartFetched(true)

            setUser(res.data.user)

            if (res.data.user.role === 'user') {
                safeStorage.remove('cart')
            }
        } catch (error) {
            console.log(error)
            const errorMessage = error.code === 'LOCAL_STORAGE_ERROR' ? error.message : error?.response?.data?.message || 'Connection error'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        } finally {
            setLoginLoading(false)
        }
    }

    return (
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleLogin}>
                <header className={styles.header}>
                    <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/512/1803/1803612.png" alt="Login icon" />

                    <h1>Sign In</h1>
                </header>

                <Input autoComplete='on' type="email" name="email" id="email" placeholder='Email Address *' onChange={e => setEmail(e.target.value)} />

                <Input type='password' name="password" id="password" placeholder='Password *' onChange={e => setPassword(e.target.value)} />

                <Button id={!loginDisabled ? styles.loginBttn : undefined} disabled={loginDisabled}>
                    {loginLoading ? <Loading size={18} height={'100%'} /> : 'Sign In'}
                </Button>

                <div className={styles.options}>
                    <a href="">Forgot Password?</a>

                    <Link to="/register">Don't have an account? Sign Up</Link>
                </div>
            </form>

            <SnackBar {...snackBar} />
        </main >
    )
}