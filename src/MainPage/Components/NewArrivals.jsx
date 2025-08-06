import { useEffect, useState } from "react"
import Product from "../../Components/Product"

export default function NewArrivals() {
    const [newArrivals, setNewArrivals] = useState()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/newArrivals`)
            .then(res => res.json())
            .then(data => setNewArrivals(data.newArrivals))
    }, [])

    return (
        <section className="container">
            {newArrivals?.map(product => <Product key={product._id} {...product} />)}
        </section>
    )
}