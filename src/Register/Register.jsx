import '../Components/LoginRegister.css'
import SnackBar from '../Components/SnackBar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useStore } from '../Components/useStore'

export default function Register() {

    const [snackBar, setSnackBar] = useState()
    const navigate = useNavigate()
    const { cart, changeUser } = useStore()

    async function handleRegister(data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, { email: data.get('email'), userName: data.get('username'), password: data.get('password'), userCart: cart ? cart : {} })
            setSnackBar({ text: 'Account created successfully', visible: true, success: true })
            changeUser({ ...res.data })
            setTimeout(() => navigate('/'), 2000)
        } catch (error) {
            setSnackBar({ text: error.status === 401 ? 'User already exists' : error.status === 402 ? 'Username is taken' : 'Error occured, please try again later', success: false, visible: true })
            setTimeout(() => setSnackBar({ ...snackBar, visible: false }), 5000)
        }
    }

    return (
        <main className="login-register-main">
            <form action={handleRegister} className="login-register-form">
                <img src="https://cdn-icons-png.flaticon.com/512/1803/1803612.png" alt="" width={'50px'} height={'50px'} />
                <h1>Sign Up</h1>
                <input autoComplete='on' type="email" name="email" id="email" placeholder='Email Address *' />
                <input autoComplete='on' type="text" name="username" id="username" placeholder='Username *' />
                <input type="password" name="password" id="password" placeholder='Password *' />
                <article className="checkbox-text">
                    <input className='checkbox' type="checkbox" name="receive-email" id="receive-email" />
                    <label htmlFor="receive-email">I want to receive inspiration, marketing promotions and updates via email.</label>
                </article>
                <button className="login-register-button">Sign Up</button>
                <Link className="login-link" to='/login'>Already have an account? Sign in</Link>
            </form>
            <SnackBar {...snackBar} />
        </main>
    )
}