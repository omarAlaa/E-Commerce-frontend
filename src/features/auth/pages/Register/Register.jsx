import styles from '../styles/LoginRegister.module.css'
import SnackBar from '../../../../shared/ui/SnackBar/SnackBar'
import Loading from '../../../../shared/ui/Loading/Loading'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../api/authAPI'
import { cartStore } from '../../../../app/store/cartStore'
import { authStore } from '../../../../app/store/authStore'
import { uiStore } from '../../../../app/store/uiStore'
import { safeStorage } from '../../../../app/utilities/safeStorage'
import Input from '../../../../shared/ui/Input/Input'
import Button from '../../../../shared/ui/Button/Button'

export default function Register() {
    const [email, setEmail] = useState()
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [registerLoading, setRegisterLoading] = useState(false)
    const registerDisabled = !email || !userName || !password || password.length < 8
    const { snackBar, showSnackBar } = uiStore()
    const { cart, setCart, setCartFetched } = cartStore()
    const { setUser } = authStore()
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setRegisterLoading(true)

        try {
            const cartItems = cart?.map(item => ({ product: item.product._id, quantity: item.quantity }))

            const res = await register({ email, userName, password, cartItems })

            showSnackBar({ text: 'Account created successfully', visible: true, success: true })

            setTimeout(() => navigate('/'), 2000)

            setCart(res.data.cart)
            setCartFetched(true)

            setUser(res.data.user)

            safeStorage.remove('cart')
        } catch (error) {
            const errorMessage = error.code === 'LOCAL_STORAGE_ERROR' ? 'Account created but ' + error.message : error?.response?.data?.message || 'Connection error'
            showSnackBar({ visible: true, success: false, text: errorMessage })

            setRegisterLoading(false)
        }
    }

    return (
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleRegister}>
                <header className={styles.header}>
                    <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/512/1803/1803612.png" alt="Register icon" />

                    <h1>Sign Up</h1>
                </header>

                <Input autoComplete='on' type="email" name="email" id="email" placeholder='Email Address *' onChange={e => setEmail(e.target.value)} />

                <Input autoComplete='on' type="text" name="username" id="username" placeholder='Username *' onChange={e => setUserName(e.target.value)} />

                <Input type="password" name="password" id="password" placeholder='Password *' onChange={e => setPassword(e.target.value)} />

                {password?.length < 8 &&
                    <div className={styles.password_error}>
                        Password must be at least 8 characters
                    </div>}

                <Button id={!registerDisabled ? styles.registerBttn : styles.disabled} disabled={registerDisabled}>
                    {registerLoading ? <Loading size={18} height={'100%'} /> : 'Sign Up'}
                </Button>

                <Link className={styles.login_link} to='/login'>Already have an account? Sign in</Link>
            </form>

            <SnackBar {...snackBar} />
        </main>
    )
}