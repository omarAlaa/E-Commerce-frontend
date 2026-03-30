import Product from "../../../shared/components/Product/Product"
import Loading from "../../../shared/ui/Loading/Loading"
import { useEffect, useState } from "react"
import { fetchNewArrivals } from "../../products/api/productsAPI"
import { uiStore } from "../../../app/store/uiStore"
import Container from "../../../shared/ui/Container/Container"

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
                        <section className='no-items'>
                            <h2>Error occured, please try again later</h2>
                        </section>
                        :
                        newArrivals.length === 0 ?
                            <section className='no-items'>
                                <h2>No products found</h2>
                            </section>
                            :
                            <Container>
                                {newArrivals.map(product => <Product key={product._id} {...product} />)}
                            </Container>
            }
        </>
    )
}