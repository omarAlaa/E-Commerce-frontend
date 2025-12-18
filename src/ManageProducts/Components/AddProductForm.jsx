import Loading from "../../Components/Loading"
import SnackBar from "../../Components/SnackBar"
import { useState, useEffect } from "react"
import axios from "axios"
import { useStore } from '../../Components/useStore'
import { Settings, Trash2 } from 'lucide-react'

export default function AddProductForm(props) {

    const { categories, fetchCategories } = useStore()
    const [snackBar, setSnackBar] = useState()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState()
    const [showCatModal, setShowCatModal] = useState(false)
    const [dltCat, setDltCat] = useState()
    const [newCategory, setNewCategory] = useState('')
    const [catsChange, setCatsChange] = useState(false)
    const addBttnDisabled = !title || !price || !category || !description || !image || loading === 'addProduct'

    useEffect(() => {
        fetchCategories()
    }, [catsChange])

    async function addProduct(e) {
        e.preventDefault()
        setLoading('addProd')
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/addProduct`, { title, price, description, category, image })
            props.newProduct()
            setTitle('')
            setCategory('')
            setDescription('')
            setImage('')
            setPrice('')
            setSnackBar({ visible: true, success: true, text: 'Product Added' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: error.status === 401 ? 'Product already exists' : 'Error occured, please try again later' })
        }
        setLoading()
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    async function addCategory() {
        setLoading('addCat')
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/addCategory`, { name: newCategory })
            setCatsChange(!catsChange)
            setNewCategory('')
            setSnackBar({ visible: true, success: true, text: 'Category Added' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: error.status === 402 ? 'Category already exists' : 'Error occured, please try again later' })
        }
        setLoading()
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    async function deleteCategory(id) {
        setLoading('dltCat')
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/deleteCategory/${id}`)
            setCatsChange(!catsChange)
            setDltCat()
            setSnackBar({ visible: true, success: true, text: 'Category Deleted' })
        } catch (error) {
            setSnackBar({ visible: true, success: false, text: 'Error occured, please try again later' })
        }
        setLoading()
        setTimeout(() => { setSnackBar({ ...snackBar, visible: false }) }, 5000)
    }

    return (
        <form onSubmit={addProduct} className="add-product">
            <input type="text" value={title} name="title" id="product-title" placeholder="Title" onChange={e => setTitle(e.target.value)} />
            <article className="one-row">
                <select name="category" id="category" defaultValue={''} onChange={e => setCategory(e.target.value)} style={{ color: category ? 'black' : 'gray' }}>
                    <option value="" disabled>Select Category</option>
                    {categories?.map(category => <option key={category._id} value={category.name}>{category.name}</option>)}
                </select>
                <button type="button" className="manage-categories" onClick={() => setShowCatModal(true)} title="Manage Categories"><Settings size={20} /> Manage</button>
            </article>
            <article className="one-row">
                <input type="number" value={price} name="price" id="price" placeholder="Price" step="0.01" min="0" onChange={e => setPrice(e.target.value)} />
                <input type="text" value={image} name="image-url" id="image-url" placeholder="Image URL" onChange={e => setImage(e.target.value)} />
            </article>
            <textarea type="text" value={description} name="description" id="description" placeholder="Description" onChange={e => setDescription(e.target.value)} />
            <button className="new-product" type='submit' disabled={addBttnDisabled} style={{ cursor: addBttnDisabled ? 'not-allowed' : 'pointer' }}>{loading === 'addProd' ? <Loading size={15} height={'100%'} /> : '+ Add Product'}</button>
            {showCatModal && <section className="modal" onClick={() => setShowCatModal()}>
                <div className="dialog-product" onClick={e => e.stopPropagation()}>
                    <strong>Add new category</strong>
                    <div className="one-row">
                        <input type="text" value={newCategory} name="new-category" id="new-category" placeholder="Category" onChange={e => setNewCategory(e.target.value)} />
                        <button type="button" disabled={loading === 'addCat' || !newCategory} className="add-bttn" onClick={addCategory} style={{ cursor: !newCategory ? 'not-allowed' : 'pointer' }}>{loading === 'addCat' ? <Loading size={15} height={'100%'} /> : '+ Add'}</button>
                    </div>
                    <strong>Categories</strong>
                    {categories?.map(category =>
                        <div className="cat-box" key={category._id}>
                            <p>{category.name}</p>
                            <div title="Delete category"><Trash2 color="red" onClick={() => setDltCat(category)} style={{ cursor: 'pointer' }} /> </div>
                        </div>
                    )}
                    <button className="cancel-bttn" onClick={() => setShowCatModal()}>Close</button>
                </div>
            </section>}
            {dltCat && <section className="modal" onClick={() => setDltCat()}>
                <div className="dialog-product" onClick={e => e.stopPropagation()}>
                    <strong>{`Delete category: ${dltCat.name} ?`}</strong>
                    <div className="confirm-bttns">
                        <button type="button" disabled={loading === 'dltCat'} className="delete-bttn" onClick={() => deleteCategory(dltCat._id)}>{loading === 'dltCat' ? <Loading size={15} height={'100%'} /> : 'Yes'}</button>
                        <button type="button" className="cancel-bttn" onClick={() => setDltCat()}>No</button>
                    </div>
                </div>
            </section>}
            <SnackBar {...snackBar} />
        </form >
    )
}