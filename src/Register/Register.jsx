import '../Components/LoginRegister.css'
import SnackBar from '../Components/SnackBar'
import Loading from '../Components/Loading'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useStore } from '../Components/useStore'

export default function Register() {

    const [email, setEmail] = useState()
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const buttonDisabled = loading || !email || !userName || password?.length < 8
    const [snackBar, setSnackBar] = useState()
    const navigate = useNavigate()
    const { cart, changeUser } = useStore()

    async function handleRegister(e) {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, { email, userName, password, userCart: cart ? cart : {} })
            setSnackBar({ text: 'Account created successfully', visible: true, success: true })
            changeUser({ ...res.data })
            setTimeout(() => navigate('/'), 2000)
        } catch (error) {
            setLoading(false)
            setSnackBar({ text: error.status === 401 ? 'User already exists' : error.status === 402 ? 'Username is taken' : 'Error occured, please try again later', success: false, visible: true })
            setTimeout(() => setSnackBar({ ...snackBar, visible: false }), 5000)
        }
    }

    return (
        <main className="login-register-main">
            <form className="login-register-form" onSubmit={handleRegister}>
                <img src="https://cdn-icons-png.flaticon.com/512/1803/1803612.png" alt="" width={'50px'} height={'50px'} />
                <h1>Sign Up</h1>
                <input autoComplete='on' type="email" name="email" id="email" placeholder='Email Address *' onChange={e => setEmail(e.target.value)} />
                <input autoComplete='on' type="text" name="username" id="username" placeholder='Username *' onChange={e => setUserName(e.target.value)} />
                <input type="password" name="password" id="password" placeholder='Password *' onChange={e => setPassword(e.target.value)} />
                <div className='password-error' style={{ display: password?.length < 8 ? 'block' : 'none' }}>
                    Password must be at least 8 characters
                </div>
                <article className="checkbox-text">
                    <input className='checkbox' type="checkbox" name="receive-email" id="receive-email" />
                    <label htmlFor="receive-email">I want to receive inspiration, marketing promotions and updates via email.</label>
                </article>
                <button className="login-register-button" type='submit' disabled={buttonDisabled} style={{ cursor: buttonDisabled ? 'not-allowed' : 'pointer' }}> {loading ? <Loading size={15} height={'100%'} /> : 'Sign Up'} </button>
                <Link className="login-link" to='/login'>Already have an account? Sign in</Link>
            </form>
            <SnackBar {...snackBar} />
        </main>
    )
}