import Loading from './Loading'
import { Link } from "react-router-dom"
import { Star } from 'lucide-react'
import { useStore } from "./useStore"
import { useState } from 'react'

export default function Product(props) {
    const [isLoading, setIsLoading] = useState(false)
    const { addToCart } = useStore()

    return (
        <article key={props?._id} className="product-card">
            <Link className="image-container" to={`/product/${props?._id}`}><img src={props?.image} alt="" /></Link>
            <Link className="link" to={`/${props?.category}`} id="category">{props?.category}</Link>
            <Link to={`/product/${props?._id}`} id="title" title={props?.title}>{props?.title}</Link>
            <article className="rating">
                {Array.from({ length: 5 }, (_, index) =>
                    <Star key={index} fill={Math.round(props?.rate.rating) > index ? 'gold' : 'white'} size={20} />)}
                <p>{props?.rate.rating} {`(${props?.rate.count})`}</p>
            </article>
            <article className="price-addCart">
                <strong>{Intl.NumberFormat().format(props?.price)} EGP</strong>
                <button onClick={async () => {
                    setIsLoading(true)
                    await addToCart(props)
                    setIsLoading(false)
                }}
                    disabled={isLoading}>{isLoading ? <Loading size={15} height={'100%'} /> : '+ Add'}</button>
            </article>
        </article>
    )
}