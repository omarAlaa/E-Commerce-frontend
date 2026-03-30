import styles from './CategoryProducts.module.css'
import AppBar from "../../../../shared/layout/AppBar/AppBar"
import Product from "../../../../shared/components/Product/Product"
import SnackBar from "../../../../shared/ui/SnackBar/SnackBar"
import Loading from '../../../../shared/ui/Loading/Loading'
import Footer from '../../../../shared/layout/Footer/Footer'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { fetchCategoryProducts } from '../../../products/api/productsAPI'
import { uiStore } from '../../../../app/store/uiStore'
import Container from '../../../../shared/ui/Container/Container'

export default function CategoryProducts() {
    const { category } = useParams()
    const { snackBar, showSnackBar } = uiStore()
    const [products, setProducts] = useState()
    const [fetchLoading, setFetchLoading] = useState(true)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        const getCategoryProducts = async () => {
            try {
                const res = await fetchCategoryProducts(category)

                setProducts(res.data)
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to fetch products'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setFetchLoading(false)
            }
        }

        getCategoryProducts()
    }, [category])

    return (
        <>
            <AppBar />

            <main className={styles.main}>
                <h1 className={styles.header}>{category}</h1>

                {fetchLoading ?
                    <Loading />
                    :
                    !products ?
                        <section className={styles.no_items}>
                            <h2>Error occured, please try again later</h2>
                        </section>
                        :
                        products.length === 0 ?
                            <section className={styles.no_items}>
                                <h2>No products in this category</h2>
                            </section>
                            :
                            <Container>
                                {products?.map(product => <Product key={product._id} {...product} />)}
                            </Container>
                }
            </main>

            <SnackBar {...snackBar} />

            <Footer />
        </>
    )
}