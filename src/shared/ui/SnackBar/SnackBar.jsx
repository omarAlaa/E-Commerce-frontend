import styles from './SnackBar.module.css'
import { CircleX, CircleCheckBig } from 'lucide-react'

export default function SnackBar(props) {
    return (
        <div className={props.visible ? props.success ? styles.greenSnackBar : styles.redSnackBar : styles.hide}>
            {props.success ? <CircleCheckBig /> : <CircleX />} <p>{props.text}</p>
        </div>
    )
}