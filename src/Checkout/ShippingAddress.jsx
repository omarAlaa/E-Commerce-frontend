export default function ShippingAddress() {
    function submitAddress() {
    }
    return (
        <form action={submitAddress} className="address">
            <label htmlFor="address-line">
                Address Line *
            </label>
            <input type="text" name="address-line" id="address-line" placeholder="Street name, number and apartment" />
            <article className="city">
                <label htmlFor="address-line">
                    Area *
                    <input type="text" name="area" id="area" placeholder='Nasr City' />
                </label>
                <label htmlFor="address-line">
                    City *
                    <input type="text" name="city" id="city" placeholder="Cairo" />
                </label>
            </article>
        </form>
    )
}