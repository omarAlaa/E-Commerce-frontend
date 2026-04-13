import styles from './CategoriesModal.module.css'
import { useState } from "react"
import Loading from "../../../../shared/ui/Loading/Loading"
import { Trash2 } from 'lucide-react'
import ConfirmModal from "../../../../shared/ui/ConfirmModal/ConfirmModal"
import { categoriesStore } from "../../../categories/store/categoriesStore"
import { addCategory, deleteCategory } from "../../../categories/api/categoriesAPI"
import { uiStore } from "../../../../app/store/uiStore"

export default function CategoriesModal() {
    const { categories, setCategories, showCatModal, setShowCatModal } = categoriesStore()
    const { showSnackBar } = uiStore()
    const [addCategoryLoading, setAddCategoryLoading] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    const [categoryToDelete, setCategoryToDelete] = useState()

    const handleAddCategory = async () => {
        setAddCategoryLoading(true)

        try {
            const res = await addCategory(newCategory)
            setCategories([res.data, ...categories])

            showSnackBar({ visible: true, success: true, text: 'Category Added' })

            setNewCategory('')
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
                    <input className={styles.input} type="text" value={newCategory} name="new-category" id="new-category" placeholder="Category" onChange={e => setNewCategory(e.target.value)} />

                    <button className={styles.addBttn}
                        type="button"
                        disabled={addCategoryLoading || !newCategory}
                        onClick={handleAddCategory}
                        style={{ cursor: !newCategory ? 'not-allowed' : 'pointer' }}
                    >
                        {addCategoryLoading ? <Loading size={15} height={'100%'} /> : '+ Add'}
                    </button>
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

                <button className={styles.cancelBttn} onClick={() => setShowCatModal(false)}>Close</button>
            </div>

            {categoryToDelete &&
                <ConfirmModal
                    close={() => setCategoryToDelete()}
                    message={`Delete category: ${categoryToDelete.name} ?`}
                    action={async () => { await handleDeleteCategory(categoryToDelete._id) }} />}
        </div>
    )
}