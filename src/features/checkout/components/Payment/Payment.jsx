import styles from './Payment.module.css'
import { CreditCard } from 'lucide-react'

export default function Payment() {
    function handlePayment() {
    }

    return (
        <form action={handlePayment} className={styles.form}>
            <strong>Credit Card</strong>
            <CreditCard />

            <div className={styles.number_cvv}>
                <label className={styles.number} htmlFor="card-number">
                    Card number *
                    <input className={styles.input} type="text" name="card-number" id="card-number" placeholder='0000 0000 0000 0000' />
                </label>

                <label className={styles.cvv} htmlFor="cvv">
                    CVV *
                    <input className={styles.input} type="text" name="cvv" id="cvv" placeholder='123' />
                </label>
            </div>

            <div className={styles.name_date}>
                <label htmlFor="name">
                    Name *
                    <input className={styles.input} type="text" name="name" id="name" placeholder='Omar Mohamed Alaa' />
                </label>

                <label htmlFor="date">
                    Expiration date *
                    <input className={styles.input} type="text" name="date" id="date" placeholder='MM/YY' />
                </label>
            </div>
        </form>
    )
}