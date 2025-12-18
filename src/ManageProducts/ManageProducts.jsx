import './ManageProducts.css'
import AppBar from '../Components/AppBar'
import UserPanel from '../Components/UserPanel'
import { useState, useEffect } from 'react'
import AddProductForm from './Components/AddProductForm'
import ProductsTable from './Components/ProductsTable'

export default function ManageProducts() {

    const [newProduct, setNewProduct] = useState(false)

    return (
        <>
            <AppBar />
            <main className="manage-products-main">
                <UserPanel page={'products'} />
                <hr id='hide-hr' />
                <section className="manage-products-body">
                    <header className="upper-panel"><h2>Products</h2></header>
                    <AddProductForm newProduct={() => setNewProduct(!newProduct)} />
                    <ProductsTable newProduct={newProduct} />
                </section>
            </main>
        </>
    )
}