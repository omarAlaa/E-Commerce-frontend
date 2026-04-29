import styles from './AddProductForm.module.css'
import Loading from "../../../../shared/ui/Loading/Loading"
import { Settings } from 'lucide-react'
import { useState, useRef } from "react"
import CategoriesModal from "../CategoriesModal/CategoriesModal"
import { addProduct } from "../../api/productsAPI"
import { uiStore } from "../../../../app/store/uiStore"
import { categoriesStore } from "../../../categories/store/categoriesStore"
import { productsStore } from "../../store/productsStore"
import Input from '../../../../shared/ui/Input/Input'
import Button from '../../../../shared/ui/Button/Button'
import Select from '../../../../shared/ui/Select/Select'
import Textarea from '../../../../shared/ui/Textarea/Textarea'

export default function AddProductForm() {

    const { setShowCatModal, categories } = categoriesStore()
    const { productsChange, changeProducts } = productsStore()
    const { showSnackBar } = uiStore()
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [addProductLoading, setAddProductLoading] = useState(false)
    const addDisabled = addProductLoading || !title || !price || !category || !description || !image

    const handleAddProduct = async (e) => {
        e.preventDefault()

        setAddProductLoading(true)

        try {
            const res = await addProduct({ title, price, description, category, image })
            changeProducts()

            showSnackBar({ visible: true, success: true, text: 'Product Added' })

            setTitle('')
            setCategory('')
            setPrice('')
            setImageUrl('')
            setDescription('')
        } catch (error) {
            console.log(error);

            const errorMessage = error?.response?.data?.message || 'Failed to add product'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        } finally {
            setAddProductLoading(false)
        }
    }

    return (
        <form onSubmit={handleAddProduct} className={styles.addProduct}>
            <Input type="text" name="title" id="product-title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />

            <div className={styles.oneRow}>
                <Select id={category ? styles.select : styles.graySelect} name="category" value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="" disabled >Select Category</option>

                    {categories?.map(category => <option key={category._id} className={styles.option} value={category.name}>{category.name}</option>)}
                </Select>

                <Button type="button"
                    id={styles.manageCategories}
                    onClick={() => setShowCatModal(true)}
                    title="Manage Categories"
                >
                    <Settings size={20} /> Manage
                </Button>
            </div>

            <div className={styles.oneRow}>
                <Input type="number" name="price" id="price" placeholder="Price" step="1" min="0" value={price} onChange={e => setPrice(e.target.value)} />

                <Input type="text" name="productImage" id="productImage" placeholder="Image URL" value={image} onChange={e => setImageUrl(e.target.value)} />
            </div>

            <Textarea type="text" name="description" id="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />

            <Button id={!addDisabled ? styles.newProduct : undefined}
                disabled={addDisabled}>
                {addProductLoading ? <Loading size={18} height={'100%'} /> : '+ Add Product'}
            </Button>

            <CategoriesModal />
        </form >
    )
}