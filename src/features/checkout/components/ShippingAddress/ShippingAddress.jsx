import styles from './ShippingAddress.module.css'
import Input from '../../../../shared/ui/Input/Input'
import Label from '../../../../shared/ui/Label/Label'

export default function ShippingAddress() {
    function submitAddress() {
    }

    return (
        <form action={submitAddress} className={styles.address}>
            <Label htmlFor="address-line">
                Address Line *
                <Input type="text" name="address-line" id="address-line" placeholder="Street name, number and apartment" />
            </Label>

            <div className={styles.city}>
                <Label htmlFor="area">
                    Area *
                    <Input type="text" name="area" id="area" placeholder='Nasr City' />
                </Label>

                <Label htmlFor="city">
                    City *
                    <Input type="text" name="city" id="city" placeholder="Cairo" />
                </Label>
            </div>
        </form>
    )
}