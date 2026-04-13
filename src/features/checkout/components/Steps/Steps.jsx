import styles from './Steps.module.css'
import { checkoutStore } from "../../store/checkoutStore"

export default function Steps() {
    const { step } = checkoutStore()

    return (
        <div className={styles.steps}>
            <button className={styles.circle} style={{ background: step === 1 ? 'blue' : 'green' }}></button>

            <p className={styles.step}>Shipping address </p>

            <p className={styles.line}></p>

            <button className={styles.circle} style={{ background: step === 1 ? 'white' : step === 2 ? 'blue' : 'green' }}></button>

            <p className={styles.step}>Review Order </p>

            <p className={styles.line}></p>

            <button className={styles.circle} style={{ background: step === 4 ? 'green' : step === 3 ? 'blue' : 'white' }}></button>

            <p className={styles.step}>Payment</p>
        </div>
    )
}