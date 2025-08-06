export default function ManageAccountBody(props) {

    return (
        <section className="manage-account-section">
            <header className='upper-panel'>
                <h2>Account</h2>
            </header>
            <section className="manage-account">
                <h2>Change Username</h2>
                <form action={props.changeUsername} className="change-username">
                    <input autoComplete='on' type="text" name="username" id="username" placeholder='New Username' />
                    <button>Change</button>
                </form>
                <hr />
                <h2>Change Password</h2>
                <form action={props.changePassword} className="change-username">
                    <input type="password" name="password" id="password" placeholder='New Password' />
                    <input type="password" name="confirm-password" id="confirm-password" placeholder='Confirm Password' />
                    <button>Change</button>
                </form>
                <hr />
                <h2 id='delete-account-text'>Delete Account</h2>
                <p>Once you delete your account all your data will be removed.</p>
                <button onClick={props.deleteAccount} id='delete-account-button'>Delete Account</button>
            </section>
        </section>
    )
}