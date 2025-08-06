import './CategoryPage.css'
import { useParams } from "react-router-dom"
import AppBar from "../Components/AppBar"
import Product from "../Components/Product"
import SnackBar from "../Components/SnackBar"
import Footer from '../Components/Footer'
import { useStore } from "../Components/useStore"
import { useState, useEffect } from 'react'

export default function CategoryPage() {
    const { category } = useParams()
    const { snackBar } = useStore()
    const [products, setProducts] = useState()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products/${category}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [category])

    return (
        <>
            <AppBar />
            <main className='category-page-main'>
                <h1>{category}</h1>
                <section className="container">
                    {products?.map(product => <Product key={product._id} {...product} />)}
                </section>
                <SnackBar {...snackBar} />
            </main>
            <Footer />
        </>
    )
}