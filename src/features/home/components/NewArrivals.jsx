import Product from "../../../shared/components/Product/Product"
import Loading from "../../../shared/ui/Loading/Loading"
import { useEffect, useState } from "react"
import { fetchNewArrivals } from "../../products/api/productsAPI"
import { uiStore } from "../../../app/store/uiStore"
import Container from "../../../shared/ui/Container/Container"
import NoItemsSection from "../../../shared/ui/NoItemsSection/NoItemsSection"

export default function NewArrivals() {
    const [newArrivals, setNewArrivals] = useState()
    const [fetchLoading, setFetchLoading] = useState(true)
    const { showSnackBar } = uiStore()

    useEffect(() => {
        const getNewArrivals = async () => {
            try {
                const res = await fetchNewArrivals()

                setNewArrivals(res.data)
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to fetch new arrivals'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setFetchLoading(false)
            }
        }

        getNewArrivals()
    }, [])

    return (
        <>
            <h2>New Arrivals</h2>

            {
                fetchLoading ?
                    <Loading />
                    :
                    !newArrivals ?
                        <NoItemsSection message="Error occured, please try again later" />
                        :
                        newArrivals.length === 0 ?
                            <NoItemsSection message="No products found" />
                            :
                            <Container>
                                {newArrivals.map(product => <Product key={product._id} {...product} />)}
                            </Container>
            }
        </>
    )
}