import Loading from "../../Components/Loading"
import SnackBar from "../../Components/SnackBar"
import Table from '../../Components/Table'
import { useEffect, useState } from "react"
import axios from "axios"

export default function ProductsTable(props) {

    const [products, setProducts] = useState()
    const [productToUpdate, setProductToUpdate] = useState()
    const [productsChanged, setProductsChanged] = useState(false)
    const [productToDelete, setProductToDelete] = useState()
    const [dltLoading, setDltLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [snackBar, setSnackBar] = useState()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data.map(product => ({ ...product, price: new Intl.NumberFormat().format(product.price) }))))
    }, [productsChanged, props.newProduct])

    async function updateProduct(e) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        if (!data.get('price-update') || !data.get('category-update') || !data.get('description-update') || !data.get('image-url-update')) {
            setSnackBar({ visible: true, success: false, text: 'You must fill all the fields' })
            setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
            return
        }
        if (data.get('price-update') === productToUpdate.price && data.get('category-update') === productToUpdate.category && data.get('description-update') === productToUpdate.description && data.get('image-url-update') === productToUpdate.image) {
            setSnackBar({ visible: true, success: false, text: 'No values updated' })
            setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
            return
        }
        try {
            setUpdateLoading(true)
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/updateProduct/${productToUpdate._id}`, { dialogProduct: { ...productToUpdate, price: Number(data.get('price-update').replace(/,/g, '')), category: data.get('category-update'), image: data.get('image-url-update'), description: data.get('description-update') } })
            setProductToUpdate(res.data.dialogProduct)
            setProductsChanged(!productsChanged)
            setSnackBar({ visible: true, success: true, text: 'Product updated' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: error.message })
        }
        setUpdateLoading(false)
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    async function deleteProduct(id) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/deleteProduct/${id}`)
            setProductsChanged(!productsChanged)
            setSnackBar({ visible: true, success: true, text: 'Product Deleted' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: 'Error occured, please try again later' })
        }
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    return (
        <>
            {products ?
                <Table title='All Products' headers={['title', 'price', 'category', 'action']} rows={products} actions={['Update', 'Delete']} reviewProduct={(product) => setProductToUpdate(product)} deleteProduct={(product) => setProductToDelete(product)} />
                : <Loading />}
            {productToUpdate &&
                <section className="modal" onClick={() => setProductToUpdate()}>
                    <form onSubmit={updateProduct} className='dialog-product' onClick={e => e.stopPropagation()}>
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
                            <button type="submit" id='update-button' disabled={updateLoading}>{updateLoading ? <Loading size={15} height={'100%'} /> : 'Update'}</button>
                            <button type="button" onClick={() => setProductToUpdate()}>Close</button>
                        </article>
                    </form>
                </section>}
            {productToDelete && <section className="modal" onClick={() => setProductToDelete()}>
                <article className="dialog-product" onClick={e => e.stopPropagation()}>
                    <strong>{'Delete product: ' + productToDelete.title + ' ?'}</strong>
                    <div className="confirm-bttns">
                        <button className="delete-bttn"
                            onClick={async () => {
                                setDltLoading(true)
                                await deleteProduct(productToDelete._id)
                                setDltLoading(false)
                                setProductToDelete()
                            }}
                        >{dltLoading ? <Loading size={15} height={'100%'} /> : 'Yes'}</button>
                        <button className="cancel-bttn" onClick={() => setProductToDelete()}>No</button>
                    </div>
                </article>
            </section>}
            <SnackBar {...snackBar} />
        </>
    )
}