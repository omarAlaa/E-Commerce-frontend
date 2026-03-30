import styles from './HomePage.module.css'
import AppBar from '../../../../shared/layout/AppBar/AppBar'
import Carousel from '../../../../shared/components/Carousel/Carousel'
import FeaturedCategories from '../../components/FeaturedCategories/FeaturedCategories'
import NewArrivals from '../../components/NewArrivals'
import PopularProducts from '../../components/PopularProducts'
import SnackBar from '../../../../shared/ui/SnackBar/SnackBar'
import Footer from '../../../../shared/layout/Footer/Footer'
import { uiStore } from '../../../../app/store/uiStore'

export default function HomePage() {
    const { snackBar } = uiStore()

    return (
        <>
            <AppBar />

            <main className={styles.main}>
                <Carousel />

                <FeaturedCategories />

                <NewArrivals />

                <PopularProducts />
            </main>

            <SnackBar {...snackBar} />

            <Footer />
        </>
    )
}