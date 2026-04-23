import styles from './UpdateProductDialog.module.css'
import { productsStore } from "../../store/productsStore"
import Loading from "../../../../shared/ui/Loading/Loading"
import { updateProduct } from "../../api/productsAPI"
import { useState } from "react"
import { uiStore } from "../../../../app/store/uiStore"
import { categoriesStore } from "../../../categories/store/categoriesStore"
import Input from '../../../../shared/ui/Input/Input'
import Button from '../../../../shared/ui/Button/Button'
import Modal from '../../../../shared/ui/Modal/Modal'
import Select from '../../../../shared/ui/Select/Select'
import Textarea from '../../../../shared/ui/Textarea/Textarea'
import Label from '../../../../shared/ui/Label/Label'

export default function UpdateProductDialog({ product, setProduct }) {
    const { products, setProducts } = productsStore()
    const { showSnackBar } = uiStore()
    const [updateProductLoading, setUpdateProductLoading] = useState(false)
    const [price, setPrice] = useState(String(product.price).replace(/,/g, ""))
    const [category, setCategory] = useState(product.category)
    const [description, setDescription] = useState(product.description)
    const [imageUrl, setImageUrl] = useState(product.image)
    const { categories } = categoriesStore()
    const updateDisabled = updateProductLoading || !price || !category || !description || !imageUrl || (price === String(product.price).replace(/,/g, "") && category === product.category && description === product.description && imageUrl === product.image)

    const handleUpdateProduct = async (e) => {
        e.preventDefault()

        setUpdateProductLoading(true)

        try {
            const res = await updateProduct(product._id, { updatedProduct: { ...product, price: Number(price), category: category, image: imageUrl, description: description } })

            setProduct(res.data)
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
                product &&
                <form onSubmit={handleUpdateProduct}>
                    <Modal onClose={() => setProduct(null)}>
                        <strong>{product.title}</strong>

                        <hr />

                        <div className={styles.oneRow}>
                            <Label id={styles.priceLabel} htmlFor="price-update">Price:
                                <Input type="number" name="price-update" id="price-update" step='0.01' min='0' defaultValue={price} onChange={e => setPrice(e.target.value)} />
                            </Label>

                            <Label id={styles.categoryLabel} htmlFor="category-update">Category:
                                <Select name="category" defaultValue={category} id="category-update" onChange={e => setCategory(e.target.value)}>
                                    {categories?.map(category => <option key={category._id} value={category.name}>{category.name}</option>)}
                                </Select>
                            </Label>
                        </div>

                        <Label htmlFor="image-url-update">
                            Image URL:
                            <Input type="text" name="image-url-update" id="image-url-update" defaultValue={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                        </Label>

                        <Label htmlFor="description-update">Description:
                            <Textarea type="text" name="description-update" id="description-update" defaultValue={description} onChange={e => setDescription(e.target.value)} />
                        </Label>

                        <div className={styles.actionsBttns}>
                            <Button id={!updateDisabled ? styles.updateBttn : styles.disabled}
                                disabled={updateDisabled}
                            >{updateProductLoading ? <Loading size={15} height={'100%'} /> : 'Update'}
                            </Button>

                            <Button id={styles.closeBttn} type="button" onClick={() => setProduct(null)}>
                                Close
                            </Button>
                        </div>
                    </Modal>
                </form>
            }
        </>
    )
}