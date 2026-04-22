import styles from './Textarea.module.css'

export default function Textarea(props) {
    return (
        <textarea className={styles.textarea} {...props} />
    )
}