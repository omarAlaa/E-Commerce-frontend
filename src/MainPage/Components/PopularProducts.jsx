import { useEffect, useState } from "react"
import Product from "../../Components/Product"

export default function PopularProducts() {
    const [popularProducts, setPopularProducts] = useState()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/popularProducts`)
            .then(res => res.json())
            .then(data => setPopularProducts(data.popularProducts))
    }, [])

    return (
        <section className="container">
            {popularProducts?.map(product => <Product key={product._id} {...product} />)}
        </section>
    )
}