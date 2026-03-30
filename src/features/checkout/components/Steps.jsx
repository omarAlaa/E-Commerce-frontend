import { checkoutStore } from "../store/checkoutStore"

export default function Steps() {
    const { step } = checkoutStore()

    return (
        <article className='steps'>
            <button className="circle" style={{ background: step === 1 ? 'blue' : 'green' }}></button>

            <p>Shipping address </p>

            <p className='line'></p>

            <button className="circle" style={{ background: step === 1 ? 'white' : step === 2 ? 'blue' : 'green' }}></button>

            <p>Review Order </p>

            <p className='line'></p>

            <button className="circle" style={{ background: step === 4 ? 'green' : step === 3 ? 'blue' : 'white' }}></button>

            <p>Payment</p>
        </article>
    )
}