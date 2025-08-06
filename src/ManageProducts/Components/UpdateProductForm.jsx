export default function UpdateProductForm(props) {
    return (
        <form action={props.updateProduct} className='dialog-product'>
            <strong>{props.dialogProduct.title}</strong>
            <hr />
            <article className="one-row">
                <label htmlFor="price-update">Price:
                    <input type="text" name="price-update" id="price-update" defaultValue={props.dialogProduct.price} />
                </label>
                <label htmlFor="category-update">Category:
                    <input type="text" name="category-update" id="category-update" defaultValue={props.dialogProduct.category} />
                </label>
            </article>
            <label htmlFor="image-url-update">
                Image URL:
                <input type="text" name="image-url-update" id="image-url-update" defaultValue={props.dialogProduct.image} />
            </label>
            <label htmlFor="description-update">Description:
                <textarea className="description-update" type="text" name="description-update" id="description-update" defaultValue={props.dialogProduct.description} />
            </label>
            <article className="manage-order-buttons">
                <button id='update-button'>Update</button>
                <button type="button" onClick={props.emptyDialogProduct}>Close</button>
            </article>
        </form>
    )
}