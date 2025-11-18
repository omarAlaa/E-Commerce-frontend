import Loading from "../../Components/Loading"
import { useFormStatus } from "react-dom"

function AddProductButton() {
    const { pending } = useFormStatus()
    return (
        <button disabled={pending}>{pending ? <Loading size={15} height={'100%'} /> : 'Add Product'}</button>
    )
}

export default function AddProductForm(props) {
    return (
        <form action={props.addProduct} className="add-product">
            <article className="one-row">
                <input type="text" name="title" id="title" placeholder="Title" />
                <input type="text" name="price" id="price" placeholder="Price" />
            </article>
            <article className="one-row">
                <input type="text" name="category" id="category" placeholder="Category" />
                <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
            </article>
            <textarea type="text" name="description" id="description" placeholder="Description" />
            <AddProductButton />
        </form>
    )
}