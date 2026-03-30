import './SnackBar.css'
import { CircleX, CircleCheckBig } from 'lucide-react'

export default function SnackBar(props) {
    return (
        <article className="snack-bar"
            style={{ display: props.visible ? 'flex' : 'none', animation: 'show-snackbar 5s ease-in-out forwards', background: props.success ? 'green' : 'red' }}
        >
            {props.success ? <CircleCheckBig /> : <CircleX />} <p>{props.text}</p>
        </article>
    )
}