import styles from './ShippingAddress.module.css'
import Input from '../../../../shared/ui/Input/Input'

export default function ShippingAddress() {
    function submitAddress() {
    }

    return (
        <form action={submitAddress} className={styles.address}>
            <label htmlFor="address-line">
                Address Line *
                <Input type="text" name="address-line" id="address-line" placeholder="Street name, number and apartment" />
            </label>

            <div className={styles.city}>
                <label htmlFor="address-line">
                    Area *
                    <Input type="text" name="area" id="area" placeholder='Nasr City' />
                </label>

                <label htmlFor="address-line">
                    City *
                    <Input type="text" name="city" id="city" placeholder="Cairo" />
                </label>
            </div>
        </form>
    )
}