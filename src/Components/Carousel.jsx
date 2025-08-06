import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './Carousel.css'

export default function Carousel() {
    const scrollRef = useRef()

    function scroll(direction) {
        scrollRef.current.scrollLeft += direction === 'right' ? 900 : -900
    }

    return (
        <section className='carousel-section'>
            <button onClick={() => scroll('left')}>{'<'}</button>
            <button onClick={() => scroll('right')}>{'>'}</button>
            <article className="carousel-body" ref={scrollRef}>
                <Link className='carousel-image' to={`/product/67bddceec4bfab1e970aa339`}>
                    <img src="https://i.ibb.co/fGCrnZkB/81-Zt42io-Cg-L-AC-SX679-removebg-preview.png" alt="" title='Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED' />
                </Link>
                <Link className='carousel-image' to={`/product/67bddca2c4bfab1e970aa336`}>
                    <img src="https://i.ibb.co/Wdt76MQ/81-Qpk-Ictq-PL-AC-SX679-removebg-preview-1.png" alt="" title='
Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin' />
                </Link>
            </article>
        </section>

    )
}