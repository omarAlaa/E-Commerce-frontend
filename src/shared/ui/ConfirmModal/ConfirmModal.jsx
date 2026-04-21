import styles from './ConfirmModal.module.css'
import { useState } from "react"
import Loading from "../Loading/Loading"
import Button from "../Button/Button"
import Modal from '../Modal/Modal'

export default function ConfirmModal(props) {
    const [loading, setLoading] = useState(false)

    return (
        <Modal onClose={props.close}>
            <strong>{props.message}</strong>

            <div className={styles.oneRow}>
                <Button id={props.message.substring(0, 4) === 'Make' ? styles.addBttn : styles.redBttn}
                    type="button"
                    disabled={loading}
                    onClick={async () => {
                        setLoading(true)
                        await props.action()
                        setLoading(false)
                        props.close()
                    }}>
                    {loading ? <Loading size={15} height={'100%'} /> : 'Yes'}
                </Button>

                <Button id={styles.cancelBttn} onClick={props.close}>
                    No
                </Button>
            </div>
        </Modal>
    )
}