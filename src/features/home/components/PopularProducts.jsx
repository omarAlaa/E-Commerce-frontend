import { uiStore } from "../../../app/store/uiStore"
import Product from "../../../shared/components/Product/Product"
import Loading from "../../../shared/ui/Loading/Loading"
import { useEffect, useState } from "react"
import { fetchPopularProducts } from "../../products/api/productsAPI"
import Container from "../../../shared/ui/Container/Container"
import NoItemsSection from "../../../shared/ui/NoItemsSection/NoItemsSection"

export default function PopularProducts() {
    const [popularProducts, setPopularProducts] = useState()
    const [fetchLoading, setFetchLoading] = useState(true)
    const { showSnackBar } = uiStore()

    useEffect(() => {
        const getPopularProducts = async () => {
            try {
                const res = await fetchPopularProducts()

                setPopularProducts(res.data)
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to fetch popular products'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setFetchLoading(false)
            }
        }

        getPopularProducts()
    }, [])

    return (
        <>
            <h2>Popular Products</h2>

            {
                fetchLoading ?
                    <Loading />
                    :
                    !popularProducts ?
                        <NoItemsSection message="Error occured, please try again later" />
                        :
                        popularProducts.length === 0 ?
                            <NoItemsSection message="No products found" />
                            :
                            <Container>
                                {popularProducts.map(product => <Product key={product._id} {...product} />)}
                            </Container>
            }
        </>
    )
}