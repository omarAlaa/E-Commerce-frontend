import styles from './Button.module.css'

export default function Button(props) {
    return (
        <button className={props.disabled ? styles.disabled : styles.button} {...props} />
    )
}