import { Link } from 'react-router-dom'
import './Footer.css'
import { useStore } from './useStore'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
    const { categories } = useStore()

    return (
        <footer>
            <section className="footer-columns">
                <img src="https://i.ibb.co/nMmL6ft4/36682-removebg-preview.png" alt="" className='footer-column' />
                <article className='footer-column'>
                    <strong>Categories</strong>
                    {categories?.map(category => <Link to={`/${category.name}`} key={category._id} className='link'>{category.name}</Link>)}
                </article>
                <article className='footer-column'>
                    <strong>Contacts</strong>
                    <article><Phone fill='limegreen' /> <a href="tel:01127845822">01127845822</a></article>
                    <article><Mail fill='limegreen' /> <a href="mailto:omarmuhamed10@gmail.com">omarmuhamed10@gmail.com</a></article>
                    <article><MapPin fill='limegreen' /> Cairo, Egypt</article>
                </article>
            </section>
            <hr />
            <p>&copy; {new Date().getFullYear()} E-commerce website</p>
        </footer>
    )
}