import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './features/auth/pages/Login/Login'
import Register from './features/auth/pages/Register/Register'
import HomePage from './features/home/pages/HomePage/HomePage'
import CategoryProducts from './features/categories/pages/CategoryProducts/CategoryProducts'
import ProductPage from './features/products/pages/ProductPage/ProductPage'
import ManageAccount from './features/account/pages/ManageAccount/ManageAccount'
import UserOrders from './features/orders/pages/UserOrders/UserOrders'
import ManageProducts from './features/products/pages/ManageProducts/ManageProducts'
import ManageOrders from './features/orders/pages/ManageOrders/ManageOrders'
import ManageAdminsUsers from './features/users/pages/ManageAdminsUsers/ManageAdminsUsers'
import Checkout from './features/checkout/pages/Ckeckout/Checkout'
import { authStore } from './app/store/authStore'

function App() {

  const { user } = authStore()

  return (
    <Router>
      <Routes>
        <Route path="/" element={user?.role === 'admin' ? <ManageProducts /> : <HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/:category' element={<CategoryProducts />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/manageAccount' element={user ? <ManageAccount /> : <Login />} />
        <Route path='/orders' element={user?.role === 'user' ? <UserOrders /> : <Login />} />
        <Route path='/manageProducts' element={user?.role === 'admin' ? <ManageProducts /> : <Login />} />
        <Route path='/manageOrders' element={user?.role === 'admin' ? <ManageOrders /> : <Login />} />
        <Route path='/manageAdminsUsers' element={user?.role === 'admin' ? <ManageAdminsUsers /> : <Login />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </Router>
  )
}

export default App