import styles from './Steps.module.css'
import { checkoutStore } from "../../store/checkoutStore"

export default function Steps() {
    const { step } = checkoutStore()

    return (
        <div className={styles.steps}>
            <button className={step === 1 ? styles.blueCircle : styles.greenCircle}></button>

            <p className={styles.step}>Shipping address </p>

            <p className={styles.line}></p>

            <button className={step === 1 ? styles.whiteCircle : step === 2 ? styles.blueCircle : styles.greenCircle}></button>

            <p className={styles.step}>Review Order </p>

            <p className={styles.line}></p>

            <button className={step === 4 ? styles.greenCircle : step === 3 ? styles.blueCircle : styles.whiteCircle}></button>

            <p className={styles.step}>Payment</p>
        </div>
    )
}