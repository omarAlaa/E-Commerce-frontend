import styles from './FeaturedCategories.module.css'
import Loading from "../../../../shared/ui/Loading/Loading"
import { Link } from "react-router-dom"
import { categoriesStore } from "../../../categories/store/categoriesStore"
import Container from '../../../../shared/ui/Container/Container'
import NoItemsSection from '../../../../shared/ui/NoItemsSection/NoItemsSection'

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
                        <NoItemsSection message="Error occured, please try again later" />
                        :
                        categories.length === 0 ?
                            <NoItemsSection message="No categories found" />
                            :
                            <Container>
                                {
                                    categories.map(category => <Link to={`/${category.name}`} key={category._id} className={styles.card}>
                                        <img className={styles.image} src={category.imageURL} alt="" loading="lazy" />

                                        <strong>{category.name}</strong>
                                    </Link>)
                                }
                            </Container>
            }
        </>
    )
}