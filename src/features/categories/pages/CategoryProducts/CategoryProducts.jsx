import styles from './CategoryProducts.module.css'
import AppBar from "../../../../shared/layout/AppBar/AppBar"
import Product from "../../../../shared/components/Product/Product"
import SnackBar from "../../../../shared/ui/SnackBar/SnackBar"
import Loading from '../../../../shared/ui/Loading/Loading'
import Footer from '../../../../shared/layout/Footer/Footer'
import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import { fetchCategoryProducts } from '../../../products/api/productsAPI'
import { uiStore } from '../../../../app/store/uiStore'
import Container from '../../../../shared/ui/Container/Container'
import NoItemsSection from '../../../../shared/ui/NoItemsSection/NoItemsSection'
import Pages from '../../../../shared/ui/Pages/Pages'

export default function CategoryProducts() {
    const { category } = useParams()
    const { snackBar, showSnackBar } = uiStore()
    const [products, setProducts] = useState()
    const [fetchLoading, setFetchLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const prevCategory = useRef(category)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        setFetchLoading(true)

        const getCategoryProducts = async () => {
            try {
                if (prevCategory.current !== category) {
                    prevCategory.current = category

                    if (page !== 1) {
                        setPage(1)
                    }
                }

                const res = await fetchCategoryProducts(category, page)

                setProducts(res.data.products)
                setTotalPages(res.data.totalPages)
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to fetch products'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setFetchLoading(false)
            }
        }

        getCategoryProducts()
    }, [category, page])

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
                            <Container id={styles.categoryProductsContainer}>
                                {products?.map(product => <Product key={product._id} {...product} />)}
                            </Container>
                }

                <Pages page={page} totalPages={totalPages} changePage={(page) => setPage(page)} />
            </main>

            <SnackBar {...snackBar} />

            <Footer />
        </>
    )
}