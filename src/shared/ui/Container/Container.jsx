import styles from './Container.module.css'

export default function Container({ children, id }) {
    return (
        <section className={styles.container} id={id}>
            {children}
        </section>
    )
}