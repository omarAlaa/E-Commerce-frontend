import styles from './Carousel.module.css'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function Carousel() {
    const scrollRef = useRef()

    function scroll(direction) {
        scrollRef.current.scrollLeft += direction * 900
    }

    return (
        <section className={styles.container}>
            <div className={styles.arrows}>
                <ChevronLeft size={44} className={styles.arrow} onClick={() => scroll(-1)} />

                <ChevronRight size={44} className={styles.arrow} onClick={() => scroll(1)} />
            </div>

            <div className={styles.body} ref={scrollRef}>
                <Link className={styles.imageContainer} to={`/product/69d3d092748e6fea11fe0a43`}>
                    <img className={styles.image} src="https://i.ibb.co/fGCrnZkB/81-Zt42io-Cg-L-AC-SX679-removebg-preview.png" alt="" title='Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED' />
                </Link>

                <Link className={styles.imageContainer} to={`/product/69d3d043748e6fea11fe0a41`}>
                    <img className={styles.image} src="https://i.ibb.co/Wdt76MQ/81-Qpk-Ictq-PL-AC-SX679-removebg-preview-1.png"
                        alt=""
                        title='Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin' />
                </Link>
            </div>
        </section>
    )
}