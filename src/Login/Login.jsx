import '../Components/LoginRegister.css'
import SnackBar from '../Components/SnackBar'
import Loading from '../Components/Loading'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useStore } from '../Components/useStore'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const buttonDisabled = loading || !email || !password
    const [snackBar, setSnackBar] = useState()
    const navigate = useNavigate()
    const { changeUser, cart } = useStore()

    async function handleLogin(e) {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password, userCart: cart ? cart : {} })
            changeUser({ ...res.data })
            navigate(res.data.role === 'user' ? '/' : '/manageProducts')
        } catch (error) {
            setLoading(false)
            setSnackBar({ text: error.status === 401 ? 'Wrong username or password' : 'Error occured, please try again later', success: false, visible: true })
            setTimeout(() => setSnackBar({ ...snackBar, visible: false }), 5000)
        }
    }

    return (
        <main className='login-register-main'>
            <form className='login-register-form' onSubmit={handleLogin}>
                <img src="https://cdn-icons-png.flaticon.com/512/1803/1803612.png" alt="" width={'50px'} height={'50px'} />
                <h1>Sign In</h1>
                <input autoComplete='on' type="email" name="email" id="email" placeholder='Email Address *' onChange={e => setEmail(e.target.value)} />
                <input type='password' name="password" id="password" placeholder='Password *' onChange={e => setPassword(e.target.value)} />
                <article className="checkbox-text">
                    <input className='checkbox' type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                </article>
                <button className='login-register-button' disabled={buttonDisabled} style={{ cursor: buttonDisabled ? 'not-allowed' : 'pointer' }}> {loading ? <Loading size={15} height={'100%'} /> : 'Sign In'} </button>
                <article className="login-options">
                    <a href="">Forgot Password?</a>
                    <Link to="/register">Don't have an account? Sign Up</Link>
                </article>
            </form>
            <SnackBar {...snackBar} />
        </main >
    )
}