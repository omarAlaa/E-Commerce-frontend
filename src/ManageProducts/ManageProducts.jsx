import './ManageProducts.css'
import AppBar from '../Components/AppBar'
import UserPanel from '../Components/UserPanel'
import { useEffect, useState } from 'react'
import AddProductForm from './Components/AddProductForm'
import axios from 'axios'
import SnackBar from '../Components/SnackBar'
import UpdateProductForm from './Components/UpdateProductForm'
import Table from '../Components/Table'
import Loading from '../Components/Loading'

export default function ManageProducts() {
    const [products, setProducts] = useState()
    const [snackBar, setSnackBar] = useState()
    const [dialogProduct, setDialogProduct] = useState()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data.map(product => ({ ...product, price: new Intl.NumberFormat().format(product.price) }))))
    }, [snackBar?.text])

    async function addProduct(data) {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/addProduct`, { title: data.get('title'), price: data.get('price'), description: data.get('description'), category: data.get('category'), image: data.get('image-url') })
            setSnackBar({ visible: true, success: true, text: 'Product Added' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: error.status === 401 ? 'Product already exists' : 'Error occured, please try again later' })
        }
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    async function updateProduct(data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/updateProduct/${dialogProduct._id}`, { dialogProduct: { ...dialogProduct, price: Number(data.get('price-update').replace(/,/g, '')), category: data.get('category-update'), image: data.get('image-url-update'), description: data.get('description-update') } })
            setDialogProduct(res.data.dialogProduct)
            setSnackBar({ visible: true, success: true, text: 'Product updated' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: 'Error occured, please try again later' })
        }
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    async function deleteProduct(id) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/deleteProduct/${id}`)
            setSnackBar({ visible: true, success: true, text: 'Product Deleted' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: 'Error occured, please try again later' })
        }
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    return (
        <>
            <AppBar />
            <main className="manage-products-main">
                <UserPanel page={'products'} />
                <hr id='hide-hr' />
                <section className="manage-products-body">
                    <header className="upper-panel"><h2>Products</h2></header>
                    <AddProductForm addProduct={addProduct} />
                    {products ?
                        <Table title='All Products' headers={['title', 'price', 'category', 'action']} rows={products} actions={['Update', 'Delete']} reviewProduct={(product) => setDialogProduct(product)} deleteProduct={deleteProduct} />
                        : <Loading />}
                    {dialogProduct && <UpdateProductForm updateProduct={updateProduct} dialogProduct={dialogProduct} emptyDialogProduct={() => setDialogProduct()} />}
                </section>
                <SnackBar {...snackBar} />
            </main>
        </>
    )
}