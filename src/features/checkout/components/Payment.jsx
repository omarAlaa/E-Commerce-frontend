import { CreditCard } from 'lucide-react'

export default function Payment() {
    function handlePayment() {
    }

    return (
        <form action={handlePayment} className='payment-form'>
            <strong>Credit Card</strong>
            <CreditCard />

            <article className="card-number-cvv">
                <label className='card-number' htmlFor="card-number">
                    Card number *
                    <input type="text" name="card-number" id="card-number" placeholder='0000 0000 0000 0000' />
                </label>

                <label className='cvv' htmlFor="cvv">
                    CVV *
                    <input type="text" name="cvv" id="cvv" placeholder='123' />
                </label>
            </article>

            <article className="name-date">
                <label htmlFor="name">
                    Name *
                    <input type="text" name="name" id="name" placeholder='Omar Mohamed Alaa' />
                </label>

                <label htmlFor="date">
                    Expiration date *
                    <input type="text" name="date" id="date" placeholder='MM/YY' />
                </label>
            </article>
        </form>
    )
}