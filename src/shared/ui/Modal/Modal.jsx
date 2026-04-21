import styles from './Modal.module.css'

export default function Modal({ children, onClose }) {
    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.dialog} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}