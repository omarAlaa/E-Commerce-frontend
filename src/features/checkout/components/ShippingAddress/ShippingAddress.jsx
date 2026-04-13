import styles from './ShippingAddress.module.css'

export default function ShippingAddress() {
    function submitAddress() {
    }

    return (
        <form action={submitAddress} className={styles.address}>
            <label htmlFor="address-line">
                Address Line *
            </label>

            <input className={styles.input} type="text" name="address-line" id="address-line" placeholder="Street name, number and apartment" />

            <div className={styles.city}>
                <label htmlFor="address-line">
                    Area *
                    <input className={styles.input} type="text" name="area" id="area" placeholder='Nasr City' />
                </label>

                <label htmlFor="address-line">
                    City *
                    <input className={styles.input} type="text" name="city" id="city" placeholder="Cairo" />
                </label>
            </div>
        </form>
    )
}