import './MainPage.css'
import AppBar from '../Components/AppBar'
import Carousel from '../Components/Carousel'
import FeaturedCategories from './Components/FeaturedCategories'
import NewArrivals from './Components/NewArrivals'
import PopularProducts from './Components/PopularProducts'
import SnackBar from '../Components/SnackBar'
import Footer from '../Components/Footer'
import { useStore } from '../Components/useStore'

export default function MainPage() {
    const { snackBar } = useStore()

    return (
        <main className='mainPage-main'>
            <AppBar />
            <section className="mainPage-body">
                <Carousel />
                <h2>Shop by Category</h2>
                <FeaturedCategories />
                <h2>New Arrivals</h2>
                <NewArrivals />
                <h2>Popular Products</h2>
                <PopularProducts />
            </section>
            <SnackBar {...snackBar} />
            <Footer />
        </main>
    )
}