import styles from './CategoriesModal.module.css'
import { useState } from "react"
import Loading from "../../../../shared/ui/Loading/Loading"
import { Trash2 } from 'lucide-react'
import ConfirmModal from "../../../../shared/ui/ConfirmModal/ConfirmModal"
import { categoriesStore } from "../../../categories/store/categoriesStore"
import { addCategory, deleteCategory } from "../../../categories/api/categoriesAPI"
import { uiStore } from "../../../../app/store/uiStore"
import Input from '../../../../shared/ui/Input/Input'
import Button from '../../../../shared/ui/Button/Button'

export default function CategoriesModal() {
    const { categories, setCategories, showCatModal, setShowCatModal } = categoriesStore()
    const { showSnackBar } = uiStore()
    const [addCategoryLoading, setAddCategoryLoading] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [categoryToDelete, setCategoryToDelete] = useState()
    const addCatDisabled = addCategoryLoading || !newCategory || !imageURL

    const handleAddCategory = async () => {
        setAddCategoryLoading(true)

        try {
            const res = await addCategory(newCategory, imageURL)
            setCategories([res.data, ...categories])

            showSnackBar({ visible: true, success: true, text: 'Category Added' })

            setNewCategory('')
            setImageURL('')
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to add category'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        } finally {
            setAddCategoryLoading(false)
        }
    }

    const handleDeleteCategory = async (id) => {

        try {
            await deleteCategory(id)

            setCategories(categories.filter(category => category._id !== id))

            showSnackBar({ visible: true, success: true, text: 'Category Deleted' })
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to delete category'
            showSnackBar({ visible: true, success: false, text: errorMessage })
        }
    }

    return (
        showCatModal &&
        <div className={styles.modal} onClick={() => setShowCatModal(false)}>
            <div className={styles.dialogProduct} onClick={e => e.stopPropagation()}>
                <strong>Add new category</strong>

                <div className={styles.oneRow}>
                    <div className={styles.inputContainer}>
                        <Input type="text" value={newCategory} name="new-category" id="new-category" placeholder="Category name" onChange={e => setNewCategory(e.target.value)} />

                        <Input type="text" value={imageURL} name="image-url" id="image-url" placeholder="Image URL" onChange={e => setImageURL(e.target.value)} />
                    </div>

                    <Button id={!addCatDisabled ? styles.addBttn : styles.disabled}
                        type="button"
                        disabled={addCatDisabled}
                        onClick={handleAddCategory}
                    >
                        {addCategoryLoading ? <Loading size={18} height={'100%'} /> : '+ Add'}
                    </Button>
                </div>

                <strong>Categories</strong>
                {
                    categories?.map(category =>
                        <div className={styles.catBox} key={category._id}>
                            <p>{category.name}</p>

                            <div title="Delete category"><Trash2 color="red" onClick={() => setCategoryToDelete(category)} style={{ cursor: 'pointer' }} /> </div>
                        </div>
                    )
                }

                <Button id={styles.cancelBttn} onClick={() => setShowCatModal(false)}>
                    Close
                </Button>
            </div>

            {categoryToDelete &&
                <ConfirmModal
                    close={() => setCategoryToDelete()}
                    message={`Delete category: ${categoryToDelete.name} ?`}
                    action={async () => { await handleDeleteCategory(categoryToDelete._id) }} />}
        </div>
    )
}