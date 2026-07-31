import React, { useState } from 'react'
import { loginUser } from "../../services/authServices"
import { useNavigate } from 'react-router-dom'
import styles from "./LoginForm.module.css"

function LoginForm() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    function handleSubmit(event) {
        event.preventDefault();
        loginUser({username, password})
            .then(res => {
                if (res.success) {
                    navigate('/')
                    return
                }
                setError(res.error)
        })
    }

    return (
        <>
            <h1>Log In</h1>
            <div className={styles.registerPage}>
                { error &&
                    <div className="error-div">
                        <p className="error-message">{error}</p>
                    </div>
                }
                <form className={styles.registerForm} onSubmit={handleSubmit}>
                    <label>Username :</label>
                    <input name="username" type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
                    <p>{username}</p>

                    <label>Password :</label>
                    <input name="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    <p>{password}</p>

                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
}

export default LoginForm
