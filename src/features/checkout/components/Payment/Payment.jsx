import styles from './Payment.module.css'
import { CreditCard } from 'lucide-react'
import Input from '../../../../shared/ui/Input/Input'
import Label from '../../../../shared/ui/Label/Label'

export default function Payment() {
    function handlePayment() {
    }

    return (
        <form action={handlePayment} className={styles.form}>
            <strong>Credit Card</strong>
            <CreditCard />

            <div className={styles.number_cvv}>
                <Label id={styles.number} htmlFor="card-number">
                    Card number *
                    <Input autoComplete='off' type="text" name="card-number" id="card-number" placeholder='0000 0000 0000 0000' />
                </Label>

                <Label id={styles.cvv} htmlFor="cvv">
                    CVV *
                    <Input autoComplete='off' type="text" name="cvv" id="cvv" placeholder='123' />
                </Label>
            </div>

            <div className={styles.name_date}>
                <Label id={styles.name} htmlFor="name">
                    Name *
                    <Input autoComplete='on' type="text" name="name" id="name" placeholder='Omar Mohamed Alaa' />
                </Label>

                <Label id={styles.date} htmlFor="date">
                    Ex. date *
                    <Input autoComplete='off' type="text" name="date" id="date" placeholder='MM/YY' />
                </Label>
            </div>
        </form>
    )
}