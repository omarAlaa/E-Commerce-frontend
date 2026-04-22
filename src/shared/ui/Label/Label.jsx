import styles from './Label.module.css'

export default function Label(props) {
    return (
        <label className={styles.label} {...props} />
    )
}