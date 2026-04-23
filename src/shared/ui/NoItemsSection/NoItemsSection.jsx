import styles from './NoItemsSection.module.css'

export default function NoItemsSection({ children, message, id }) {
    return (
        <section className={styles.section} id={id}>
            {children}
            <h2>{message}</h2>
        </section>
    )
}