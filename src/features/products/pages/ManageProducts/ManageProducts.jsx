import styles from './ManageProducts.module.css'
import AppBar from '../../../../shared/layout/AppBar/AppBar'
import UserPanel from '../../../../shared/layout/UserPanel/UserPanel'
import AddProductForm from '../../components/AddProductForm/AddProductForm'
import ProductsTable from '../../components/ProductsTable'
import SnackBar from '../../../../shared/ui/SnackBar/SnackBar'
import { uiStore } from '../../../../app/store/uiStore'
import { useState } from 'react'

export default function ManageProducts() {
    const { snackBar } = uiStore()

    return (
        <>
            <AppBar />

            <main className={styles.main}>
                <UserPanel page={'products'} />

                <hr className={styles.divider} />

                <div className={styles.body}>
                    <header className={styles.header}>
                        <h2>Products</h2>
                    </header>

                    <AddProductForm />

                    <hr id='users-admins-hr' />

                    <ProductsTable />
                </div>
            </main>

            <SnackBar {...snackBar} />
        </>
    )
}