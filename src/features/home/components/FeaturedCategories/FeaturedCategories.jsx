import styles from './FeaturedCategories.module.css'
import Loading from "../../../../shared/ui/Loading/Loading"
import { Link } from "react-router-dom"
import { categoriesStore } from "../../../categories/store/categoriesStore"
import Container from '../../../../shared/ui/Container/Container'

export default function FeaturedCategories() {
    const { categories, categoriesFetched } = categoriesStore()

    return (
        <>
            <h2>Shop by Category</h2>

            {
                !categoriesFetched ?
                    <Loading />
                    :
                    !categories ?
                        <section className='no-items'>
                            <h2>Error occured, please try again later</h2>
                        </section>
                        :
                        categories.length === 0 ?
                            <section className='no-items'>
                                <h2>No categories found</h2>
                            </section>
                            :
                            <Container>
                                {
                                    categories.map(category => <Link to={`/${category.name}`} key={category._id} className={styles.card}>
                                        <img className={styles.image} src={category.image} alt="" />

                                        <strong>{category.name}</strong>
                                    </Link>)
                                }
                            </Container>
            }
        </>
    )
}