import { useEffect, useRef, useState } from 'react'
import './ProductPage.css'
import { useParams, Link } from 'react-router-dom'
import AppBar from '../Components/AppBar'
import { Star } from 'lucide-react'
import SnackBar from '../Components/SnackBar'
import Footer from '../Components/Footer'
import { useStore } from '../Components/useStore'

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState()
    const [similarProducts, setSimilarProducts] = useState()
    const scrollRef = useRef()
    const [scrollTimes, setScrollTimes] = useState(0)
    const allowedScrollTimes = similarProducts?.length - 3
    const { addToCart, snackBar } = useStore()

    function scroll(direction) {
        if (scrollRef.current) {
            if (direction === 'right') {
                scrollRef.current.scrollLeft += 200
                setScrollTimes(scrollTimes + 1)
            } else {
                scrollRef.current.scrollLeft -= 200
                setScrollTimes(scrollTimes - 1)
            }
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        fetch(`${import.meta.env.VITE_API_URL}/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products/${product?.category}`)
            .then(res => res.json())
            .then(data => setSimilarProducts(data.filter(similarProduct => similarProduct._id !== product?._id)))
    }, [product])

    return (
        <>
            <AppBar />
            <article className='breadcrumbs'>
                <Link to='/'>Store</Link>
                {' / '}<Link to={`/${product?.category}`}>{product?.category}</Link>
                {' / '}<strong>{product?.title}</strong>
            </article>
            <section className="product-container">
                <article className='img-container'>
                    <img src={product?.image} alt="" width={'300px'} height={'300px'} />
                </article>
                <article className='product-details'>
                    <h2>{product?.title}</h2>
                    <hr />
                    <div className="price-add">
                        <h2>{new Intl.NumberFormat().format(product?.price)} EGP</h2>
                        <button onClick={() => addToCart(product)}>+ Add</button>
                    </div>
                    <hr />
                    <strong>DESCRIPTION</strong>
                    <p>{product?.description}</p>
                    <div className="rating">
                        {Array.from({ length: 5 }, (_, index) =>
                            <Star key={index} fill={Math.round(product?.rate.rating) > index ? 'gold' : 'white'} />
                        )}
                        <h4>{product?.rate.rating} ({product?.rate.count})</h4>
                    </div>
                </article>
                <SnackBar {...snackBar} />
            </section>
            <h2 id='similar-products-text'>Similar Products</h2>
            <button disabled={scrollTimes !== 0 ? false : true} className='left-arrow' onClick={() => scroll('left')} style={{ opacity: scrollTimes !== 0 ? '1' : '0', cursor: scrollTimes !== 0 ? 'pointer' : 'default' }}>{'<'}</button>
            <button disabled={scrollTimes !== allowedScrollTimes ? false : true} className='right-arrow' onClick={() => scroll('right')} style={{ opacity: scrollTimes !== allowedScrollTimes ? '1' : '0', cursor: scrollTimes !== allowedScrollTimes ? 'pointer' : 'default' }}>{'>'}</button>
            <section className="similar-products" ref={scrollRef}>
                {similarProducts?.map(prod => <div key={prod._id} className='similar-product-container'>
                    <Link to={`/product/${prod._id}`}><img src={prod.image} alt="" width={'200px'} height={'200px'} /></Link>
                    <h3>{prod.title}</h3>
                </div>)}
            </section>
            <Footer />
        </>
    )
}