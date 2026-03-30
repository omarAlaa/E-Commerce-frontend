import './ManageProducts.css'
import AppBar from '../../../../shared/layout/AppBar/AppBar'
import UserPanel from '../../../../shared/layout/UserPanel/UserPanel'
import AddProductForm from '../../components/AddProductForm'
import ProductsTable from '../../components/ProductsTable'
import SnackBar from '../../../../shared/ui/SnackBar/SnackBar'
import { uiStore } from '../../../../app/store/uiStore'

export default function ManageProducts() {
    const { snackBar } = uiStore()

    return (
        <>
            <AppBar />

            <main className="manage-products-main">
                <UserPanel page={'products'} />

                <hr id='hide-hr' />

                <section className="manage-products-body">
                    <header className="upper-panel"><h2>Products</h2></header>
                    <AddProductForm />

                    <hr id='users-admins-hr' />

                    <ProductsTable />
                </section>
            </main>

            <SnackBar {...snackBar} />
        </>
    )
}