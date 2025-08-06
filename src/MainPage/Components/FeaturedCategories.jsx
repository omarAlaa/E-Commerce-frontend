import { useStore } from "../../Components/useStore"
import { Link } from "react-router-dom"

export default function FeaturedCategories() {
    const { categories } = useStore()

    return (
        <section className="container">
            {categories?.map(category => <Link to={`/${category.name.toLowerCase()}`} key={category._id} className="category-card">
                <img src={category.image} alt="" />
                <strong>{category.name}</strong>
            </Link>)}
        </section>
    )
}