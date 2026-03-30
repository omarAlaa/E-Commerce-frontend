import { useState } from "react"
import Loading from "../Loading/Loading"

export default function ConfirmModal(props) {
    const [loading, setLoading] = useState(false)

    return (
        <section className="modal" onClick={props.close}>
            <article className="dialog-product" onClick={e => e.stopPropagation()}>
                <strong>{props.message}</strong>

                <div className="confirm-bttns">
                    <button className={props.message.substring(0, 4) === 'Make' ? 'add-bttn' : 'delete-bttn'}
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

                    <button className="cancel-bttn" onClick={props.close}>No</button>
                </div>
            </article>
        </section>
    )
}