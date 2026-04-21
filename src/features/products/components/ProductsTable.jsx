import styles from '../../../shared/components/Table/Table.module.css'
import Loading from "../../../shared/ui/Loading/Loading"
import { useEffect, useState } from "react"
import { productsStore } from '../store/productsStore'
import UpdateProductDialog from "./Update ProductDialog/UpdateProductDialog"
import ConfirmModal from "../../../shared/ui/ConfirmModal/ConfirmModal"
import { fetchProducts, deleteProduct } from "../api/productsAPI"
import { uiStore } from "../../../app/store/uiStore"
import { categoriesStore } from "../../categories/store/categoriesStore"
import Input from '../../../shared/ui/Input/Input'
import Button from '../../../shared/ui/Button/Button'

export default function ProductsTable() {
    const { products, setProducts, filteredProducts, searchProducts } = productsStore()
    const { categories } = categoriesStore()
    const { showSnackBar } = uiStore()
    const [fetchLoading, setFetchLoading] = useState(true)
    const [productToDelete, setProductToDelete] = useState()
    const headers = ['Title', 'Price', 'Category', 'Actions']
    const [productToUpdate, setProductToUpdate] = useState()

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetchProducts()

                setProducts(res.data.map(product => ({ ...product, price: new Intl.NumberFormat().format(product.price) })))
            } catch (error) {
                const errorMessage = error?.response?.data?.message || 'Failed to fetch products'
                showSnackBar({ visible: true, success: false, text: errorMessage })
            } finally {
                setFetchLoading(false)
            }
        }

        getData()
    }, [])

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct(productId)

            setProducts(products.filter(product => product._id !== productId), true)

            showSnackBar({ visible: true, success: true, text: 'Product Deleted' })
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to delete product'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        }
    }

    return (
        <>
            <div className={styles.header}>
                <strong className={styles.productsHeader}>Products</strong>

                <div className={styles.searchSection}>
                    <Input type="text" name="search" id="search" placeholder="Search" onChange={e => searchProducts(e.target.value)} />

                    <select className={styles.select} name="category" id="search-category" defaultValue={''} onChange={e => searchProducts(e.target.value, 'categories')} >
                        <option value="" disabled >Filter category</option>

                        <option value="All Products" >All Products</option>

                        {categories?.map(category => <option key={category._id} value={category.name}>{category.name}</option>)}
                    </select>
                </div>
            </div>

            {
                fetchLoading ?
                    <Loading />
                    :
                    !filteredProducts ?
                        <section className="no-items">
                            <h2>Error occured, please try again later</h2>
                        </section>
                        :
                        filteredProducts.length === 0 ?
                            <section className="no-items">
                                <h2>No products found</h2>
                            </section>
                            :
                            <section className={styles.container}>
                                <table className={styles.table} id={styles.productsTable}>
                                    <thead>
                                        <tr>{headers.map(header => <td key={header}>
                                            {header}
                                        </td>)}</tr>
                                    </thead>

                                    <tbody>
                                        {filteredProducts.map(product => <tr key={product._id}>
                                            <td>{product.title}</td>

                                            <td className={styles.entry}>{product.price}</td>

                                            <td className={styles.entry}>{product.category}</td>

                                            <td>
                                                <Button id={styles.whiteBttn} onClick={() => setProductToUpdate(product)}>Update</Button>

                                                <Button id={styles.redBttn} onClick={() => setProductToDelete(product)}>Delete</Button>
                                            </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </section>
            }

            {productToUpdate && <UpdateProductDialog product={productToUpdate} setProduct={(product) => setProductToUpdate(product)} />}

            {productToDelete &&
                <ConfirmModal
                    close={() => setProductToDelete()}
                    message={'Delete product: ' + productToDelete.title + ' ?'}
                    action={async () => { await handleDeleteProduct(productToDelete._id) }} />}
        </>
    )
}