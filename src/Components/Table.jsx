import './Table.css'
import Loading from './Loading'
import { useState } from 'react'

export default function Table(props) {

    const [actionLoading, setActionLoading] = useState()

    async function takeAction(action, row) {
        if (action === 'Delete') {
            await props.deleteProduct(row._id)
        }
        else if (action === 'Cancel') {
            await props.cancel(row._id)
        } else if (action === 'Remove') {
            await props.remove(row.email, row.role)
        } else if (action === 'Make Admin') {
            await props.makeAdmin(row.email)
        } else if (action === 'Review') {
            props.review(row)
        } else {
            props.reviewProduct(row)
        }
    }

    return (
        <table>
            <thead>
                <tr><td><strong>{props.title}</strong></td></tr>
                <tr>
                    {props.headers?.map((header, index) => <td key={index}>{header}</td>)}
                </tr>
            </thead>
            <tbody>
                {props.rows?.map(row => <tr key={row._id}>
                    {Array.from({ length: props.headers?.length - 1 }, (_, index) => <td key={row._id + index}>{row[props.headers[index]]}</td>)}
                    <td>{props.actions.map(action => <button className={action === 'Review' || action === 'Make Admin' || action === 'Update' ? 'white-button' : undefined}
                        onClick={async () => {
                            setActionLoading(action + row._id)
                            await takeAction(action, row)
                            setActionLoading(null)
                        }} key={action}>{action + row._id === actionLoading ? <Loading size={15} height={'100%'} /> : action}</button>)}</td>
                </tr>)}
            </tbody>
        </table>
    )
}