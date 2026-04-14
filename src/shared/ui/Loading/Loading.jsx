import styles from './Loading.module.css'

export default function Loading({ height = '70vh', size = 220 }) {
    return (
        <div className={styles.container} style={{ '--height': height }}>
            <div className={styles.spinner} style={{ '--size': `${size}px` }}></div>
        </div>
    )
}