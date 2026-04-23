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
import NoItemsSection from '../../../../shared/ui/NoItemsSection/NoItemsSection'

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
                        <NoItemsSection message="Error occurred, please try again later" />
                        :
                        products.length === 0 ?
                            <NoItemsSection message="No products in this category" />
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