import Loading from "../../../shared/ui/Loading/Loading"
import { Settings } from 'lucide-react'
import { useState, useRef } from "react"
import CategoriesModal from "./CategoriesModal"
import { addProduct } from "../api/productsAPI"
import { uiStore } from "../../../app/store/uiStore"
import { categoriesStore } from "../../categories/store/categoriesStore"
import { productsStore } from "../store/productsStore"

export default function AddProductForm() {

    const formRef = useRef()
    const { setShowCatModal, categories } = categoriesStore()
    const { addNewProduct } = productsStore()
    const { showSnackBar } = uiStore()
    const [category, setCategory] = useState('')
    const [addProductLoading, setAddProductLoading] = useState(false)

    const handleAddProduct = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setAddProductLoading(true)

        if (!data.get('title') || !data.get('price') || !data.get('category') || !data.get('description') || !data.get('image-url')) {
            showSnackBar({ visible: true, success: false, text: 'You must fill all the fields' })

            setAddProductLoading(false)
            return
        }

        try {
            const res = await addProduct({ title: data.get('title'), price: data.get('price'), description: data.get('description'), category: data.get('category'), image: data.get('image-url') })
            addNewProduct(res.data)

            showSnackBar({ visible: true, success: true, text: 'Product Added' })

            setCategory('')
            formRef.current.reset()
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to add product'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        } finally {
            setAddProductLoading(false)
        }
    }

    return (
        <form ref={formRef} onSubmit={handleAddProduct} className="add-product">
            <input type="text" name="title" id="product-title" placeholder="Title" />

            <article className="one-row">
                <select name="category" id="category" defaultValue={''} onChange={e => setCategory(e.target.value)} style={{ color: category ? 'black' : 'gray' }}>
                    <option value="" disabled >Select Category</option>

                    {categories?.map(category => <option key={category._id} value={category.name}>{category.name}</option>)}
                </select>

                <button type="button"
                    className="manage-categories"
                    onClick={() => setShowCatModal(true)}
                    title="Manage Categories"
                >
                    <Settings size={20} /> Manage
                </button>
            </article>

            <article className="one-row">
                <input type="number" name="price" id="price" placeholder="Price" step="0.01" min="0" />

                <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
            </article>

            <textarea type="text" name="description" id="description" placeholder="Description" />

            <button className="new-product"
                type='submit'>
                {addProductLoading ? <Loading size={15} height={'100%'} /> : '+ Add Product'}
            </button>

            <CategoriesModal />
        </form >
    )
}