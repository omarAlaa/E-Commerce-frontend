import styles from './Payment.module.css'
import { CreditCard } from 'lucide-react'
import Input from '../../../../shared/ui/Input/Input'

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
                    <Input autoComplete='off' type="text" name="card-number" id="card-number" placeholder='0000 0000 0000 0000' />
                </label>

                <label className={styles.cvv} htmlFor="cvv">
                    CVV *
                    <Input autoComplete='off' type="text" name="cvv" id="cvv" placeholder='123' />
                </label>
            </div>

            <div className={styles.name_date}>
                <label className={styles.name} htmlFor="name">
                    Name *
                    <Input autoComplete='on' type="text" name="name" id="name" placeholder='Omar Mohamed Alaa' />
                </label>

                <label className={styles.date} htmlFor="date">
                    Ex. date *
                    <Input autoComplete='off' type="text" name="date" id="date" placeholder='MM/YY' />
                </label>
            </div>
        </form>
    )
}