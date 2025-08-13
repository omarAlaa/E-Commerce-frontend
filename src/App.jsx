import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login'
import Register from './Register/Register'
import MainPage from './MainPage/MainPage'
import CategoryPage from './CategoryPage/CategoryPage'
import ProductPage from './ProductPage/ProductPage'
import ManageAccountPage from './ManageAccountPage/ManageAccountPage'
import OrdersPage from './OrdersPage/OrdersPage'
import ManageProducts from './ManageProducts/ManageProducts'
import ManageOrders from './ManageOrders/ManageOrders'
import ManageAdminsUsers from './ManageAdminsUsers/ManageAdminsUsers'
import Checkout from './Checkout/Checkout'
import { useStore } from './Components/useStore'

function App() {

  const { user, cart } = useStore()

  return (
    <Router>
      <Routes>
        <Route path="/" element={user?.role === 'admin' ? <ManageProducts /> : <MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/:category' element={<CategoryPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/manageAccount' element={user ? <ManageAccountPage /> : <Login />} />
        <Route path='/orders' element={user?.role === 'user' ? <OrdersPage /> : <Login />} />
        <Route path='/manageProducts' element={user?.role === 'admin' ? <ManageProducts /> : <Login />} />
        <Route path='/manageOrders' element={user?.role === 'admin' ? <ManageOrders /> : <Login />} />
        <Route path='/manageAdminsUsers' element={user?.role === 'admin' ? <ManageAdminsUsers /> : <Login />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </Router>
  )
}

export default App