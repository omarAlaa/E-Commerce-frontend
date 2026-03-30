import { productsStore } from "../store/productsStore"
import Loading from "../../../shared/ui/Loading/Loading"
import { updateProduct } from "../api/productsAPI"
import { useState } from "react"
import { uiStore } from "../../../app/store/uiStore"

export default function UpdateProductDialog() {
    const { products, setProducts, productToUpdate, closeUpdate, setProductToUpdate } = productsStore()
    const { showSnackBar } = uiStore()
    const [updateProductLoading, setUpdateProductLoading] = useState(false)

    const handleUpdateProduct = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setUpdateProductLoading(true)

        if (!data.get('price-update') || !data.get('category-update') || !data.get('description-update') || !data.get('image-url-update')) {
            showSnackBar({ visible: true, success: false, text: 'You must fill all the fields' })

            setUpdateProductLoading(false)
            return
        }

        if (data.get('price-update') === productToUpdate.price && data.get('category-update') === productToUpdate.category && data.get('description-update') === productToUpdate.description && data.get('image-url-update') === productToUpdate.image) {
            showSnackBar({ visible: true, success: false, text: 'No values updated' })

            setUpdateProductLoading(false)
            return
        }

        try {
            const res = await updateProduct(productToUpdate._id, { dialogProduct: { ...productToUpdate, price: Number(data.get('price-update').replace(/,/g, '')), category: data.get('category-update'), image: data.get('image-url-update'), description: data.get('description-update') } })

            setProductToUpdate(res.data)
            setProducts(products.map(product => product._id === res.data._id ? res.data : product))

            showSnackBar({ visible: true, success: true, text: 'Product updated' })
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to update product'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        } finally {
            setUpdateProductLoading(false)
        }
    }

    return (
        <>
            {
                productToUpdate &&
                <section className="modal" onClick={closeUpdate}>
                    <form onSubmit={handleUpdateProduct} className='dialog-product' onClick={e => e.stopPropagation()}>
                        <strong>{productToUpdate.title}</strong>

                        <hr />

                        <article className="one-row">
                            <label htmlFor="price-update">Price:
                                <input type="number" name="price-update" id="price-update" step='0.01' min='0' defaultValue={String(productToUpdate.price).replace(/,/g, "")} />
                            </label>

                            <label htmlFor="category-update">Category:
                                <input type="text" name="category-update" id="category-update" defaultValue={productToUpdate.category} />
                            </label>
                        </article>

                        <label htmlFor="image-url-update">
                            Image URL:
                            <input type="text" name="image-url-update" id="image-url-update" defaultValue={productToUpdate.image} />
                        </label>

                        <label htmlFor="description-update">Description:
                            <textarea className="description-update" type="text" name="description-update" id="description-update" defaultValue={productToUpdate.description} />
                        </label>

                        <article className="manage-order-buttons">
                            <button id='update-button'
                                type="submit"
                                disabled={updateProductLoading}
                            >{updateProductLoading ? <Loading size={15} height={'100%'} /> : 'Update'}
                            </button>

                            <button type="button" onClick={closeUpdate}>Close</button>
                        </article>
                    </form>
                </section>
            }
        </>
    )
}