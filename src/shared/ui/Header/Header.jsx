import styles from './Header.module.css'

export default function Header({ title }) {
    return (
        <h2 className={styles.header}>
            {title}
        </h2>
    )
}