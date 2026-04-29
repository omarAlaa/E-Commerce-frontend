import styles from './Pages.module.css'
import Button from '../Button/Button'

export default function Pages({ page, totalPages, changePage, id }) {
    return (
        <div className={styles.pages} id={id}>
            {Array.from({ length: totalPages }, (_, index) =>
                <Button key={index}
                    id={!(page === index + 1) ? styles.page : undefined}
                    onClick={() => changePage(index + 1)}
                    disabled={page === index + 1}>
                    {index + 1}
                </Button>
            )}
        </div>
    )
}