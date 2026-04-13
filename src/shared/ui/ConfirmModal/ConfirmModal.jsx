import styles from './ConfirmModal.module.css'
import { useState } from "react"
import Loading from "../Loading/Loading"

export default function ConfirmModal(props) {
    const [loading, setLoading] = useState(false)

    return (
        <div className={styles.modal} onClick={props.close}>
            <div className={styles.dialogProduct} onClick={e => e.stopPropagation()}>
                <strong>{props.message}</strong>

                <div className={styles.oneRow}>
                    <button className={props.message.substring(0, 4) === 'Make' ? styles.addBttn : styles.redBttn}
                        type="button"
                        disabled={loading}
                        onClick={async () => {
                            setLoading(true)
                            await props.action()
                            setLoading(false)
                            props.close()
                        }}>
                        {loading ? <Loading size={15} height={'100%'} /> : 'Yes'}
                    </button>

                    <button className={styles.cancelBttn} onClick={props.close}>No</button>
                </div>
            </div>
        </div>
    )
}