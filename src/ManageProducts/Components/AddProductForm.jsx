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
            <button>Add Product</button>
        </form>
    )
}