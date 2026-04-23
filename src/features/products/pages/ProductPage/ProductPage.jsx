import styles from './ProductPage.module.css'
import AppBar from '../../../../shared/layout/AppBar/AppBar'
import SnackBar from '../../../../shared/ui/SnackBar/SnackBar'
import Loading from '../../../../shared/ui/Loading/Loading'
import Footer from '../../../../shared/layout/Footer/Footer'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { uiStore } from "../../../../app/store/uiStore"
import { fetchProduct } from '../../api/productsAPI'
import ProductDetails from './components/ProductDetails/ProductDetails'
import SimilarProducts from './components/SimilarProducts/SimilarProducts'
import NoItemsSection from '../../../../shared/ui/NoItemsSection/NoItemsSection'

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState()
    const [productLoading, setProductLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState()
    const { snackBar } = uiStore()

    useEffect(() => {
        async function getProduct() {
            window.scrollTo({ top: 0, behavior: 'smooth' })

            try {
                const res = await fetchProduct(id)

                setProduct(res.data)
            } catch (error) {
                setErrorMessage(error?.response?.data?.message || 'Failed to fetch product')
            } finally {
                setProductLoading(false)
            }
        }
        getProduct()
    }, [id])

    return (
        <>
            <AppBar />

            <SnackBar {...snackBar} />

            {
                product && <div className={styles.breadcrumbs}>
                    <Link to='/'>Store</Link>
                    {' / '}<Link to={`/${product.category}`}>{product.category}</Link>
                    {' / '}<strong>{product.title}</strong>
                </div>
            }

            {productLoading ?
                <Loading />
                :
                !product ?
                    <NoItemsSection message={errorMessage} />
                    :
                    <ProductDetails {...product} />
            }

            {product &&
                <SimilarProducts {...product} />
            }

            <Footer />
        </>
    )
}