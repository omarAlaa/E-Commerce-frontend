import styles from '../../../shared/components/Table/Table.module.css'
import Loading from "../../../shared/ui/Loading/Loading"
import { useEffect, useRef, useState } from "react"
import UpdateProductDialog from "./Update ProductDialog/UpdateProductDialog"
import ConfirmModal from "../../../shared/ui/ConfirmModal/ConfirmModal"
import { fetchProducts, deleteProduct } from "../api/productsAPI"
import { uiStore } from "../../../app/store/uiStore"
import { categoriesStore } from "../../categories/store/categoriesStore"
import Input from '../../../shared/ui/Input/Input'
import Button from '../../../shared/ui/Button/Button'
import Select from '../../../shared/ui/Select/Select'
import NoItemsSection from '../../../shared/ui/NoItemsSection/NoItemsSection'
import Pages from '../../../shared/ui/Pages/Pages'
import { Pencil, Trash2 } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce';

export default function ProductsTable() {
    const [products, setProducts] = useState()
    const [search, setSearch] = useState()
    const [filteredCategory, setFilteredCategory] = useState()
    const { categories } = categoriesStore()
    const { showSnackBar } = uiStore()
    const [fetchLoading, setFetchLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [productToDelete, setProductToDelete] = useState()
    const headers = ['Title', 'Price', 'Category', 'Actions']
    const [productToUpdate, setProductToUpdate] = useState()
    const prevPageRef = useRef(page)
    const headerRef = useRef()

    useEffect(() => {
        if (prevPageRef.current !== page) {
            prevPageRef.current = page

            const header = headerRef.current
            const yOffset = -80
            const y = header.getBoundingClientRect().top + window.pageYOffset + yOffset

            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }, [page])

    useEffect(() => {
        getProducts(search)
    }, [page, filteredCategory])

    const getProducts = async (search) => {
        setFetchLoading(true)
        setSearch(search)

        if (search || filteredCategory) {
            setPage(1)
        }

        try {
            const res = await fetchProducts(search, filteredCategory, page)

            setProducts(res.data.products.map(product => ({ ...product, price: new Intl.NumberFormat().format(product.price) })))
            setTotalPages(res.data.totalPages)
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to fetch products'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        } finally {
            setFetchLoading(false)
        }
    }

    const handleSearch = useDebouncedCallback((search) => {
        getProducts(search)
    }, 600)

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct(productId)

            setProducts(products.filter(product => product._id !== productId))
            changeProducts()

            showSnackBar({ visible: true, success: true, text: 'Product Deleted' })
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to delete product'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        }
    }

    return (
        <>
            <div ref={headerRef} className={styles.header}>
                <strong className={styles.productsHeader}>Products</strong>

                <div className={styles.searchSection}>
                    <Input type="text" name="search" id="search" placeholder="Search" onChange={e => handleSearch(e.target.value)} />

                    <Select name="category" id="search-category" defaultValue={''} onChange={e => setFilteredCategory(e.target.value)} >
                        <option value="" disabled >Filter category</option>

                        <option value="" >All Products</option>

                        {categories?.map(category => <option key={category._id} value={category.name}>{category.name}</option>)}
                    </Select>
                </div>
            </div>

            {
                fetchLoading ?
                    <Loading />
                    :
                    !products ?
                        <NoItemsSection message={'Error occured, please try again later'} />
                        :
                        products.length === 0 ?
                            <NoItemsSection message={"No products found"} />
                            :
                            <section className={styles.container}>
                                <table className={styles.table} id={styles.productsTable}>
                                    <thead>
                                        <tr>{headers.map(header => <td key={header}>
                                            {header}
                                        </td>)}</tr>
                                    </thead>

                                    <tbody>
                                        {products.map(product => <tr key={product._id}>
                                            <td>{product.title}</td>

                                            <td className={styles.entry}>{product.price}</td>

                                            <td className={styles.entry}>{product.category}</td>

                                            <td>
                                                <div className={styles.bttnsGroup}>
                                                    <Button id={styles.edit} onClick={() => setProductToUpdate(product)} title='Edit'> <Pencil color='blue' /> </Button>

                                                    <Button id={styles.delete} onClick={() => setProductToDelete(product)} title='Delete'> <Trash2 color='red' /> </Button>
                                                </div>
                                            </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </section>
            }

            <Pages page={page} totalPages={totalPages} changePage={(page) => setPage(page)} id={styles.pages} />

            {productToUpdate && <UpdateProductDialog product={productToUpdate} setProduct={(product) => setProductToUpdate(product)} />}

            {productToDelete &&
                <ConfirmModal
                    close={() => setProductToDelete()}
                    message={'Delete product: ' + productToDelete.title + ' ?'}
                    action={async () => { await handleDeleteProduct(productToDelete._id) }} />}
        </>
    )
}