import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { categoriesStore } from '../../../features/categories/store/categoriesStore'

export default function Footer() {
    const { categories } = categoriesStore()

    return (
        <footer className={styles.footer}>
            <div className={styles.columns}>
                <div className={styles.column}>
                    <img className={styles.image} src="https://i.ibb.co/nMmL6ft4/36682-removebg-preview.png" alt="Website image" />
                </div>

                <div className={styles.column}>
                    <strong className={styles.header}>Categories</strong>

                    {categories?.map(category => <Link to={`/${category.name}`} key={category._id} className={styles.link}>{category.name}</Link>)}
                </div>

                <div className={styles.column}>
                    <strong className={styles.header}>Contacts</strong>

                    <div className={styles.contact}><Phone fill='limegreen' /> <a className={styles.link} href="tel:01127845822">01127845822</a></div>

                    <div className={styles.contact}><Mail fill='limegreen' /> <a className={styles.link} href="mailto:omarmuhamed10@gmail.com">omarmuhamed10@gmail.com</a></div>

                    <div className={styles.contact}><MapPin fill='limegreen' /> Cairo, Egypt</div>
                </div>
            </div>

            <hr />

            <p>&copy; {new Date().getFullYear()} E-commerce website</p>
        </footer>
    )
}