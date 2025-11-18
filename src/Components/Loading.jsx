import './Loading.css'

export default function Loading(props) {
    return (
        <div className='spinner-container' style={{ height: props.height }}>
            <div className='spinner' style={{ width: props.size, height: props.size }}></div>
        </div>
    )
}