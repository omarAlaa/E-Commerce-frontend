import styles from './SimilarProducts.module.css'
import { uiStore } from '../../../../../../app/store/uiStore'
import { fetchCategoryProducts } from '../../../../api/productsAPI'
import { useEffect, useRef, useState } from 'react'
import Loading from '../../../../../../shared/ui/Loading/Loading'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function SimilarProducts(product) {
    const [similarProducts, setSimilarProducts] = useState()
    const [similiarProductsLoading, setSimiliarProductsLoading] = useState(true)
    const { showSnackBar } = uiStore()
    const scrollRef = useRef()

    useEffect(() => {
        async function getSimilarProducts() {
            try {
                const res = await fetchCategoryProducts(product?.category)

                setSimilarProducts(res.data.filter(similarProduct => similarProduct._id !== product?._id))
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to fetch similar products'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setSimiliarProductsLoading(false)
            }
        }

        getSimilarProducts()
    }, [product])

    const scroll = (direction) => {
        scrollRef.current?.scrollBy({ left: direction * 320 })
    }

    return (
        <>
            <h2 className={styles.header}>Similar Products</h2>

            {!similiarProductsLoading &&
                <>
                    {similarProducts?.length === 0 ?

                        <section className='no-items'>
                            <h2>No similar Products</h2>
                        </section>
                        :
                        <>
                            <div className={styles.arrows}>
                                <ChevronLeft size={44} className={styles.arrow} onClick={() => scroll(-1)} />

                                <ChevronRight size={44} className={styles.arrow} onClick={() => scroll(1)} />
                            </div>

                            <section className={styles.similar_products} ref={scrollRef}>
                                {!similarProducts && <Loading />}

                                {similarProducts?.map(prod => <div key={prod._id} className={styles.similar_product_container}>
                                    <Link to={`/product/${prod._id}`}>
                                        <img className={styles.image} src={prod.image} alt="Product image" />
                                    </Link>

                                    <h3>{prod.title}</h3>
                                </div>)}
                            </section>
                        </>}
                </>
            }
        </>
    )
}